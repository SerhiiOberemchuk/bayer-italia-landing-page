import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Ban,
  Camera,
  Check,
  Clock,
  MapPin,
  Receipt,
  Send,
  ShieldCheck,
  ShoppingBag,
  Store,
  Tag,
  Truck,
  Undo2,
  Users,
} from "lucide-react";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionary";
import { isValidLocale, siteUrl } from "@/lib/i18n/config";
import { buildLocalizedAlternates, withLocalePath } from "@/lib/i18n/routing";
import { ensureLocale } from "@/lib/i18n/server";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/faq";

const pathname = "/adresa-v-italii";

// The warehouse address is never printed on the site: it goes out personally
// on Telegram, so service CTAs open the address coordinator's chat with a prefilled ask.
const telegramContactUrl = "https://t.me/SerhiiOberemchuk";

const stepIcons = [MapPin, ShoppingBag, Camera, Truck];
const audienceIcons = [Tag, Store, ShieldCheck, Undo2];
const ruleIcons = [Users, Receipt, Ban, Clock];

type Tariff = Dictionary["addressInItaly"]["pricing"]["address"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const { meta } = (await getDictionary(locale)).addressInItaly;
  const url = `${siteUrl}${withLocalePath(locale, pathname)}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: [...meta.keywords],
    alternates: {
      canonical: url,
      languages: buildLocalizedAlternates(pathname, siteUrl),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url,
      locale: locale === "uk" ? "uk_UA" : "en_US",
      siteName: "Buyer Italia",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/images/og-image.jpg"],
    },
  };
}

function TariffCard({
  tariff,
  featured,
  children,
}: {
  tariff: Tariff;
  featured: boolean;
  children: ReactNode;
}) {
  return (
    <article
      className={`flex flex-col border p-6 md:p-8 ${
        featured ? "border-foreground" : "border-border bg-secondary/30"
      }`}
    >
      <h3 className="premium-eyebrow text-muted-foreground">{tariff.name}</h3>
      <p className="mt-6 font-serif text-4xl font-normal leading-none tracking-[-0.04em] text-foreground md:text-5xl">
        {tariff.price}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">{tariff.priceNote}</p>
      <p className="mt-6 text-[15px] leading-7 text-foreground/90">{tariff.description}</p>
      <ul className="mt-6 space-y-3 border-t border-border pt-6">
        {tariff.features.map((feature) => (
          <li key={feature} className="flex list-none gap-3 text-sm leading-6 text-foreground/90">
            <Check
              className="mt-1 size-4 shrink-0 text-italy-green"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">{children}</div>
    </article>
  );
}

export default async function AddressInItalyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = ensureLocale((await params).locale);
  const isUk = locale === "uk";
  const dict = (await getDictionary(locale)).addressInItaly;
  const pageUrl = `${siteUrl}${withLocalePath(locale, pathname)}`;
  const telegramUrl = `${telegramContactUrl}?text=${encodeURIComponent(dict.telegramMessage)}`;

  // FAQPage markup comes from the shared FAQ component below.
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: dict.meta.serviceName,
    description: dict.meta.description,
    serviceType: "Package forwarding",
    url: pageUrl,
    provider: {
      "@type": "Organization",
      name: "Buyer Italia",
      url: siteUrl,
    },
    areaServed: "UA",
    offers: [
      {
        "@type": "Offer",
        price: "5",
        priceCurrency: "EUR",
        description: dict.meta.parcelOfferDescription,
        url: pageUrl,
      },
      {
        "@type": "Offer",
        price: "5",
        priceCurrency: "EUR",
        description: dict.meta.dispatchOfferDescription,
        url: pageUrl,
      },
    ],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <div className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-[1100px]">
          <Button variant="ghost" className="mb-8" asChild>
            <Link href={withLocalePath(locale)}>
              <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
              {isUk ? "На головну" : "Back to home"}
            </Link>
          </Button>

          <section aria-labelledby="address-hero-title">
            <p className="premium-eyebrow text-muted-foreground">{dict.hero.eyebrow}</p>
            <h1
              id="address-hero-title"
              className="mt-5 max-w-[14ch] font-serif text-5xl font-normal leading-[1.02] tracking-[-0.045em] text-foreground md:text-7xl"
            >
              {dict.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              {dict.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-13 items-center justify-center gap-3 bg-foreground px-7 text-xs font-medium uppercase tracking-[0.17em] text-background hover:bg-[#34322f]"
              >
                <Send className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {dict.hero.cta}
              </a>
              <a
                href="#how-it-works"
                className="inline-flex h-13 items-center justify-center gap-3 border border-foreground px-7 text-xs font-medium uppercase tracking-[0.17em] hover:bg-foreground hover:text-background"
              >
                {dict.hero.secondaryCta}
                <ArrowDown className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>

            <ul className="mt-12 grid gap-4 sm:grid-cols-3">
              {dict.hero.highlights.map((highlight) => (
                <li key={highlight.label} className="list-none border-t border-border pt-5">
                  <p className="font-serif text-3xl font-normal tracking-[-0.03em] text-foreground">
                    {highlight.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{highlight.label}</p>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="how-it-works"
            className="mt-16 scroll-mt-32 md:mt-24"
            aria-labelledby="address-steps-title"
          >
            <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
              <h2
                id="address-steps-title"
                className="font-serif text-3xl font-normal tracking-[-0.03em] text-foreground md:text-5xl"
              >
                {dict.steps.title}
              </h2>
              <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-right">
                {dict.steps.subtitle}
              </p>
            </div>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
              {dict.steps.items.map((step, index) => {
                const Icon = stepIcons[index];
                return (
                  <li
                    key={step.title}
                    className="list-none border-b border-border px-1 py-8 sm:px-6 lg:border-l lg:px-7 lg:py-10 lg:first:border-l-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="premium-eyebrow text-muted-foreground">0{index + 1}</span>
                      <Icon className="size-5 text-italy-green" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <h3 className="mt-8 font-serif text-2xl font-normal tracking-[-0.025em] text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="mt-14 md:mt-20" aria-labelledby="address-audience-title">
            <h2
              id="address-audience-title"
              className="font-serif text-3xl font-normal tracking-[-0.03em] text-foreground"
            >
              {dict.audience.title}
            </h2>
            <ul className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {dict.audience.items.map((item, index) => {
                const Icon = audienceIcons[index];
                return (
                  <li key={item.title} className="list-none border-t border-border pt-5">
                    <Icon className="size-5 text-italy-green" strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="mt-3 font-medium text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="mt-14 md:mt-20" aria-labelledby="address-pricing-title">
            <h2
              id="address-pricing-title"
              className="font-serif text-3xl font-normal tracking-[-0.03em] text-foreground"
            >
              {dict.pricing.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              {dict.pricing.subtitle}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <TariffCard tariff={dict.pricing.address} featured>
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 w-full items-center justify-center gap-3 bg-foreground px-7 text-xs font-medium uppercase tracking-[0.17em] text-background hover:bg-[#34322f]"
                >
                  <Send className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  {dict.pricing.address.cta}
                </a>
              </TariffCard>
              <TariffCard tariff={dict.pricing.buyer} featured={false}>
                <Link
                  href={withLocalePath(locale)}
                  className="inline-flex h-13 w-full items-center justify-center gap-3 border border-foreground px-7 text-xs font-medium uppercase tracking-[0.17em] hover:bg-foreground hover:text-background"
                >
                  {dict.pricing.buyer.cta}
                  <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </TariffCard>
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-6 text-muted-foreground">
              {dict.pricing.example}
            </p>
          </section>

          <section
            className="mt-14 border border-border bg-secondary/30 p-6 md:mt-20 md:p-10"
            aria-labelledby="address-rules-title"
          >
            <h2
              id="address-rules-title"
              className="font-serif text-3xl font-normal tracking-[-0.03em] text-foreground"
            >
              {dict.rules.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              {dict.rules.subtitle}
            </p>
            <ul className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {dict.rules.items.map((rule, index) => {
                const Icon = ruleIcons[index];
                return (
                  <li key={rule.title} className="list-none border-t border-border pt-5">
                    <Icon className="size-5 text-italy-green" strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="mt-3 font-medium text-foreground">{rule.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{rule.description}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>

      <FAQ dict={dict.faq} locale={locale} />

      <section
        className="bg-foreground px-4 py-20 text-background md:px-8 md:py-28"
        aria-labelledby="address-cta-title"
      >
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20">
          <div>
            <p className="premium-eyebrow text-background/55">{dict.finalCta.eyebrow}</p>
            <h2
              id="address-cta-title"
              className="mt-5 max-w-[14ch] font-serif text-4xl font-normal leading-[1.02] tracking-[-0.04em] text-background md:text-6xl"
            >
              {dict.finalCta.title}
            </h2>
            <p className="mt-7 max-w-2xl text-[15px] leading-7 text-background/65">
              {dict.finalCta.subtitle}
            </p>
          </div>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-between border border-background bg-background px-6 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-transparent hover:text-background"
          >
            <span className="inline-flex items-center gap-3">
              <Send className="size-4" strokeWidth={1.5} aria-hidden="true" />
              {dict.finalCta.cta}
            </span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
