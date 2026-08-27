interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function BuyerItaliaLogo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: "text-[17px] md:text-[19px]",
    md: "text-2xl md:text-3xl",
    lg: "text-4xl md:text-5xl",
  };

  return (
    <span
      className={`inline-flex items-baseline whitespace-nowrap font-serif font-medium uppercase tracking-[0.16em] text-foreground ${sizes[size]} ${className}`}
    >
      Buyer <span className="ml-[0.28em] italic tracking-[0.08em]">Italia</span>
    </span>
  );
}
