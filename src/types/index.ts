export type ServiceCategoryId =
  | 'lighting'
  | 'fan'
  | 'switchboard'
  | 'wiring'
  | 'ac'
  | 'waterpump'
  | 'inverter'
  | 'solar'
  | 'smarthome'
  | 'cctv'
  | 'evcharger'
  | 'maintenance';

export interface ServiceCategory {
  id: ServiceCategoryId;
  name: string;
  iconName: string;
  description: string;
  basePrice: number;
  estDuration: string;
  rating: number;
  popular?: boolean;
  commonIssues: string[];
}

export interface Electrician {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  distanceKm: number;
  startingPrice: number;
  verified: boolean;
  specialization: string;
  vehicle: string;
  phone: string;
  completedJobs: number;
  isOnline: boolean;
  lat: number;
  lng: number;
}

export type ProductCategory =
  | 'Lighting'
  | 'Switches'
  | 'Fans'
  | 'Cables'
  | 'MCB'
  | 'Tools'
  | 'Pumps'
  | 'Inverters'
  | 'Solar'
  | 'Smart Home'
  | 'CCTV'
  | 'EV';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  oldPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  warranty: string;
  deliveryInfo: string;
  image: string;
  description: string;
  specifications: Record<string, string>;
  installationAvailable: boolean;
  installationFee: number;
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'assigned'
  | 'on_the_way'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceId: ServiceCategoryId;
  serviceName: string;
  problemDescription: string;
  commonIssueSelected?: string;
  photos: string[];
  hasVoiceNote?: boolean;
  address: string;
  addressType: 'Home' | 'Office' | 'Other';
  date: string;
  timeSlot: string;
  electricianId?: string;
  electricianName?: string;
  electricianPhoto?: string;
  electricianRating?: number;
  electricianPhone?: string;
  status: BookingStatus;
  isEmergency?: boolean;
  breakdown: {
    inspection: number;
    labor: number;
    parts: number;
    tax: number;
  };
  totalAmount: number;
  paymentMethod: 'COD' | 'eSewa' | 'Khalti' | 'Card' | 'Bank Transfer';
  paymentStatus: 'Pending' | 'Paid';
  createdAt: string;
  etaMinutes?: number;
  rating?: number;
  reviewText?: string;
  tipAmount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  withInstallation?: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
  shippingAddress: string;
  trackingNumber: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  customerPhoto: string;
  rating: number;
  date: string;
  serviceType: string;
  comment: string;
  verifiedBooking: boolean;
  photoUrl?: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: 'Customer' | 'Master Electrician' | 'Safety Expert';
  avatar: string;
  title: string;
  content: string;
  category: 'Electrical Safety' | 'DIY' | 'Smart Home' | 'Energy Saving' | 'Solar' | 'Home Maintenance';
  likesCount: number;
  commentsCount: number;
  timeAgo: string;
  isLiked?: boolean;
  hasSolution?: boolean;
}

export interface NotificationItem {
  id: string;
  category: 'Booking' | 'Order' | 'Payment' | 'Offers' | 'System';
  title: string;
  message: string;
  timeAgo: string;
  isRead: boolean;
}
