import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'light' | 'dark';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  variant = 'dark',
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Geometric House + Plug + Lightning Icon */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0057D9] to-[#003B95] text-white shadow-md shadow-blue-500/20 shrink-0`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5"
        >
          {/* House Gable Roof / Plug contour */}
          <path
            d="M16 4L4 14V26C4 27.1046 4.89543 28 6 28H26C27.1046 28 28 27.1046 28 26V14L16 4Z"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dual Plug Prongs Top */}
          <path
            d="M11 2V4M21 2V4"
            stroke="#FFC107"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Center Electric Bolt */}
          <path
            d="M16.5 10L11.5 18H16L15 24L20.5 16H16.5L17.5 10H16.5Z"
            fill="#FFC107"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-extrabold tracking-tight ${textSizes[size]} ${
              variant === 'light' ? 'text-white' : 'text-slate-900'
            }`}
          >
            MY ELECTRICIAN
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]" />
        </div>
        {showTagline && (
          <span
            className={`text-[11px] font-medium tracking-tight mt-0.5 ${
              variant === 'light' ? 'text-blue-100/80' : 'text-slate-500'
            }`}
          >
            Powering Your Home. Simplifying Your Life.
          </span>
        )}
      </div>
    </div>
  );
};
