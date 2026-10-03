import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Booking, Order } from '../../../types';
import {
  Wrench,
  Package,
  Calendar,
  Clock,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  Repeat,
} from 'lucide-react';

interface OrdersScreenProps {
  onOpenTracking: (bookingId: string) => void;
  onOpenInvoice: (booking: Booking) => void;
  onBookAgain: (serviceId: any) => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({
  onOpenTracking,
  onOpenInvoice,
  onBookAgain,
}) => {
  const { bookings, orders } = useApp();
  const [mainTab, setMainTab] = useState<'services' | 'products'>('services');
  const [serviceStatusFilter, setServiceStatusFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredBookings = bookings.filter((b) => {
    if (serviceStatusFilter === 'active') {
      return b.status !== 'completed' && b.status !== 'cancelled';
    }
    if (serviceStatusFilter === 'completed') {
      return b.status === 'completed';
    }
    return true;
  });

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div>
        <h2 className="text-lg font-black text-slate-900 tracking-tight">
          Bookings & Orders
        </h2>
        <p className="text-xs text-slate-500">Track dispatches, delivery receipts & warranties</p>
      </div>

      {/* Main Mode Toggle: Services vs Products */}
      <div className="flex bg-slate-100 p-1 rounded-2xl">
        <button
          onClick={() => setMainTab('services')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mainTab === 'services'
              ? 'bg-white text-[#0057D9] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Electrician Services ({bookings.length})</span>
        </button>
        <button
          onClick={() => setMainTab('products')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mainTab === 'products'
              ? 'bg-white text-[#0057D9] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Store Orders ({orders.length})</span>
        </button>
      </div>

      {/* TAB 1: SERVICES */}
      {mainTab === 'services' && (
        <div className="space-y-3">
          {/* Subfilter */}
          <div className="flex gap-1.5 py-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'active', label: 'Active / En Route' },
              { id: 'completed', label: 'Completed' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setServiceStatusFilter(f.id as any)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  serviceStatusFilter === f.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filteredBookings.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 p-6">
              <Wrench className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">No bookings in this category</p>
            </div>
          ) : (
            filteredBookings.map((b) => {
              const isActive = b.status !== 'completed' && b.status !== 'cancelled';
              return (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{b.serviceName}</span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                            b.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-blue-800 animate-pulse'
                          }`}
                        >
                          {b.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                        Booking #{b.id} · {b.date}
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">
                      ${b.totalAmount.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 line-clamp-2">
                    {b.problemDescription}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                    <span className="text-slate-500 text-[11px]">
                      Electrician: <strong className="text-slate-800">{b.electricianName || 'Suman Shrestha'}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      {isActive ? (
                        <button
                          onClick={() => onOpenTracking(b.id)}
                          className="px-3 py-1.5 rounded-xl bg-[#0057D9] hover:bg-blue-700 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <span>Live Track</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => onBookAgain(b.serviceId)}
                            className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                          >
                            <Repeat className="w-3 h-3" />
                            <span>Rebook</span>
                          </button>
                          <button
                            onClick={() => onOpenInvoice(b)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] cursor-pointer"
                          >
                            Invoice
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: STORE ORDERS */}
      {mainTab === 'products' && (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 font-mono">
                      Order #{order.id}
                    </span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Placed on {order.date} · Tracking: {order.trackingNumber}
                  </p>
                </div>
                <span className="text-xs font-black text-[#0057D9]">
                  ${order.total.toFixed(2)}
                </span>
              </div>

              {/* Order items */}
              <div className="space-y-1.5">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-8 h-8 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="flex-1 truncate font-medium">{item.product.name}</span>
                    <span className="text-slate-500 font-bold">x{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  Express Courier
                </span>
                <button className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-800 font-bold text-[11px] hover:bg-slate-50">
                  Track Package
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
