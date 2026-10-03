import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ShoppingBag,
  Search,
  Star,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Heart,
  ChevronRight,
  Phone,
  RefreshCw,
  Loader2,
  X,
  CreditCard,
  Check,
} from 'lucide-react';

export const DesignSystemExplorer: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    'tokens' | 'typography' | 'buttons' | 'cards' | 'inputs' | 'empty' | 'errors'
  >('tokens');

  // Interactive inputs demo state
  const [inputText, setInputText] = useState('Standard 2.5mm Conduit');
  const [phoneText, setPhoneText] = useState('980-1122334');
  const [switchOn, setSwitchOn] = useState(true);
  const [checkboxOn, setCheckboxOn] = useState(true);
  const [selectedRadio, setSelectedRadio] = useState('option1');
  const [sliderVal, setSliderVal] = useState(65);

  const colors = [
    { name: 'Primary (Electric Blue)', hex: '#0057D9', bg: 'bg-[#0057D9]', text: 'text-white', desc: 'Dominant brand action & primary buttons' },
    { name: 'Secondary (Deep Blue)', hex: '#003B95', bg: 'bg-[#003B95]', text: 'text-white', desc: 'Gradients & dark surfaces' },
    { name: 'Accent (Safety Yellow)', hex: '#FFC107', bg: 'bg-[#FFC107]', text: 'text-slate-950', desc: 'Flash offers & electrical highlights' },
    { name: 'Success (Emerald Green)', hex: '#22C55E', bg: 'bg-[#22C55E]', text: 'text-white', desc: 'Verified status & completed jobs' },
    { name: 'Error (Red)', hex: '#EF4444', bg: 'bg-[#EF4444]', text: 'text-white', desc: 'Emergency SOS & critical hazards' },
    { name: 'Warning (Amber)', hex: '#F59E0B', bg: 'bg-[#F59E0B]', text: 'text-slate-950', desc: 'Attention notes & ratings' },
    { name: 'Background', hex: '#F8FAFC', bg: 'bg-[#F8FAFC]', text: 'text-slate-900 border border-slate-200', desc: 'Clean 60% canvas field' },
    { name: 'Surface', hex: '#FFFFFF', bg: 'bg-white', text: 'text-slate-900 border border-slate-200', desc: 'Elevated 30% card containers' },
    { name: 'Primary Text', hex: '#111827', bg: 'bg-[#111827]', text: 'text-white', desc: 'High-contrast display typography' },
    { name: 'Secondary Text', hex: '#6B7280', bg: 'bg-[#6B7280]', text: 'text-white', desc: 'Quiet unboxed metadata & subtitles' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Intro Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-400/30">
              Living Design System
            </span>
            <span className="text-xs text-blue-200">Material 3 + Human Interface Guidelines</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            MY ELECTRICIAN Design Tokens & Components
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Standardized UI specifications, color tokens, typographic rhythm, 8pt spatial grid, accessibility contrast rules, and state machines for engineering implementation.
          </p>
        </div>

        <BrandLogo size="lg" variant="light" showTagline={true} />
      </div>

      {/* Nav Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar bg-white p-2 rounded-2xl border border-slate-200">
        {[
          { id: 'tokens', label: 'Color Tokens & Rules' },
          { id: 'typography', label: 'Typography Scale' },
          { id: 'buttons', label: 'Buttons & States' },
          { id: 'inputs', label: 'Form Controls' },
          { id: 'cards', label: 'Component Cards' },
          { id: 'empty', label: 'Empty States' },
          { id: 'errors', label: 'Error & Loading States' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeSection === tab.id
                ? 'bg-[#0057D9] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION: COLOR TOKENS */}
      {activeSection === 'tokens' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {colors.map((c) => (
              <div
                key={c.name}
                className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3"
              >
                <div className={`h-20 rounded-2xl ${c.bg} ${c.text} p-3 flex flex-col justify-end`}>
                  <span className="font-mono text-xs font-bold">{c.hex}</span>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">{c.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Color discipline explanation */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 text-xs leading-relaxed text-slate-700">
            <h3 className="text-sm font-black text-slate-900">
              60-30-10 Palette Architecture & Safety Rules
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>60% Canvas (#F8FAFC):</strong> Dominant off-white field providing glare-free outdoor readability on mobile devices.
              </li>
              <li>
                <strong>30% Surfaces (#FFFFFF):</strong> High-clarity 24px rounded card containers with 1px hairline borders (`#E5E7EB`) and soft depth shadows.
              </li>
              <li>
                <strong>10% Accent (#0057D9 & #FFC107):</strong> Concentrated strictly at primary intent points: CTAs, active segmented tabs, and lightning emergency alerts.
              </li>
              <li>
                <strong>Zero Color-Alone Signaling:</strong> Critical hazards (e.g. SOS dispatch) always pair red coloration with explicit alert icons and clear text labels for color-blind accessibility.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* SECTION: TYPOGRAPHY */}
      {activeSection === 'typography' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-6">
          <div>
            <h3 className="text-sm font-black text-slate-900">Typography Scale Hierarchy (Plus Jakarta Sans + Inter)</h3>
            <p className="text-xs text-slate-500">2-font rule pairing characterful headings with clean body prose</p>
          </div>

          <div className="divide-y divide-slate-100 space-y-4">
            <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-[11px] font-mono text-slate-400 w-36">Display (36px / 800)</span>
              <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Powering Your Home.
              </span>
            </div>
            <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-[11px] font-mono text-slate-400 w-36">Heading 1 (28px / 800)</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Reliable Electrical Services at Doorstep
              </span>
            </div>
            <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-[11px] font-mono text-slate-400 w-36">Heading 2 (20px / 700)</span>
              <span className="text-xl font-bold text-slate-900">
                Book Certified Electricians in 2 Minutes
              </span>
            </div>
            <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-[11px] font-mono text-slate-400 w-36">Heading 3 (16px / 700)</span>
              <span className="text-base font-bold text-slate-900">
                Switch Board & Socket Diagnostics
              </span>
            </div>
            <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-[11px] font-mono text-slate-400 w-36">Body Large (16px / 400)</span>
              <span className="text-base text-slate-700">
                Transparent standardized rate cards without hidden surprise charges at the door.
              </span>
            </div>
            <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-[11px] font-mono text-slate-400 w-36">Body Regular (14px / 400)</span>
              <span className="text-sm text-slate-600">
                Every technician holds government certification and carries a $10,000 property damage cover.
              </span>
            </div>
            <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-[11px] font-mono text-slate-400 w-36">Tabular Numerals</span>
              <span className="text-sm font-mono tabular-nums text-slate-900 font-bold">
                Invoice #ME-84920 · Total: $57.50 · ETA: 07:12s
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: BUTTONS */}
      {activeSection === 'buttons' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-6">
          <div>
            <h3 className="text-sm font-black text-slate-900">Buttons & Action States</h3>
            <p className="text-xs text-slate-500">14–16px rounded corners, large 44px touch hitbox</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Button */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Primary Action</span>
              <div className="space-y-2">
                <button className="w-full py-3 px-4 rounded-2xl bg-[#0057D9] hover:bg-blue-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer">
                  Book Electrician Now
                </button>
                <button disabled className="w-full py-3 px-4 rounded-2xl bg-[#0057D9]/50 text-white/80 font-bold text-xs cursor-not-allowed">
                  Disabled Primary
                </button>
                <button className="w-full py-3 px-4 rounded-2xl bg-[#0057D9] text-white font-bold text-xs flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Payment...</span>
                </button>
              </div>
            </div>

            {/* Secondary & Outline */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Secondary & Outline</span>
              <div className="space-y-2">
                <button className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs shadow-xs cursor-pointer">
                  View Service Details
                </button>
                <button className="w-full py-3 px-4 rounded-2xl border border-blue-600 text-[#0057D9] hover:bg-blue-50 font-bold text-xs cursor-pointer">
                  Add to Cart
                </button>
                <button className="w-full py-3 px-4 rounded-2xl text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 font-bold text-xs cursor-pointer">
                  Ghost Button
                </button>
              </div>
            </div>

            {/* Emergency SOS & Danger */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Emergency & Destructive</span>
              <div className="space-y-2">
                <button className="w-full py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 cursor-pointer">
                  <AlertTriangle className="w-4 h-4 fill-white" />
                  <span>24/7 EMERGENCY SOS</span>
                </button>
                <button className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 cursor-pointer">
                  Verify & Complete Job
                </button>
                <button className="w-full py-2.5 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs cursor-pointer">
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: FORM CONTROLS */}
      {activeSection === 'inputs' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-6">
          <div>
            <h3 className="text-sm font-black text-slate-900">Form Inputs & Selection Controls</h3>
            <p className="text-xs text-slate-500">Accessible labels, visible focus rings, and clear error states</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            {/* Standard Text Input */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">Repair Description</label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              <span className="text-[10px] text-slate-400">Describe physical electrical symptoms</span>
            </div>

            {/* Phone Input with Country Code */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">Contact Phone Number</label>
              <div className="flex gap-2">
                <span className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-100 font-bold text-slate-700">
                  +977
                </span>
                <input
                  type="tel"
                  value={phoneText}
                  onChange={(e) => setPhoneText(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-mono"
                />
              </div>
            </div>

            {/* Search Input */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">Catalog Search</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search switches, fans, MCBs..."
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Toggle Switch */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Include Certified Installation</p>
                <p className="text-[10px] text-slate-500">Add technician mounting at checkout</p>
              </div>
              <button
                type="button"
                onClick={() => setSwitchOn(!switchOn)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  switchOn ? 'bg-[#0057D9]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    switchOn ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Checkbox & Radio */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <label
                onClick={() => setCheckboxOn(!checkboxOn)}
                className="flex items-center gap-2.5 cursor-pointer font-bold text-slate-800"
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                    checkboxOn ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                  }`}
                >
                  {checkboxOn && <Check className="w-3.5 h-3.5" />}
                </div>
                <span>30-Day Rework Warranty Protection</span>
              </label>

              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="demo"
                    checked={selectedRadio === 'option1'}
                    onChange={() => setSelectedRadio('option1')}
                    className="accent-blue-600"
                  />
                  <span className="font-medium text-slate-700">Online Wallet</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="demo"
                    checked={selectedRadio === 'option2'}
                    onChange={() => setSelectedRadio('option2')}
                    className="accent-blue-600"
                  />
                  <span className="font-medium text-slate-700">Cash on Delivery</span>
                </label>
              </div>
            </div>

            {/* Range Slider */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between font-bold text-slate-700">
                <span>Maximum Service Budget</span>
                <span className="text-[#0057D9]">${sliderVal}</span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                value={sliderVal}
                onChange={(e) => setSliderVal(parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION: CARDS */}
      {activeSection === 'cards' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service Card */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Service Card</span>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0057D9] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Starts $25
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-900">Switch Board & Socket Repair</h4>
              <p className="text-[11px] text-slate-500">
                Fix sparkling sockets, burnt gang plates and replace heavy 16A points.
              </p>
              <button className="w-full py-2 rounded-xl bg-slate-100 hover:bg-[#0057D9] hover:text-white font-bold text-xs text-slate-800 transition-colors">
                Book Service →
              </button>
            </div>

            {/* Electrician Card */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Electrician Card</span>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80"
                  alt="Suman Shrestha"
                  className="w-12 h-12 rounded-2xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Suman Shrestha</h4>
                  <p className="text-[10px] text-slate-500">Master Electrician · 9 yrs exp</p>
                  <span className="text-xs font-bold text-amber-500 flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    4.95 (384 reviews)
                  </span>
                </div>
              </div>
              <button className="w-full py-2 rounded-xl bg-[#0057D9] text-white font-bold text-xs shadow-xs">
                Request Consultation
              </button>
            </div>

            {/* Review Card */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Review Card</span>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 italic">
                "Our entire kitchen circuit was restored within 40 minutes on a Sunday night. Lifesaver."
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-bold text-slate-800">Priya Sharma</span>
                <span>Verified Booking</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: EMPTY STATES */}
      {activeSection === 'empty' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-6">
          <div>
            <h3 className="text-sm font-black text-slate-900">Standardized Empty States</h3>
            <p className="text-xs text-slate-500">Clear visual icons with actionable recovery CTAs</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-dashed border-slate-300 text-center space-y-2">
              <ShoppingBag className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="text-xs font-bold text-slate-900">Your Cart is Empty</h4>
              <p className="text-[11px] text-slate-500">Explore smart home gadgets and hardware.</p>
              <button className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold">
                Shop Products
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-dashed border-slate-300 text-center space-y-2">
              <Zap className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="text-xs font-bold text-slate-900">No Active Bookings</h4>
              <p className="text-[11px] text-slate-500">You don't have any electrician en route right now.</p>
              <button className="px-3 py-1.5 rounded-xl bg-[#0057D9] text-white text-xs font-bold">
                Book Service
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-dashed border-slate-300 text-center space-y-2">
              <Heart className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="text-xs font-bold text-slate-900">Wishlist is Empty</h4>
              <p className="text-[11px] text-slate-500">Tap the heart on any product to save for later.</p>
              <button className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold">
                Browse Catalog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: ERROR & LOADING STATES */}
      {activeSection === 'errors' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-6">
          <div>
            <h3 className="text-sm font-black text-slate-900">Error Banners, Fallbacks & Skeletons</h3>
            <p className="text-xs text-slate-500">Graceful degradation and explicit recovery actions</p>
          </div>

          <div className="space-y-4">
            {/* Error 1: Network / Connection Failure */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start justify-between gap-3 text-xs text-red-950">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Real-time GPS Connection Interrupted</p>
                  <p className="text-[11px] text-red-800">
                    Unable to stream technician coordinates. Electrician is still en route to your address.
                  </p>
                </div>
              </div>
              <button className="px-3 py-1 rounded-xl bg-red-600 text-white font-bold text-[10px] shrink-0">
                Retry Sync
              </button>
            </div>

            {/* Error 2: Payment Gateway Timeout */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start justify-between gap-3 text-xs text-amber-950">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Digital Wallet Authorization Timed Out</p>
                  <p className="text-[11px] text-amber-800">
                    eSewa wallet did not confirm within 60s. Your booking remains reserved.
                  </p>
                </div>
              </div>
              <button className="px-3 py-1 rounded-xl bg-amber-600 text-white font-bold text-[10px] shrink-0">
                Switch to COD
              </button>
            </div>

            {/* Loading Skeletons */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Skeleton Loader</span>
              <div className="animate-pulse space-y-2.5">
                <div className="h-4 bg-slate-200 rounded-lg w-2/3" />
                <div className="h-3 bg-slate-200 rounded-lg w-full" />
                <div className="h-3 bg-slate-200 rounded-lg w-4/5" />
                <div className="h-10 bg-slate-200 rounded-xl w-32" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
