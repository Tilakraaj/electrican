import React, { useState } from 'react';
import { ShieldCheck, ShoppingBag, Navigation, ChevronRight, X, Sparkles } from 'lucide-react';
import { BrandLogo } from '../../common/BrandLogo';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-[#0057D9]" />,
      badge: 'Certified Professionals',
      title: 'Book Trusted Electricians',
      description:
        'Connect with verified, background-checked master electricians in under 2 minutes with guaranteed upfront fixed pricing.',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      icon: <ShoppingBag className="w-12 h-12 text-amber-500" />,
      badge: 'Electrical Marketplace',
      title: 'Shop Electrical Products',
      description:
        'Purchase smart switchboards, BLDC inverter fans, copper wiring, and EV chargers with optional professional installation at checkout.',
      color: 'bg-amber-50 text-amber-700',
    },
    {
      icon: <Navigation className="w-12 h-12 text-emerald-600" />,
      badge: 'Live GPS Telemetry',
      title: 'Track Your Service in Real Time',
      description:
        'Watch your assigned technician arrive in real-time, view live ETA, and call or chat directly inside the app.',
      color: 'bg-emerald-50 text-emerald-700',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((s) => s + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col p-6 relative">
        <div className="flex items-center justify-between">
          <BrandLogo size="sm" />
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            Skip
          </button>
        </div>

        {/* Slide Graphic */}
        <div className="py-8 text-center flex flex-col items-center">
          <div className="w-24 h-24 rounded-3xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shadow-inner mb-6 relative">
            {slides[currentSlide].icon}
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FFC107] text-slate-900 flex items-center justify-center font-bold text-xs shadow-xs">
              ⚡
            </span>
          </div>

          <span
            className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${slides[currentSlide].color}`}
          >
            {slides[currentSlide].badge}
          </span>

          <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
            {slides[currentSlide].title}
          </h2>

          <p className="text-xs text-slate-600 mt-2.5 max-w-xs leading-relaxed">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center justify-center gap-1.5 my-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentSlide ? 'w-8 bg-[#0057D9]' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-2">
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-2xl bg-[#0057D9] hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Continue'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
