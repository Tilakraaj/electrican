import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  SERVICE_CATEGORIES,
  TRUSTED_ELECTRICIANS,
  STORE_PRODUCTS,
  TODAY_OFFERS,
  CUSTOMER_REVIEWS,
  ASSET_IMAGES,
} from '../../../data/mockData';
import { Product, ServiceCategoryId } from '../../../types';
import { BrandLogo } from '../../common/BrandLogo';
import { BookingFlowModal } from '../mobile/BookingFlowModal';
import { ProductDetailModal } from '../mobile/ProductDetailModal';
import { CartAndCheckoutModal } from '../mobile/CartAndCheckoutModal';
import { LiveTrackingModal } from '../mobile/LiveTrackingModal';
import {
  Zap,
  ShieldCheck,
  Clock,
  Star,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  ShoppingBag,
  Heart,
  Plus,
  HelpCircle,
  ChevronDown,
  Monitor,
  Tablet,
  Smartphone,
  AlertTriangle,
  Download,
} from 'lucide-react';

export const CustomerWebsite: React.FC = () => {
  const {
    addToCart,
    wishlist,
    toggleWishlist,
    setIsEmergencyModalOpen,
    activeTrackingBookingId,
  } = useApp();

  // Responsive container preview: desktop (100%), tablet (768px), mobile (375px)
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Modals
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceCategoryId | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [trackingId, setTrackingId] = useState<string | null>(null);

  // FAQ open item
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How fast can an emergency electrician arrive at my house?',
      a: 'For Emergency SOS dispatches, our automated nearest-crew matching system assigns certified technicians in under 2 minutes, with a guaranteed arrival SLA of 10 to 15 minutes across Kathmandu Valley.',
    },
    {
      q: 'Are your electricians licensed, background-checked and insured?',
      a: 'Yes, 100%. Every technician on My Electrician holds government certification, passes criminal background checks, and all jobs carry a $10,000 property damage indemnity insurance policy plus a 30-day free rework guarantee.',
    },
    {
      q: 'Can I purchase hardware in the store and book installation together?',
      a: 'Absolutely! When adding any smart switchboard, BLDC fan, or EV wallbox to your cart, check "Add Certified Installation" to have a certified technician deliver and safely mount the unit.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept eSewa, Khalti, Credit/Debit Cards, ConnectIPS/Bank Transfer, and Cash on Delivery (COD) once the electrical service is inspected and completed.',
    },
  ];

  const handleBookService = (id?: ServiceCategoryId) => {
    setSelectedServiceId(id);
    setIsBookingOpen(true);
  };

  const containerWidthClass = {
    desktop: 'w-full',
    tablet: 'max-w-[768px] mx-auto shadow-2xl border-x border-slate-300',
    mobile: 'max-w-[390px] mx-auto shadow-2xl border-x border-slate-300',
  }[viewportMode];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Viewport Breakpoint Switcher Toolbar */}
      <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-xs sticky top-16 z-30">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Responsive Viewport Test:</span>
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setViewportMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                viewportMode === 'desktop' ? 'bg-[#0057D9] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop (1024px+)</span>
            </button>
            <button
              onClick={() => setViewportMode('tablet')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                viewportMode === 'tablet' ? 'bg-[#0057D9] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet (768px)</span>
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                viewportMode === 'mobile' ? 'bg-[#0057D9] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile (390px)</span>
            </button>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-slate-400 text-[11px]">
          <span>⚡ ISO 9001 Electrical Safety Protocol</span>
          <span>·</span>
          <span>24/7 Hotline: +977 1-4500911</span>
        </div>
      </div>

      <div className={`${containerWidthClass} transition-all duration-300 bg-white`}>
        {/* 1. Website Header (Zone 1: Brand, Zone 2: Nav, Zone 3: Actions) */}
        <header className="border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 sticky top-26 bg-white/95 backdrop-blur-md z-20">
          <BrandLogo size="md" showTagline={true} />

          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#services" className="hover:text-[#0057D9] transition-colors">Services</a>
            <a href="#store" className="hover:text-[#0057D9] transition-colors">Marketplace</a>
            <a href="#electricians" className="hover:text-[#0057D9] transition-colors">Electricians</a>
            <a href="#why-us" className="hover:text-[#0057D9] transition-colors">Safety Standards</a>
            <a href="#reviews" className="hover:text-[#0057D9] transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-[#0057D9] transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer"
              title="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleBookService()}
              className="px-4 py-2.5 rounded-xl bg-[#0057D9] hover:bg-blue-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              Book an Electrician
            </button>
          </div>
        </header>

        {/* 2. Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-24 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>⚡ Powering Your Home. Simplifying Your Life.</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                Reliable Electrical Services at Your Doorstep
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Book verified, background-checked master electricians and shop certified electrical appliances with transparent upfront pricing and a 30-day rework warranty.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleBookService()}
                  className="px-6 py-3.5 rounded-2xl bg-[#0057D9] hover:bg-blue-600 active:scale-95 text-white text-sm font-extrabold shadow-xl shadow-blue-500/30 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Book an Electrician</span>
                </button>
                <a
                  href="#store"
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white text-sm font-bold backdrop-blur-sm transition-all"
                >
                  Shop Products
                </a>
              </div>

              {/* Trust markers */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs">
                <div>
                  <p className="text-lg font-black text-white tabular-nums">2 mins</p>
                  <p className="text-slate-400 text-[11px]">Instant Dispatch</p>
                </div>
                <div>
                  <p className="text-lg font-black text-amber-300 tabular-nums">4.95 ★</p>
                  <p className="text-slate-400 text-[11px]">1,400+ Verified Reviews</p>
                </div>
                <div>
                  <p className="text-lg font-black text-emerald-400 tabular-nums">$10k</p>
                  <p className="text-slate-400 text-[11px]">Damage Cover Included</p>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="relative">
              <div className="aspect-16/10 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl relative">
                <img
                  src={ASSET_IMAGES.hero}
                  alt="Certified Electrician inspecting smart home panel"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 text-slate-900 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Certified Master Technicians</p>
                      <p className="text-[10px] text-slate-500">Equipped with digital thermal cameras & fault testers</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    SLA 15m
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Services Grid */}
        <section id="services" className="py-16 px-6 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">
              Standardized Rate Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Certified Electrical Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Transparent rate cards without hidden hourly surcharges. 30-day warranty on all repairs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-blue-600 text-[#0057D9] group-hover:text-white flex items-center justify-center transition-colors">
                      <Zap className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                      Starts ${cat.basePrice}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#0057D9] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {cat.commonIssues.slice(0, 3).map((issue) => (
                      <span
                        key={issue}
                        className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                      >
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Duration: ~{cat.estDuration}
                  </span>
                  <button
                    onClick={() => handleBookService(cat.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-[#0057D9] text-slate-800 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Book Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. How It Works */}
        <section className="py-16 bg-slate-50 border-y border-slate-200 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600">
                Simple & Seamless
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                How My Electrician Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Select Service & Describe',
                  desc: 'Pick your electrical issue, attach a photo or voice note for exact tooling match.',
                },
                {
                  step: '02',
                  title: 'Instant Crew Matching',
                  desc: 'Our dispatch algorithm assigns the highest-rated master electrician nearest to you.',
                },
                {
                  step: '03',
                  title: 'Live Uber-Style GPS',
                  desc: 'Track technician van in real time with exact route and live minute-by-minute ETA.',
                },
                {
                  step: '04',
                  title: 'Safe Insured Repair',
                  desc: 'Tested to electrical safety standards. Digital receipt & 30-day warranty issued.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2"
                >
                  <span className="text-xl font-black text-[#0057D9] font-mono">{item.step}</span>
                  <h4 className="text-xs font-extrabold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Electrical Products Marketplace */}
        <section id="store" className="py-16 px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-blue-600">
                Hardware & Smart Gear
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Electrical Products Marketplace
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Genuine components directly from certified manufacturers with professional installation.
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Shopping Cart</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STORE_PRODUCTS.map((prod) => {
              const isWish = wishlist.includes(prod.id);
              return (
                <div
                  key={prod.id}
                  className="rounded-3xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
                >
                  <div
                    className="relative aspect-4/3 bg-slate-100 cursor-pointer overflow-hidden"
                    onClick={() => setSelectedProduct(prod)}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    {prod.discountPercent > 0 && (
                      <span className="absolute top-3 left-3 bg-[#FFC107] text-slate-900 text-xs font-black px-2 py-0.5 rounded-lg shadow-xs">
                        {prod.discountPercent}% OFF
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs transition-colors ${
                        isWish ? 'text-red-500' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWish ? 'fill-red-500' : ''}`} />
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div onClick={() => setSelectedProduct(prod)} className="cursor-pointer">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
                        <span>{prod.brand}</span>
                        <span className="text-slate-500">{prod.warranty.split(' ')[0]} {prod.warranty.split(' ')[1]}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-2 leading-snug">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {prod.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-black text-[#0057D9]">
                          ${prod.price}
                        </span>
                        {prod.oldPrice > prod.price && (
                          <span className="text-xs text-slate-400 line-through ml-2">
                            ${prod.oldPrice}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => addToCart(prod, 1, prod.installationAvailable)}
                        className="px-3.5 py-2 rounded-xl bg-[#0057D9] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. Trusted Electricians Section */}
        <section id="electricians" className="py-16 bg-slate-50 border-t border-slate-200 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600">
                Verified Contractors
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Meet Our Master Electricians
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TRUSTED_ELECTRICIANS.map((elec) => (
                <div
                  key={elec.id}
                  className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div className="text-center">
                    <img
                      src={elec.photo}
                      alt={elec.name}
                      className="w-20 h-20 rounded-2xl object-cover mx-auto shadow-md mb-3"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex items-center justify-center gap-1.5">
                      <h4 className="font-extrabold text-sm text-slate-900">{elec.name}</h4>
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">{elec.specialization}</p>

                    <div className="flex items-center justify-center gap-2 mt-2 text-xs">
                      <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {elec.rating}
                      </span>
                      <span>·</span>
                      <span className="text-slate-500">{elec.experienceYears} yrs</span>
                      <span>·</span>
                      <span className="text-slate-500">{elec.completedJobs} jobs</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookService()}
                    className="w-full mt-4 py-2 rounded-xl bg-slate-100 hover:bg-[#0057D9] text-slate-800 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Book Consultation
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Why My Electrician / Trust & Safety */}
        <section id="why-us" className="py-16 px-6 max-w-6xl mx-auto">
          <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-blue-900 to-[#0057D9] text-white">
            <div className="max-w-2xl space-y-3 mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                Safety Guarantee
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Why Thousands Trust My Electrician
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                Electricity is unforgiving. That is why our platform enforces the strictest vetting, calibration, and insurance standards in the industry.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-2">
                <CheckCircle2 className="w-6 h-6 text-amber-300" />
                <h4 className="font-extrabold text-sm text-white">Rigorous 5-Step Verification</h4>
                <p className="text-blue-100 leading-relaxed">
                  Identity checks, electrical licensing confirmation, practical workshop test, and criminal record clearance.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-2">
                <ShieldCheck className="w-6 h-6 text-emerald-300" />
                <h4 className="font-extrabold text-sm text-white">$10,000 Property Indemnity</h4>
                <p className="text-blue-100 leading-relaxed">
                  Every home repair is insured against accidental circuit damage or appliance faults. Free 30-day rework warranty.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-2">
                <Clock className="w-6 h-6 text-amber-300" />
                <h4 className="font-extrabold text-sm text-white">Transparent Fixed Pricing</h4>
                <p className="text-blue-100 leading-relaxed">
                  Digital itemized quotes generated upfront before work commences. No surprise hourly charges at the door.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Customer Reviews */}
        <section id="reviews" className="py-16 bg-slate-50 border-t border-slate-200 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600">
                Real Customer Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Rated 4.95 Stars Across Kathmandu
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CUSTOMER_REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <img
                      src={rev.customerPhoto}
                      alt={rev.customerName}
                      className="w-10 h-10 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{rev.customerName}</h4>
                      <p className="text-[10px] text-slate-400">{rev.serviceType}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. FAQ Accordion */}
        <section id="faq" className="py-16 px-6 max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs text-slate-900 flex items-center justify-between cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 10. Footer */}
        <footer className="bg-slate-900 text-white pt-16 pb-12 px-6 border-t border-slate-800">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800 text-xs">
            <div className="space-y-4">
              <BrandLogo size="md" variant="light" showTagline={true} />
              <p className="text-slate-400 leading-relaxed">
                Kathmandu's premier on-demand electrical services and electrical product marketplace platform.
              </p>
              <div className="pt-2">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-bold">24/7 Central Dispatch</span>
                <span className="text-sm font-mono font-bold text-amber-300">+977 1-4500911</span>
              </div>
            </div>

            <div>
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-4">
                Popular Services
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => handleBookService('switchboard')} className="hover:text-white cursor-pointer">Switch Board & Sockets</button></li>
                <li><button onClick={() => handleBookService('fan')} className="hover:text-white cursor-pointer">BLDC Fan Installation</button></li>
                <li><button onClick={() => handleBookService('wiring')} className="hover:text-white cursor-pointer">House Wiring & MCB Fix</button></li>
                <li><button onClick={() => handleBookService('inverter')} className="hover:text-white cursor-pointer">Inverters & Battery Backups</button></li>
                <li><button onClick={() => handleBookService('evcharger')} className="hover:text-white cursor-pointer">EV Home Wallbox 7.4kW</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-4">
                Electrical Marketplace
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#store" className="hover:text-white">Smart Glass Switches</a></li>
                <li><a href="#store" className="hover:text-white">Schneider MCBs & RCDs</a></li>
                <li><a href="#store" className="hover:text-white">Havells Pure Copper Cables</a></li>
                <li><a href="#store" className="hover:text-white">AeroBreeze BLDC Fans</a></li>
                <li><a href="#store" className="hover:text-white">VoltShield Sine Inverters</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-4">
                Licensing & Trust
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Licensed Electrical Contractor #EC-98412-KTM. Backed by $10,000 property indemnity insurance policy.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[10px] bg-slate-800 text-emerald-400 font-bold px-2 py-1 rounded">
                  ISO 9001 Certified
                </span>
                <span className="text-[10px] bg-slate-800 text-amber-300 font-bold px-2 py-1 rounded">
                  24/7 SOS Ready
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p>© 2026 My Electrician Inc. All rights reserved. Powering Your Home. Simplifying Your Life.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <span>·</span>
              <a href="#" className="hover:text-white">Electrical Safety Protocols</a>
              <span>·</span>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Booking Modal */}
      <BookingFlowModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialServiceId={selectedServiceId}
        onBookingSuccess={(id) => setTrackingId(id)}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenCart={() => setIsCartOpen(true)}
        />
      )}

      {/* Cart Modal */}
      <CartAndCheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOrderPlaced={() => {}}
      />

      {/* Tracking Modal */}
      {trackingId && (
        <LiveTrackingModal
          bookingId={trackingId}
          onClose={() => setTrackingId(null)}
          onOpenChat={() => {}}
          onOpenInvoice={() => {}}
        />
      )}
    </div>
  );
};
