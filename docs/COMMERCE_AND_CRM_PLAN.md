# Buyer Italia: магазин і Obriym CRM

Статус: затверджений напрям  
Оновлено: 2026-08-31

## Рішення

Buyer Italia розвивається як повноцінний інтернет-магазин у межах поточного сайту. Окремий домен або друга кодова база не потрібні: преміальний бренд-лендинг залишається головною сторінкою, а каталог, товар, кошик і checkout доповнюють його.

На поточній фазі:

- Obriym CRM — єдине джерело товарів, цін, фото, брендів, категорій і залишків;
- кожна заявка з checkout створює замовлення в Obriym CRM;
- сайт не приймає оплату й не створює особистий кабінет;
- після заявки менеджер підтверджує наявність, доставку та спосіб оплати;
- ціна й залишок повторно перевіряються на сервері перед створенням замовлення.

## Реалізований потік

`Obriym CRM → серверні функції → каталог → кошик → Server Action checkout → замовлення в Obriym CRM`

Кошик зберігається в браузері. Дані клієнта й склад кошика надсилаються лише під час оформлення. Клієнтська ціна не вважається довіреною: сервер заново завантажує товари з CRM, перевіряє активність і залишок та формує суму замовлення.

Для захисту від повторного відправлення кожне замовлення має унікальний `externalId`.

Внутрішні операції storefront не дублюються окремими API routes. Читання каталогу виконується в Server Components/серверних функціях, а оформлення — через Server Action. Route Handlers потрібні лише там, де сайт має приймати зовнішній HTTP-виклик, наприклад webhook платіжного сервісу або CRM.

## Налаштування Obriym CRM

У локальне середовище або секрети хостингу потрібно додати:

```env
OBRIYM_CRM_API_URL=https://obriym-crm.com/api/v1
OBRIYM_CRM_API_TOKEN=your_server_only_token
OBRIYM_STOREFRONT_WAREHOUSE_ID=d686ceaa-4751-4d74-b832-00b1c6031c36
```

Вітрина показує товари лише зі складу «Баєр Італія». Його ID передається в `GET /products` як `warehouseId`; картка товару та checkout додатково перевіряють це поле на сервері.
Вітрина на головній сторінці запитує лише товари з наявністю (`inStock=true`, сортування `newest`) і не показується, якщо таких немає. Сторінка магазину ділить активні товари складу на дві групи: «У наявності» — повноцінний магазин із кошиком, та «Що ми вже привозили» — до шести проданих позицій (залишок 0) як приклади роботи баєра, без кошика, з CTA «Хочу щось подібне» в Telegram. Сторінка проданого товару лишається доступною для пошукових систем, але замість покупки пропонує підібрати схожу річ.
Категорії та бренди показуються лише тоді, коли мають щонайменше один активний товар на складі «Баєр Італія».

Мінімальні права токена:

- `products:read` — каталог, фільтри, ціни та перевірка залишків;
- `orders:write` — створення замовлень.

Токен є серверним секретом і не повинен мати префікс `NEXT_PUBLIC_`.

### Миттєве оновлення каталогу з CRM

`getAllProducts` та решта читань каталогу кешуються тегом `obriym-products`
(`cacheLife`: stale 60 c, revalidate 300 c). Без зовнішнього сигналу нова ціна
або новий товар доходять до вітрини, сайтмапа та Google Merchant feed лише
після того, як спливе це вікно.

Щоб оновлення було миттєвим, CRM надсилає вебхук на вітрину:

```env
OBRIYM_WEBHOOK_SECRET=спільний_секрет_мінімум_16_символів
```

Налаштування в CRM: **Settings → Developers → Webhooks → створити**

| Поле | Значення |
| --- | --- |
| URL | `https://buyer-italia.shop/api/revalidate` |
| Secret | те саме значення, що й `OBRIYM_WEBHOOK_SECRET` |
| Events | `product.created`, `product.updated`, `product.deleted` |

CRM підписує тіло запиту HMAC-SHA256 і передає підпис у заголовку
`x-obriym-signature: sha256=<hex>`. [app/api/revalidate/route.ts](../app/api/revalidate/route.ts)
перевіряє підпис перед тим, як щось робити, і скидає теги `obriym-products` та
`obriym-product:<id>`. Невідомі події (наприклад `deal.won`) підтверджуються
з `revalidated: false`, щоб CRM не позначала ендпоінт як зламаний.

Якщо `OBRIYM_WEBHOOK_SECRET` не заданий, ендпоінт віддає 503 — доставка
залишається в черзі повторів CRM і видно в її логу, замість тихого «все добре»
при непрацюючій ревалідації.

## Дані товару для вітрини, SEO та Google Merchant

### Стан даних на 30.08.2026

Перевірка фактичної відповіді `GET /products` для двох товарів складу «Баєр Італія» показала:

- `category` присутня та заповнена;
- `id`, `name`, `sku`, ціна, стара ціна, валюта, фото, статус і залишок присутні;
- `customFields` в обох товарах є порожнім масивом `[]`;
- `description`, `translations` і `brand` у фактичних об'єктах не передаються;
- `condition`, `size`, `color` і `material` не передаються окремими атрибутами;
- `gtin`, `mpn` і зв'язок із групою варіантів відсутні;
- напис `Size 45` у назві товару не вважається структурованим значенням `size` і автоматично з назви не витягується.

Порожнє поле не потрібно підміняти припущенням. Storefront додає атрибут у сторінку, JSON-LD і Google Merchant feed лише тоді, коли CRM повернула реальне непорожнє значення.

### Поля, які потрібно додати або заповнити в CRM

| Поле | Формат і допустимі значення | Для чого використовується |
| --- | --- | --- |
| `description` / `translations[].description` | Змістовний опис товару українською та англійською без рекламного спаму | Metadata, Product JSON-LD і `g:description` |
| `brand` | Вбудований зв'язок із брендом, наприклад `Carrera` або `Puma` | Product JSON-LD і `g:brand` |
| `condition` | Канонічно: `new`, `used` або `refurbished` | Перетворюється на `Offer.itemCondition` і `g:condition` |
| `size` | Розмір конкретного товару/варіанта, наприклад `45` | Product JSON-LD і `g:size` |
| `color` | Реальний колір, наприклад `White` | Product JSON-LD і `g:color` |
| `material` | Основний матеріал, наприклад `Leather` або `Textile` | Product JSON-LD і `g:material` |
| `gtin` | Справжній EAN/UPC/GTIN, присвоєний виробником | Product JSON-LD і `g:gtin` |
| `mpn` | Справжній Manufacturer Part Number | Product JSON-LD і `g:mpn`, якщо виробник не присвоїв GTIN |
| `productGroupId` | Стабільний спільний ID моделі, однаковий для її розмірів/кольорів | `Product.isVariantOf` і `g:item_group_id` |
| `gender` | `male`, `female` або `unisex` | `g:gender`, важливо для одягу та взуття |
| `ageGroup` | `newborn`, `infant`, `toddler`, `kids` або `adult` | `g:age_group`, важливо для одягу та взуття |
| `sizeSystem` | Код системи розмірів, наприклад `EU`, `IT`, `UK` або `US` | `g:size_system` |
| `sizeType` | Наприклад `regular`, `petite`, `plus`, `tall`, `big` або `maternity` | `g:size_type` |
| `pattern` | Принт або візерунок, якщо він є | `g:pattern` |
| `googleProductCategory` | ID або точний шлях із Google Product Taxonomy | `g:google_product_category` |

`category` створювати повторно в `customFields` не потрібно: storefront уже читає вбудований об'єкт `category` і передає його як `Product.category` та `g:product_type`.

### Правила ідентифікаторів

1. Якщо виробник присвоїв товару GTIN/EAN/UPC, потрібно заповнити `gtin` точним значенням зі штрихкоду.
2. Якщо GTIN не присвоєно, потрібно заповнити офіційний `mpn` і бренд.
3. Внутрішній `sku` не можна копіювати в `mpn`, якщо це не справжній код виробника.
4. Не можна вигадувати GTIN або MPN. Якщо виробник справді не присвоїв жодного ідентифікатора, це має бути окремо зафіксовано в CRM, а не позначено лише через відсутність даних.

### Правила варіантів

Якщо одна модель має кілька розмірів або кольорів, кожна комбінація повинна бути окремим товаром із власними `id`, `sku`, залишком, ціною, фото та, якщо присвоєно, GTIN. Усі варіанти моделі отримують однаковий `productGroupId`, але різні `size` та/або `color`.

Приклад структури для товару після перевірки даних на етикетці або коробці:

```text
brand: Carrera
condition: new
size: 45
color: White
material: <фактичний матеріал>
gtin: <фактичний EAN зі штрихкоду>
mpn: <офіційний код виробника, лише якщо немає GTIN>
productGroupId: carrera-nirvana-hi-gdo
gender: male
ageGroup: adult
sizeSystem: EU
sizeType: regular
googleProductCategory: Apparel & Accessories > Shoes
```

Значення в прикладі, крім уже відомих назви бренду та розміру з назви товару, не є підтвердженими даними CRM. Перед збереженням їх потрібно звірити з товаром, коробкою або даними виробника.

### Перед публікацією товару

- перевірити, що назва не є єдиним місцем, де вказано розмір або колір;
- додати опис і бренд;
- підтвердити стан товару;
- додати GTIN або, якщо його немає, справжній MPN;
- для одягу та взуття заповнити `size`, `color`, `gender`, `ageGroup` і `sizeSystem`;
- для варіантів вказати спільний `productGroupId`;
- перевірити відповідність фото, ціни та залишку конкретному варіанту.

## Розслідування попереджень Search Console про пропозиції продавця

Дата перевірки: 31.08.2026.

Search Console повідомив про три некритичні проблеми в структурованих даних Merchant listings:

1. відсутнє поле `hasMerchantReturnPolicy` у вузлі `offers`;
2. недійсне значення поля `category`;
3. відсутнє поле `shippingDetails` у вузлі `offers`.

Перевірено фактичний HTML опублікованої сторінки товару:

```text
https://buyer-italia.shop/uk/catalog/09585653-917f-4d28-b834-9cb09489b194
```

Production повертає окремі вузли `Organization`, `Service`, `Product` і `BreadcrumbList`. У `Product.offers` присутні ціна, валюта, наявність і URL, але немає посилань на глобальні правила повернення та доставки.

### Підсумок розслідування

| Попередження | Фактичний стан | Джерело потрібних даних | Рішення |
| --- | --- | --- | --- |
| `offers.hasMerchantReturnPolicy` | Політика вже є в `Organization`, але не має стабільного `@id`, а `Offer` на неї не посилається | Конфігурація storefront, не CRM | Додати глобальній політиці `@id` і посилання на нього з кожної `Offer` |
| `category` | CRM передає лише внутрішню категорію `Взуття чоловіче` | CRM/API | Додати `googleProductCategory` і передавати GPC як `CategoryCode` |
| `offers.shippingDetails` | Є орієнтовні строки та мінімальні ціни, але немає точної або максимальної ставки | Бізнес-правила доставки; CRM лише якщо тариф залежить від товару | Створити глобальну політику доставки після підтвердження тарифів і посилатися на неї з `Offer` |

Попередження є некритичними: чинний `Product` залишається придатним для Merchant listings, але без цих даних Google може показувати менше інформації про пропозицію.

### Політика повернення: дані вже є

Поточні підтверджені значення:

```text
policyId: https://buyer-italia.shop/#return-policy
type: MerchantReturnPolicy
applicableCountry: UA, PL, DE, CZ, IT
returnPolicyCategory: https://schema.org/MerchantReturnNotPermitted
merchantReturnLink (uk): https://buyer-italia.shop/uk/returns
merchantReturnLink (en): https://buyer-italia.shop/en/returns
```

У production політика вже вкладена в `Organization`, однак зараз не має `@id`. Щоб Google однозначно зв'язав її з товарною пропозицією, потрібна така структура:

```json
{
  "@type": "Organization",
  "hasMerchantReturnPolicy": {
    "@type": "MerchantReturnPolicy",
    "@id": "https://buyer-italia.shop/#return-policy",
    "applicableCountry": ["UA", "PL", "DE", "CZ", "IT"],
    "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
    "merchantReturnLink": "https://buyer-italia.shop/uk/returns"
  }
}
```

Кожна товарна `Offer` повинна посилатися на цей вузол:

```json
{
  "@type": "Offer",
  "hasMerchantReturnPolicy": {
    "@id": "https://buyer-italia.shop/#return-policy"
  }
}
```

Нові поля товару в CRM для цього виправлення не потрібні. Перед реалізацією потрібно лише підтвердити, що список країн і заборона стандартного повернення залишаються актуальними для всіх товарів.

Документація Google: [Merchant return policy](https://developers.google.com/search/docs/appearance/structured-data/return-policy) і [Merchant listing](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing).

### Категорія: наявне та потрібне значення

Фактична відповідь CRM для обох товарів:

```json
{
  "category": {
    "id": "0c9d65fd-fa5f-4c1b-ab72-dd0003842b72",
    "name": "Взуття чоловіче",
    "parentId": null
  },
  "customFields": []
}
```

`Взуття чоловіче` є внутрішньою категорією магазину. Google дозволяє звичайний `Text` як custom product type, тому саме це значення формально допустиме. Попередження може належати до старого сканування або означати, що Google намагається інтерпретувати значення як Google Product Category.

Для однозначної класифікації потрібно запросити в CRM/API окреме поле:

```text
googleProductCategory
```

Допустиме значення — числовий GPC ID або повний шлях із Google Product Taxonomy. Для взуття орієнтиром є:

```text
Apparel & Accessories > Shoes
```

Точний ID або шлях потрібно перевірити за актуальною таксономією Google перед збереженням. У JSON-LD GPC передається не простим рядком, а `CategoryCode`:

```json
{
  "@type": "CategoryCode",
  "inCodeSet": "https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt",
  "codeValue": "Apparel & Accessories > Shoes"
}
```

Внутрішня `category.name` і GPC мають різні призначення:

- `category.name` використовується в UI та як `g:product_type`;
- `googleProductCategory` використовується як `CategoryCode` у JSON-LD та `g:google_product_category` у Merchant feed.

Документація Google: [Product category у Merchant listing](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing).

### Доставка: наявні та відсутні значення

На сайті опубліковані такі бізнес-умови:

```text
Україна, Нова пошта:
- строк: 7–10 робочих днів;
- вартість: від 250 грн залежно від ваги.

Європа:
- строк: 10–14 робочих днів;
- вартість: від 10 EUR;
- точна вартість розраховується індивідуально.
```

Цих даних недостатньо для повного `OfferShippingDetails`. Google вимагає точну або максимальну ставку, а не значення «від». Валюта `shippingRate` також має збігатися з валютою `Offer`, яка зараз дорівнює `EUR`.

Потрібно підтвердити та зберігати такі значення для кожного тарифу доставки:

| Поле | Потрібне значення |
| --- | --- |
| `destinationCountry` | Двобуквений ISO-код країни, наприклад `UA`, `PL`, `DE`, `CZ`, `IT` |
| `shippingRate` або `maximumShippingRate` | Точна або максимальна сума в `EUR` |
| `handlingTimeMin` | Мінімум днів від отримання/підтвердження замовлення до передачі перевізнику |
| `handlingTimeMax` | Максимум днів до передачі перевізнику |
| `transitTimeMin` | Мінімальний строк перевезення після відправлення |
| `transitTimeMax` | Максимальний строк перевезення після відправлення |
| `businessDays` | Дні, які враховуються як робочі, якщо вони відрізняються від стандартних |

Поточні `7–10` і `10–14` днів описані як загальний строк із моменту закупки. Їх не можна без підтвердження ділити на `handlingTime` і `transitTime`.

Якщо тариф однаковий для всіх товарів, його потрібно зберігати в конфігурації storefront або глобальних налаштуваннях магазину, а не дублювати в кожному товарі CRM. Після цього `Organization` отримує глобальний `ShippingService` зі стабільним ID:

```text
https://buyer-italia.shop/#shipping-policy
```

А кожна `Offer` посилається на нього:

```json
{
  "@type": "Offer",
  "shippingDetails": {
    "@type": "OfferShippingDetails",
    "hasShippingService": {
      "@id": "https://buyer-italia.shop/#shipping-policy"
    }
  }
}
```

Якщо вартість залежить від конкретного товару, CRM/API додатково має повертати:

```text
weight.value
weight.unit
dimensions.width
dimensions.height
dimensions.depth
dimensions.unit
shippingClass
```

Фактичні значення двох поточних товарів не придатні для тарифного розрахунку:

```json
{
  "weight": {
    "value": 0,
    "unit": "kg"
  },
  "dimensions": {
    "width": 0,
    "height": 0,
    "depth": 0,
    "unit": "cm"
  }
}
```

Нулі означають відсутність виміряних даних і не повинні потрапляти в structured data або Merchant feed як реальна вага чи габарити.

Документація Google: [OfferShippingDetails](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing) і [глобальний ShippingService](https://developers.google.com/search/docs/appearance/structured-data/shipping-policy).

### План виправлення

1. Підтвердити глобальний перелік країн і чинну політику неповернення.
2. Додати `@id` глобальній `MerchantReturnPolicy` і посилання з кожної `Offer`.
3. Додати в CRM/API `googleProductCategory` та заповнити його для товарів.
4. Передавати GPC у Product JSON-LD як `CategoryCode`.
5. Узгодити точні або максимальні тарифи доставки в EUR і окремі handling/transit строки.
6. Якщо доставка залежить від товару, заповнити ненульові вагу, габарити та `shippingClass` у CRM.
7. Додати глобальний `ShippingService` і посилання на нього з кожної `Offer`.
8. Після deployment перевірити live URL у Rich Results Test, запросити повторне сканування й запустити Validate fix у Search Console.

## Межі поточної фази

- Створення замовлення ще не резервує і не списує товар автоматично.
- Остаточну наявність підтверджує менеджер.
- Оплата узгоджується після заявки.
- Реєстрації, історії замовлень і кабінету клієнта немає.

Такий підхід дозволяє запустити продажі зараз без передчасної складності платіжної системи, авторизації та повернень.

## Наступна фаза

Після перевірки реального потоку замовлень:

1. Онлайн-оплата та webhook-и платіжного провайдера.
2. Резервування/списання залишку після підтвердженої оплати.
3. Автоматичні листи або повідомлення про статус.
4. Особистий кабінет та історія замовлень, якщо це буде потрібно клієнтам.
5. Синхронізація статусів доставки й повернень.

API-документація: [Obriym CRM](https://obriym-crm.com/api-docs).
