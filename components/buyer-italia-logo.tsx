interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function BuyerItaliaLogo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: { wrapper: "h-16 w-16", text: "text-[6px]", subtext: "text-[4px]" },
    md: { wrapper: "h-24 w-24 md:h-32 md:w-32", text: "text-[8px] md:text-[10px]", subtext: "text-[5px] md:text-[6px]" },
    lg: { wrapper: "h-32 w-32 md:h-40 md:w-40", text: "text-[10px] md:text-[12px]", subtext: "text-[6px] md:text-[8px]" },
  }

  return (
    <div className={`${sizes[size].wrapper} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        {/* Outer Ring with Italian Colors */}
        <circle cx="50" cy="50" r="48" stroke="#E8E4DE" strokeWidth="4" />
        
        {/* Green Arc (left) */}
        <path
          d="M 50 2 A 48 48 0 0 0 50 98"
          stroke="#008C45"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Red Arc (right) */}
        <path
          d="M 50 98 A 48 48 0 0 0 50 2"
          stroke="#CD212A"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Inner Circle (cream background) */}
        <circle cx="50" cy="50" r="42" fill="#FAF8F5" />
        
        {/* Shopping Bag */}
        <g transform="translate(35, 18)">
          {/* Bag Handle */}
          <path
            d="M 10 8 Q 10 2 15 2 Q 20 2 20 8"
            stroke="#D4A854"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Bag Body - Green Section */}
          <rect x="2" y="8" width="10" height="20" rx="2" fill="#008C45" />
          
          {/* Bag Body - White Section */}
          <rect x="12" y="8" width="6" height="20" fill="#FFFFFF" stroke="#E8E4DE" strokeWidth="0.5" />
          
          {/* Bag Body - Red Section */}
          <rect x="18" y="8" width="10" height="20" rx="2" fill="#CD212A" />
        </g>
        
        {/* Text: Buyer */}
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fontFamily="Playfair Display, Georgia, serif"
          fontSize="14"
          fontWeight="600"
          fill="#1a1a2e"
        >
          Buyer
        </text>
        
        {/* Text: Italia */}
        <text
          x="50"
          y="76"
          textAnchor="middle"
          fontFamily="Playfair Display, Georgia, serif"
          fontSize="14"
          fontWeight="600"
          fill="#1a1a2e"
        >
          Italia
        </text>
        
        {/* Small Italian Flag */}
        <g transform="translate(41, 80)">
          <rect x="0" y="0" width="6" height="8" rx="1" fill="#008C45" />
          <rect x="6" y="0" width="6" height="8" fill="#FFFFFF" stroke="#E8E4DE" strokeWidth="0.3" />
          <rect x="12" y="0" width="6" height="8" rx="1" fill="#CD212A" />
        </g>
      </svg>
    </div>
  )
}
