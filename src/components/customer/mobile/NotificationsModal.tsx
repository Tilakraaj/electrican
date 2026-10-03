import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  X,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Tag,
  CreditCard,
  Package,
  Wrench,
  CheckCheck,
} from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTracking: (bookingId: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onOpenTracking,
}) => {
  const { notifications, markNotificationAsRead, markAllNotificationsRead } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Booking', 'Order', 'Offers', 'Payment'];

  const filtered = notifications.filter(
    (n) => selectedFilter === 'All' || n.category === selectedFilter
  );

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'Booking':
        return <Wrench className="w-4 h-4 text-blue-600" />;
      case 'Order':
        return <Package className="w-4 h-4 text-purple-600" />;
      case 'Offers':
        return <Tag className="w-4 h-4 text-amber-500" />;
      case 'Payment':
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-white sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-full sm:h-[80vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0057D9] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold text-slate-900">Notifications</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="p-3 border-b border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0 bg-slate-50/50">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No notifications in this category
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  markNotificationAsRead(item.id);
                  if (item.category === 'Booking') {
                    onOpenTracking('ME-84920');
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  !item.isRead
                    ? 'border-blue-200 bg-blue-50/40 shadow-xs'
                    : 'border-slate-200/80 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(item.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                      {item.timeAgo}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    {item.message}
                  </p>
                </div>
                {!item.isRead && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
