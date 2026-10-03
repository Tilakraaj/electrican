import React from 'react';
import { useApp, ViewMode } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';
import {
  Smartphone,
  Globe,
  Wrench,
  ShieldCheck,
  Palette,
  AlertTriangle,
  Navigation,
  ShoppingCart,
  Bell,
} from 'lucide-react';

export const TopNavigation: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    activeTrackingBookingId,
    setActiveTrackingBookingId,
    bookings,
    setIsEmergencyModalOpen,
    cart,
    unreadNotifCount,
  } = useApp();

  const activeBooking = bookings.find((b) => b.id === activeTrackingBookingId);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems: { id: ViewMode; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'customer_mobile',
      label: 'Mobile App',
      icon: <Smartphone className="w-4 h-4" />,
    },
    {
      id: 'customer_website',
      label: 'Website',
      icon: <Globe className="w-4 h-4" />,
    },
    {
      id: 'electrician_app',
      label: 'Technician Partner',
      icon: <Wrench className="w-4 h-4" />,
      badge: 'LIVE',
    },
    {
      id: 'admin_dashboard',
      label: 'Admin Portal',
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      id: 'design_system',
      label: 'Design System',
      icon: <Palette className="w-4 h-4" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <BrandLogo size="md" showTagline={false} />
        </div>

        {/* Zone 2: Navigation Links / Perspective Switcher */}
        <nav className="flex items-center bg-slate-100 p-1 rounded-xl overflow-x-auto no-scrollbar max-w-full">
          {navItems.map((item) => {
            const isActive = viewMode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setViewMode(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#0057D9] shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1 py-0.2 rounded font-extrabold bg-blue-100 text-blue-700 ml-0.5">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Active Job Tracker indicator if booking in progress */}
          {activeBooking && activeBooking.status !== 'completed' && activeBooking.status !== 'cancelled' && (
            <button
              onClick={() => {
                setViewMode('customer_mobile');
                setActiveTrackingBookingId(activeBooking.id);
              }}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              <span>Track Electrician ({activeBooking.etaMinutes ?? 8}m ETA)</span>
            </button>
          )}

          {/* Quick Emergency SOS button */}
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-red-500/25 transition-all cursor-pointer whitespace-nowrap"
          >
            <AlertTriangle className="w-4 h-4 fill-white text-red-600" />
            <span className="hidden sm:inline">24/7</span>
            <span>SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
