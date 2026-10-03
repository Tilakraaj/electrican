import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Booking,
  BookingStatus,
  CartItem,
  Electrician,
  NotificationItem,
  Order,
  Product,
} from '../types';
import {
  INITIAL_BOOKINGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ORDERS,
  STORE_PRODUCTS,
  TRUSTED_ELECTRICIANS,
} from '../data/mockData';

export type ViewMode =
  | 'customer_mobile'
  | 'customer_website'
  | 'electrician_app'
  | 'admin_dashboard'
  | 'design_system';

interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface AppContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  // Bookings
  bookings: Booking[];
  activeTrackingBookingId: string | null;
  setActiveTrackingBookingId: (id: string | null) => void;
  createBooking: (newBooking: Omit<Booking, 'id' | 'createdAt'>) => string;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  rateBooking: (id: string, rating: number, review: string, tip: number) => void;
  // Emergency SOS
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;
  triggerEmergencyBooking: (problem: string) => string;
  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, withInstallation?: boolean) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  // Orders
  orders: Order[];
  placeOrder: (paymentMethod: string, address: string) => string;
  // Electrician Partner state
  electricianOnline: boolean;
  setElectricianOnline: (online: boolean) => void;
  electricianWallet: number;
  completedJobsCount: number;
  incomingJobAlert: Booking | null;
  setIncomingJobAlert: (booking: Booking | null) => void;
  acceptIncomingJob: (bookingId: string) => void;
  declineIncomingJob: (bookingId: string) => void;
  // Products management (for Admin)
  products: Product[];
  updateProductStock: (id: string, newStock: number) => void;
  // Notifications
  notifications: NotificationItem[];
  unreadNotifCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  // Toasts
  toasts: ToastMessage[];
  showToast: (type: ToastMessage['type'], title: string, message?: string) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('customer_mobile');
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [activeTrackingBookingId, setActiveTrackingBookingId] = useState<string | null>('ME-84920');
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([
    { product: STORE_PRODUCTS[0], quantity: 1, withInstallation: true },
  ]);
  const [wishlist, setWishlist] = useState<string[]>([STORE_PRODUCTS[1].id]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [products, setProducts] = useState<Product[]>(STORE_PRODUCTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Electrician Partner state
  const [electricianOnline, setElectricianOnline] = useState<boolean>(true);
  const [electricianWallet, setElectricianWallet] = useState<number>(342.5);
  const [completedJobsCount, setCompletedJobsCount] = useState<number>(1420);
  const [incomingJobAlert, setIncomingJobAlert] = useState<Booking | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: ToastMessage['type'], title: string, message?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const createBooking = (newBookingData: Omit<Booking, 'id' | 'createdAt'>): string => {
    const id = `ME-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: Booking = {
      ...newBookingData,
      id,
      createdAt: 'Just now',
      etaMinutes: newBookingData.isEmergency ? 6 : 14,
    };

    setBookings((prev) => [newBooking, ...prev]);
    setActiveTrackingBookingId(id);

    // Also trigger incoming dispatch to partner app if electrician is online
    if (electricianOnline) {
      setIncomingJobAlert(newBooking);
    }

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category: 'Booking',
      title: newBooking.isEmergency ? '🚨 Emergency Electrician Dispatched' : 'Booking Confirmed!',
      message: `Electrician assigned for ${newBooking.serviceName}. ETA: ${newBooking.etaMinutes} mins.`,
      timeAgo: 'Just now',
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast('success', 'Booking Confirmed!', `Service booking #${id} is now active.`);
    return id;
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );

    if (status === 'completed') {
      setCompletedJobsCount((c) => c + 1);
      const bk = bookings.find((b) => b.id === id);
      if (bk) {
        setElectricianWallet((w) => w + bk.totalAmount);
      }
      showToast('success', 'Job Completed', `Booking #${id} has been marked as finished.`);
    } else {
      showToast('info', 'Status Updated', `Booking #${id} status: ${status.replace('_', ' ').toUpperCase()}`);
    }
  };

  const rateBooking = (id: string, rating: number, review: string, tip: number) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              rating,
              reviewText: review,
              tipAmount: tip,
              totalAmount: b.totalAmount + tip,
            }
          : b
      )
    );
    if (tip > 0) {
      setElectricianWallet((w) => w + tip);
    }
    showToast('success', 'Thank You!', 'Your rating and feedback have been recorded.');
  };

  const triggerEmergencyBooking = (problem: string): string => {
    const id = createBooking({
      customerName: 'Alex Mercer',
      customerPhone: '+977 980-1122334',
      serviceId: 'wiring',
      serviceName: 'Emergency Electrical Hazard Response',
      problemDescription: problem || 'Urgent short circuit / power hazard reported.',
      commonIssueSelected: 'Short circuit tripping breaker',
      photos: [],
      address: 'Apartment 4B, Emerald Residency, Lazimpat, Kathmandu',
      addressType: 'Home',
      date: 'Right Now (Emergency Dispatch)',
      timeSlot: 'Within 10-15 Minutes',
      electricianId: 'elec-1',
      electricianName: 'Suman Shrestha',
      electricianPhoto: TRUSTED_ELECTRICIANS[0].photo,
      electricianRating: 4.95,
      electricianPhone: '+977 980-1234567',
      status: 'on_the_way',
      isEmergency: true,
      breakdown: {
        inspection: 20,
        labor: 35,
        parts: 15,
        tax: 7,
      },
      totalAmount: 77,
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
      etaMinutes: 5,
    });
    return id;
  };

  const addToCart = (product: Product, quantity = 1, withInstallation = false) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, withInstallation: withInstallation || item.withInstallation }
            : item
        );
      }
      return [...prev, { product, quantity, withInstallation }];
    });
    showToast('success', 'Added to Cart', `${product.name} is in your shopping cart.`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('info', 'Item Removed', 'Product removed from your cart.');
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('info', 'Wishlist', 'Item removed from wishlist.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('success', 'Wishlist', 'Item saved to wishlist.');
        return [...prev, productId];
      }
    });
  };

  const placeOrder = (paymentMethod: string, address: string): string => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const subtotal = cart.reduce(
      (sum, item) =>
        sum +
        item.product.price * item.quantity +
        (item.withInstallation ? (item.product.installationFee || 0) * item.quantity : 0),
      0
    );
    const discount = subtotal > 100 ? 15 : 0;
    const deliveryFee = subtotal > 50 ? 0 : 5;
    const tax = Math.round((subtotal - discount) * 0.13 * 10) / 10;
    const total = subtotal - discount + deliveryFee + tax;

    const newOrder: Order = {
      id: orderId,
      date: 'Today, Oct 3',
      items: [...cart],
      subtotal,
      discount,
      deliveryFee,
      tax,
      total,
      status: 'Processing',
      paymentMethod,
      shippingAddress: address,
      trackingNumber: `ME-EXP-${Math.floor(10000 + Math.random() * 90000)}`,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category: 'Order',
      title: `Order Confirmed (${orderId})`,
      message: `Your electrical items are being packed for express courier dispatch.`,
      timeAgo: 'Just now',
      isRead: false,
    };
    setNotifications((prev) => [notif, ...prev]);
    showToast('success', 'Order Placed!', `Your order #${orderId} is confirmed.`);
    return orderId;
  };

  const acceptIncomingJob = (bookingId: string) => {
    updateBookingStatus(bookingId, 'assigned');
    setIncomingJobAlert(null);
    showToast('success', 'Job Accepted', `You have been assigned to booking #${bookingId}`);
  };

  const declineIncomingJob = (bookingId: string) => {
    setIncomingJobAlert(null);
    showToast('warning', 'Job Declined', `Request #${bookingId} was routed to the next technician.`);
  };

  const updateProductStock = (id: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, stockCount: newStock, inStock: newStock > 0 }
          : p
      )
    );
    showToast('info', 'Stock Updated', `Inventory updated for product.`);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('info', 'Notifications', 'All notifications marked as read.');
  };

  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        bookings,
        activeTrackingBookingId,
        setActiveTrackingBookingId,
        createBooking,
        updateBookingStatus,
        rateBooking,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        triggerEmergencyBooking,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        orders,
        placeOrder,
        electricianOnline,
        setElectricianOnline,
        electricianWallet,
        completedJobsCount,
        incomingJobAlert,
        setIncomingJobAlert,
        acceptIncomingJob,
        declineIncomingJob,
        products,
        updateProductStock,
        notifications,
        unreadNotifCount,
        markNotificationAsRead,
        markAllNotificationsRead,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
