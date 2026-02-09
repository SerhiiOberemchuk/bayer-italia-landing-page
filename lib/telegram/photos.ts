/**
 * Завантаження фото з Telegram → Vercel Blob.
 *
 * Потік даних:
 *   1. Отримуємо file_path через Telegram Bot API (getFile)
 *   2. Завантажуємо файл із Telegram CDN
 *   3. Зберігаємо у Vercel Blob (публічний доступ)
 *   4. Повертаємо масив публічних Blob URL
 */

import { put } from "@vercel/blob"

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!

/** Базовий URL Telegram Bot API */
const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}`

/** Базовий URL для завантаження файлів Telegram */
const TG_FILE = `https://api.telegram.org/file/bot${BOT_TOKEN}`

/**
 * Для кожного Telegram file_id:
 *   - отримує file_path через getFile
 *   - завантажує бінарний контент
 *   - зберігає у Vercel Blob
 *
 * @param fileIds - масив Telegram file_id рядків
 * @param prefix  - префікс для шляху у Blob (напр. "products/123")
 * @returns масив публічних Blob URL
 */
export async function uploadTelegramPhotosToBlob(
  fileIds: string[],
  prefix: string
): Promise<string[]> {
  const urls: string[] = []

  for (const fileId of fileIds) {
    try {
      // 1. Отримуємо шлях до файлу через Telegram API
      const fileRes = await fetch(`${TG_API}/getFile?file_id=${fileId}`)
      const fileData = (await fileRes.json()) as {
        ok: boolean
        result?: { file_path: string }
      }

      if (!fileData.ok || !fileData.result?.file_path) {
        console.error(
          `[photos] getFile failed for ${fileId}:`,
          JSON.stringify(fileData)
        )
        continue
      }

      const filePath = fileData.result.file_path

      // 2. Завантажуємо файл із Telegram CDN
      const downloadRes = await fetch(`${TG_FILE}/${filePath}`)
      if (!downloadRes.ok) {
        console.error(
          `[photos] download failed: ${downloadRes.status} ${downloadRes.statusText}`
        )
        continue
      }

      // 3. Визначаємо тип та ім'я файлу
      const contentType =
        downloadRes.headers.get("content-type") ?? "image/jpeg"
      const ext = filePath.split(".").pop() ?? "jpg"
      const blobName = `${prefix}/${Date.now()}-${fileId.slice(-8)}.${ext}`

      // 4. Зберігаємо у Vercel Blob
      const blob = await put(blobName, downloadRes.body!, {
        access: "public",
        contentType,
      })

      urls.push(blob.url)
    } catch (err) {
      console.error(`[photos] Error processing fileId ${fileId}:`, err)
      // Продовжуємо з іншими фото -- одна помилка не має зупиняти всі
    }
  }

  return urls
}
