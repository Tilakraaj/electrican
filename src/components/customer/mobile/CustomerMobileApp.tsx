import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  ServiceCategoryId,
  Product,
  Booking,
} from '../../../types';
import { HomeScreen } from './HomeScreen';
import { ServicesScreen } from './ServicesScreen';
import { StoreScreen } from './StoreScreen';
import { OrdersScreen } from './OrdersScreen';
import { ProfileScreen } from './ProfileScreen';
import { CommunityScreen } from './CommunityScreen';
import { BookingFlowModal } from './BookingFlowModal';
import { LiveTrackingModal } from './LiveTrackingModal';
import { EmergencySOSModal } from './EmergencySOSModal';
import { ProductDetailModal } from './ProductDetailModal';
import { CartAndCheckoutModal } from './CartAndCheckoutModal';
import { InvoiceModal } from './InvoiceModal';
import { ChatModal } from './ChatModal';
import { NotificationsModal } from './NotificationsModal';
import { OnboardingModal } from './OnboardingModal';
import { AuthModal } from './AuthModal';
import {
  Home,
  Wrench,
  ShoppingBag,
  Clock,
  User,
  Users,
  AlertTriangle,
  Zap,
  Wifi,
  BatteryMedium,
  Signal,
  Maximize2,
  Smartphone,
} from 'lucide-react';

export const CustomerMobileApp: React.FC = () => {
  const {
    isEmergencyModalOpen,
    setIsEmergencyModalOpen,
    activeTrackingBookingId,
    setActiveTrackingBookingId,
    cart,
    bookings,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'store' | 'community' | 'orders' | 'profile'>('home');
  const [deviceSkin, setDeviceSkin] = useState<boolean>(true);

  // Modals state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingInitialServiceId, setBookingInitialServiceId] = useState<ServiceCategoryId | undefined>();
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Tracking, chat & invoice
  const [trackingModalBookingId, setTrackingModalBookingId] = useState<string | null>(null);
  const [chatBooking, setChatBooking] = useState<Booking | null>(null);
  const [invoiceBooking, setInvoiceBooking] = useState<Booking | null>(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleOpenBooking = (serviceId?: ServiceCategoryId) => {
    setBookingInitialServiceId(serviceId);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (newBookingId: string) => {
    setTrackingModalBookingId(newBookingId);
  };

  const handleEmergencyDispatched = (newBookingId: string) => {
    setTrackingModalBookingId(newBookingId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-2 sm:p-6 bg-slate-100/70">
      {/* Device frame preview controls toolbar */}
      <div className="w-full max-w-md flex items-center justify-between mb-3 px-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-bold text-slate-700">
          <Smartphone className="w-4 h-4 text-blue-600" />
          <span>Customer Mobile Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="hover:text-blue-600 font-semibold cursor-pointer underline text-[11px]"
          >
            Show Onboarding
          </button>
          <span>·</span>
          <button
            onClick={() => setIsAuthOpen(true)}
            className="hover:text-blue-600 font-semibold cursor-pointer underline text-[11px]"
          >
            Test OTP Login
          </button>
          <span>·</span>
          <button
            onClick={() => setDeviceSkin(!deviceSkin)}
            className="hover:text-slate-900 font-semibold cursor-pointer text-[11px]"
          >
            {deviceSkin ? 'Skin: Phone Frame' : 'Skin: Full Card'}
          </button>
        </div>
      </div>

      {/* Main Simulated Phone Frame */}
      <div
        className={`w-full max-w-[420px] bg-slate-50 relative flex flex-col overflow-hidden transition-all ${
          deviceSkin
            ? 'h-[850px] max-h-[92vh] rounded-[48px] border-[10px] border-slate-900 shadow-2xl ring-1 ring-slate-800'
            : 'min-h-[800px] rounded-3xl border border-slate-200 shadow-xl'
        }`}
      >
        {/* Dynamic Island / Speaker notch */}
        <div className="pt-3 px-6 flex items-center justify-between text-slate-900 text-xs font-bold shrink-0 bg-slate-50 z-20">
          <span>09:41</span>
          <div className="w-24 h-5 bg-slate-900 rounded-full flex items-center justify-end px-2">
            <span className="w-2 h-2 rounded-full bg-blue-500/80 animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5 text-slate-800">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* Scrollable Screen Content Area */}
        <div className="flex-1 overflow-y-auto px-4 pt-2">
          {activeTab === 'home' && (
            <HomeScreen
              onOpenBooking={handleOpenBooking}
              onOpenStore={() => setActiveTab('store')}
              onOpenTracking={(id) => setTrackingModalBookingId(id)}
              onOpenProductDetail={(prod) => setSelectedProductForDetail(prod)}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onOpenEmergencySOS={() => setIsEmergencyModalOpen(true)}
            />
          )}

          {activeTab === 'services' && (
            <ServicesScreen onSelectService={handleOpenBooking} />
          )}

          {activeTab === 'store' && (
            <StoreScreen
              onOpenProductDetail={(prod) => setSelectedProductForDetail(prod)}
              onOpenCart={() => setIsCartModalOpen(true)}
            />
          )}

          {activeTab === 'community' && <CommunityScreen />}

          {activeTab === 'orders' && (
            <OrdersScreen
              onOpenTracking={(id) => setTrackingModalBookingId(id)}
              onOpenInvoice={(b) => setInvoiceBooking(b)}
              onBookAgain={(serviceId) => handleOpenBooking(serviceId)}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileScreen
              onOpenOrders={() => setActiveTab('orders')}
              onOpenWishlist={() => setActiveTab('store')}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
            />
          )}
        </div>

        {/* Fixed Bottom Navigation with Center Floating Emergency SOS button */}
        <div className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-2 shrink-0">
          <div className="grid grid-cols-5 items-center relative">
            {/* Tab: Home */}
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
                activeTab === 'home' ? 'text-[#0057D9]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px] font-bold mt-1 tracking-tight">Home</span>
            </button>

            {/* Tab: Services */}
            <button
              onClick={() => setActiveTab('services')}
              className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
                activeTab === 'services' ? 'text-[#0057D9]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Wrench className="w-5 h-5" />
              <span className="text-[10px] font-bold mt-1 tracking-tight">Services</span>
            </button>

            {/* Center Floating Emergency SOS Button */}
            <div className="flex flex-col items-center justify-center -mt-6">
              <button
                onClick={() => setIsEmergencyModalOpen(true)}
                className="w-13 h-13 rounded-full bg-red-600 hover:bg-red-700 active:scale-90 text-white shadow-xl shadow-red-600/35 border-4 border-white flex flex-col items-center justify-center transition-all cursor-pointer"
                title="24/7 Emergency Dispatch"
              >
                <AlertTriangle className="w-5 h-5 fill-white text-red-600" />
                <span className="text-[8px] font-black tracking-widest mt-0.5">SOS</span>
              </button>
            </div>

            {/* Tab: Store */}
            <button
              onClick={() => setActiveTab('store')}
              className={`relative flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
                activeTab === 'store' ? 'text-[#0057D9]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-[10px] font-bold mt-1 tracking-tight">Store</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-3 w-4 h-4 bg-[#FFC107] text-slate-900 rounded-full text-[9px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Tab: Orders / Profile */}
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
                activeTab === 'orders' ? 'text-[#0057D9]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span className="text-[10px] font-bold mt-1 tracking-tight">Orders</span>
            </button>
          </div>

          {/* Bottom gesture line indicator */}
          <div className="w-32 h-1 bg-slate-300 rounded-full mx-auto mt-2" />
        </div>
      </div>

      {/* MODALS */}
      <BookingFlowModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialServiceId={bookingInitialServiceId}
        onBookingSuccess={handleBookingSuccess}
      />

      {trackingModalBookingId && (
        <LiveTrackingModal
          bookingId={trackingModalBookingId}
          onClose={() => setTrackingModalBookingId(null)}
          onOpenChat={(b) => setChatBooking(b)}
          onOpenInvoice={(b) => setInvoiceBooking(b)}
        />
      )}

      <EmergencySOSModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onEmergencyDispatched={handleEmergencyDispatched}
      />

      {selectedProductForDetail && (
        <ProductDetailModal
          product={selectedProductForDetail}
          onClose={() => setSelectedProductForDetail(null)}
          onOpenCart={() => setIsCartModalOpen(true)}
        />
      )}

      <CartAndCheckoutModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        onOrderPlaced={(orderId) => {
          setActiveTab('orders');
        }}
      />

      {invoiceBooking && (
        <InvoiceModal
          booking={invoiceBooking}
          onClose={() => setInvoiceBooking(null)}
          onBookAgain={(serviceId) => handleOpenBooking(serviceId)}
        />
      )}

      {chatBooking && (
        <ChatModal
          booking={chatBooking}
          onClose={() => setChatBooking(null)}
        />
      )}

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onOpenTracking={(id) => setTrackingModalBookingId(id)}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {}}
      />
    </div>
  );
};
