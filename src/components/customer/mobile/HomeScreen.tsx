import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  ServiceCategoryId,
  Product,
  Electrician,
} from '../../../types';
import {
  SERVICE_CATEGORIES,
  TRUSTED_ELECTRICIANS,
  STORE_PRODUCTS,
  TODAY_OFFERS,
  ASSET_IMAGES,
} from '../../../data/mockData';
import {
  Search,
  MapPin,
  Bell,
  AlertTriangle,
  Zap,
  Star,
  Heart,
  ChevronRight,
  ShieldCheck,
  Tag,
  ArrowRight,
  Plus,
} from 'lucide-react';

interface HomeScreenProps {
  onOpenBooking: (serviceId?: ServiceCategoryId) => void;
  onOpenStore: () => void;
  onOpenTracking: (bookingId: string) => void;
  onOpenProductDetail: (product: Product) => void;
  onOpenNotifications: () => void;
  onOpenEmergencySOS: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenBooking,
  onOpenStore,
  onOpenTracking,
  onOpenProductDetail,
  onOpenNotifications,
  onOpenEmergencySOS,
}) => {
  const {
    bookings,
    activeTrackingBookingId,
    cart,
    addToCart,
    wishlist,
    toggleWishlist,
    unreadNotifCount,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const activeBooking = bookings.find(
    (b) => b.id === activeTrackingBookingId && b.status !== 'completed' && b.status !== 'cancelled'
  );

  const filteredServices = SERVICE_CATEGORIES.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.commonIssues.some((issue) => issue.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-5 pb-24">
      {/* 1. Header: Profile, Location, Notifications, SOS */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Alex Mercer"
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 font-medium">Good Morning</p>
            <div className="flex items-center gap-1">
              <h2 className="text-sm font-black text-slate-900 leading-tight">Alex Mercer</h2>
              <span className="text-[9px] bg-blue-100 text-blue-700 px-1 py-0.2 rounded font-bold">
                PRO
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Location button */}
          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-[11px] font-semibold text-slate-700 transition-colors"
          >
            <MapPin className="w-3 h-3 text-[#0057D9]" />
            <span className="truncate max-w-[90px]">Lazimpat, KTM</span>
          </button>

          {/* Notifications bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* 2. Active En-Route Job Tracker Card (if live) */}
      {activeBooking && (
        <div
          onClick={() => onOpenTracking(activeBooking.id)}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg shadow-blue-950/20 cursor-pointer flex items-center justify-between transition-transform active:scale-98"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Electrician En Route
                </span>
                <span className="text-[10px] text-blue-200">
                  ETA {activeBooking.etaMinutes ?? 7} mins
                </span>
              </div>
              <p className="text-xs font-bold text-white truncate max-w-[210px]">
                {activeBooking.electricianName || 'Suman Shrestha'} is on the way
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/80" />
        </div>
      )}

      {/* 3. Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search services (e.g. switch, fan, MCB) or products..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-xs"
        />
      </div>

      {/* 4. Hero Banner: 24/7 Emergency Electrician */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0057D9] via-[#0046b0] to-[#002f77] text-white p-5 shadow-xl shadow-blue-500/20">
        <div className="relative z-10 max-w-[70%]">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FFC107] animate-ping" />
            <span className="text-[11px] font-black tracking-wider uppercase text-amber-300">
              24/7 Emergency Electrician
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight leading-tight text-white">
            Book certified electricians in under 2 minutes.
          </h1>
          <p className="text-[11px] text-blue-100/90 mt-1 leading-snug">
            Grounding checks, short circuit fixes & smart home wiring with upfront fixed pricing.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => onOpenBooking()}
              className="px-4 py-2 rounded-xl bg-[#FFC107] hover:bg-amber-400 active:scale-95 text-slate-900 text-xs font-black shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              Book Now
            </button>
            <button
              onClick={onOpenStore}
              className="px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 text-white text-xs font-bold backdrop-blur-xs transition-colors cursor-pointer"
            >
              Shop Products
            </button>
          </div>
        </div>

        {/* Decorative lightning artwork overlay */}
        <div className="absolute right-[-15px] bottom-[-20px] w-36 h-36 opacity-15 pointer-events-none">
          <Zap className="w-full h-full text-white" />
        </div>
      </div>

      {/* 5. Service Categories Grid (12 Categories) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Electrical Services
            </h3>
            <p className="text-[11px] text-slate-500">Fixed rate certified home solutions</p>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="text-xs font-bold text-[#0057D9] hover:underline cursor-pointer"
          >
            View all 12
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {filteredServices.slice(0, 8).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onOpenBooking(cat.id)}
              className="flex flex-col items-center p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-sm active:scale-95 transition-all text-center cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-blue-50 group-hover:bg-blue-100/80 text-[#0057D9] flex items-center justify-center mb-1.5 transition-colors">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-[11px] font-bold text-slate-800 leading-tight line-clamp-2">
                {cat.name.split('&')[0].trim()}
              </span>
              <span className="text-[9px] font-semibold text-slate-600 mt-0.5">
                From ${cat.basePrice}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 6. Today's Offers Carousel */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Today's Offers & Deals
            </h3>
          </div>
          <span className="text-[10px] font-bold text-slate-600 uppercase">Flash Promotions</span>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {TODAY_OFFERS.map((offer) => (
            <div
              key={offer.id}
              onClick={() => onOpenBooking()}
              className={`min-w-[220px] p-3.5 rounded-2xl bg-gradient-to-r ${offer.color} text-white shrink-0 cursor-pointer shadow-sm`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-extrabold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full">
                  {offer.badge}
                </span>
                <span className="font-mono text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded">
                  {offer.code}
                </span>
              </div>
              <h4 className="text-xs font-extrabold text-white leading-tight">{offer.title}</h4>
              <p className="text-[10px] text-white/80 mt-1 leading-snug">{offer.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Trusted Electricians (Near You) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Nearby Certified Electricians
            </h3>
            <p className="text-[11px] text-slate-500">Top rated verified pros on duty now</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
            ● 14 Online in KTM
          </span>
        </div>

        <div className="space-y-2.5">
          {TRUSTED_ELECTRICIANS.slice(0, 3).map((elec) => (
            <div
              key={elec.id}
              className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-xs hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={elec.photo}
                    alt={elec.name}
                    className="w-12 h-12 rounded-xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-0.5 rounded-full ring-1 ring-white">
                    <ShieldCheck className="w-2.5 h-2.5" />
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-900">{elec.name}</h4>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded font-bold">
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                    <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {elec.rating}
                    </span>
                    <span>·</span>
                    <span>{elec.experienceYears} yrs</span>
                    <span>·</span>
                    <span>{elec.distanceKm} km away</span>
                  </div>
                  <p className="text-[10px] text-blue-600 font-semibold mt-0.5">
                    Starts at ${elec.startingPrice}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onOpenBooking()}
                className="px-3 py-1.5 rounded-xl bg-[#0057D9] hover:bg-blue-700 text-white text-[11px] font-bold shadow-xs transition-colors cursor-pointer"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Featured Electrical Products (Marketplace Preview) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Featured Electrical Products
            </h3>
            <p className="text-[11px] text-slate-500">Same-day delivery with certified installation</p>
          </div>
          <button
            onClick={onOpenStore}
            className="text-xs font-bold text-[#0057D9] hover:underline cursor-pointer"
          >
            Visit Store
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {STORE_PRODUCTS.slice(0, 4).map((product) => {
            const isWish = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all group"
              >
                <div
                  className="relative aspect-square bg-slate-100 cursor-pointer overflow-hidden"
                  onClick={() => onOpenProductDetail(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {product.discountPercent > 0 && (
                    <span className="absolute top-2 left-2 bg-[#FFC107] text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded">
                      {product.discountPercent}% OFF
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-2 right-2 p-1.5 rounded-full bg-white/90 backdrop-blur-xs transition-colors ${
                      isWish ? 'text-red-500' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-red-500' : ''}`} />
                  </button>
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div onClick={() => onOpenProductDetail(product)} className="cursor-pointer">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">
                      {product.brand}
                    </p>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug mt-0.5">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold mt-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-extrabold text-[#0057D9]">
                        ${product.price}
                      </span>
                      {product.oldPrice > product.price && (
                        <span className="text-[10px] text-slate-400 line-through ml-1">
                          ${product.oldPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product, 1, product.installationAvailable)}
                      className="p-1.5 rounded-xl bg-blue-50 hover:bg-[#0057D9] text-[#0057D9] hover:text-white transition-colors cursor-pointer"
                      title="Add to Cart"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
