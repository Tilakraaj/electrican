import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  User,
  MapPin,
  CreditCard,
  Bell,
  Heart,
  Shield,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Globe,
  Moon,
  FileText,
  Phone,
  Mail,
  CheckCircle2,
} from 'lucide-react';

interface ProfileScreenProps {
  onOpenOrders: () => void;
  onOpenWishlist: () => void;
  onOpenNotifications: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onOpenOrders,
  onOpenWishlist,
  onOpenNotifications,
}) => {
  const { wishlist, unreadNotifCount, showToast } = useApp();
  const [activeSubModal, setActiveSubModal] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'bookings',
      icon: <FileText className="w-4 h-4 text-blue-600" />,
      label: 'My Bookings & Service History',
      badge: '2 Records',
      action: onOpenOrders,
    },
    {
      id: 'orders',
      icon: <CreditCard className="w-4 h-4 text-purple-600" />,
      label: 'My Marketplace Orders',
      badge: '1 In Transit',
      action: onOpenOrders,
    },
    {
      id: 'wishlist',
      icon: <Heart className="w-4 h-4 text-red-500" />,
      label: 'Wishlist & Saved Hardware',
      badge: `${wishlist.length} Items`,
      action: onOpenWishlist,
    },
    {
      id: 'addresses',
      icon: <MapPin className="w-4 h-4 text-emerald-600" />,
      label: 'Saved Addresses',
      badge: '2 Locations',
      action: () => setActiveSubModal('addresses'),
    },
    {
      id: 'payments',
      icon: <CreditCard className="w-4 h-4 text-amber-500" />,
      label: 'Payment Methods & Wallets',
      badge: 'eSewa, Khalti',
      action: () => setActiveSubModal('payments'),
    },
    {
      id: 'notifications',
      icon: <Bell className="w-4 h-4 text-blue-600" />,
      label: 'Notification Preferences',
      badge: unreadNotifCount > 0 ? `${unreadNotifCount} New` : undefined,
      action: onOpenNotifications,
    },
    {
      id: 'security',
      icon: <Shield className="w-4 h-4 text-emerald-600" />,
      label: 'Electrical Safety Guarantee & Insurance',
      badge: '$10k Cover',
      action: () => setActiveSubModal('insurance'),
    },
    {
      id: 'support',
      icon: <HelpCircle className="w-4 h-4 text-slate-600" />,
      label: '24/7 Hotline & Help Desk',
      badge: '+977 1-4500911',
      action: () => setActiveSubModal('support'),
    },
  ];

  return (
    <div className="space-y-4 pb-24">
      {/* Profile Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-blue-900 to-[#0057D9] text-white shadow-lg space-y-3">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Alex Mercer"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/80 shadow-md"
              referrerPolicy="no-referrer"
            />
            <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-1 rounded-full ring-2 ring-blue-900">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white">Alex Mercer</h2>
              <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full">
                Verified Customer
              </span>
            </div>
            <div className="text-xs text-blue-100 flex items-center gap-1.5 mt-1 font-mono">
              <Phone className="w-3 h-3 text-blue-200" />
              <span>+977 980-1122334</span>
            </div>
            <div className="text-xs text-blue-100 flex items-center gap-1.5 mt-0.5">
              <Mail className="w-3 h-3 text-blue-200" />
              <span>alex.mercer@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/15 text-center text-xs">
          <div className="p-2 bg-white/10 rounded-xl">
            <span className="text-sm font-black text-white block">14</span>
            <span className="text-[10px] text-blue-200">Total Services</span>
          </div>
          <div className="p-2 bg-white/10 rounded-xl">
            <span className="text-sm font-black text-amber-300 block">5.0 ★</span>
            <span className="text-[10px] text-blue-200">Customer Score</span>
          </div>
          <div className="p-2 bg-white/10 rounded-xl">
            <span className="text-sm font-black text-emerald-300 block">Active</span>
            <span className="text-[10px] text-blue-200">Home Warranty</span>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-xs">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <span className="text-xs font-bold text-slate-800">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.badge && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
            </div>
          </button>
        ))}
      </div>

      {/* App Info & Safety Guarantee */}
      <div className="p-3 bg-slate-100 rounded-2xl text-center space-y-1">
        <p className="text-[11px] font-bold text-slate-700">MY ELECTRICIAN v2.4.0</p>
        <p className="text-[10px] text-slate-500">
          Licensed & Insured Electrical Contractor Platform · 24/7 Emergency Service
        </p>
      </div>

      {/* Sub Modals for Addresses, Payments, Insurance, Support */}
      {activeSubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900 capitalize">
                {activeSubModal.replace('_', ' ')}
              </h3>
              <button
                onClick={() => setActiveSubModal(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
            </div>

            {activeSubModal === 'addresses' && (
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold block text-slate-900">🏠 Home</span>
                  <span className="text-slate-600">Apartment 4B, Emerald Residency, Lazimpat</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold block text-slate-900">🏢 Office</span>
                  <span className="text-slate-600">Floor 3, Trade Tower, Thapathali</span>
                </div>
              </div>
            )}

            {activeSubModal === 'payments' && (
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between items-center">
                  <span className="font-bold text-emerald-950">eSewa Mobile Wallet</span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-bold">Primary</span>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 flex justify-between items-center">
                  <span className="font-bold text-purple-950">Khalti Digital Wallet</span>
                  <span className="text-[10px] text-purple-800 font-bold">Linked</span>
                </div>
              </div>
            )}

            {activeSubModal === 'insurance' && (
              <div className="text-xs text-slate-600 leading-relaxed space-y-2">
                <p>
                  Every technician dispatch booked via My Electrician is backed by a <strong>$10,000 property damage indemnity insurance</strong> policy against electrical fires or accidental breaker damage.
                </p>
                <p>Includes free 30-day rework warranty on all labor.</p>
              </div>
            )}

            {activeSubModal === 'support' && (
              <div className="text-xs text-slate-700 space-y-2">
                <p className="font-medium">Call our 24/7 central dispatch desk:</p>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl font-mono text-sm font-bold text-[#0057D9] text-center">
                  +977 1-4500911
                </div>
                <p className="text-[10px] text-slate-500 text-center">Average answer speed: Under 15 seconds</p>
              </div>
            )}

            <button
              onClick={() => setActiveSubModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
