import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Camera,
  MapPin,
  FileText,
  Headphones,
  RefreshCw,
} from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import type { Dictionary } from "@/lib/i18n/dictionary";

const trustIcons = [
  CheckCircle,
  Camera,
  MapPin,
  FileText,
  Headphones,
  RefreshCw,
];

type TrustSectionProps = {
  dict: Dictionary["trust"];
};

export function TrustSection({ dict }: TrustSectionProps) {
  return (
    <section
      className="px-4 py-16 md:px-8 md:py-24 bg-secondary/30"
      aria-labelledby="trust-section-title"
    >
      <div className="mx-auto max-w-5xl">
        <AnimateIn variant="fade-up">
          <h2
            id="trust-section-title"
            className="text-center font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl"
          >
            {dict.title}
          </h2>
        </AnimateIn>
        <AnimateIn variant="fade-up" delay={100}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            {dict.subtitle}
          </p>
        </AnimateIn>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((point, index) => {
            const Icon = trustIcons[index];
            return (
              <AnimateIn
                key={index}
                variant="fade-left"
                delay={150 + index * 100}
              >
                <li className="list-none">
                  <Card className="border-0 bg-card shadow-md rounded-2xl hover-lift h-full">
                    <CardContent className="p-6">
                      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-italy-green/10">
                        <Icon className="size-6 text-italy-green" aria-hidden="true" />
                      </div>
                      <h3 className="font-semibold text-foreground">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {point.description}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              </AnimateIn>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
