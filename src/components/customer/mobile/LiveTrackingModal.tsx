import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { Booking, BookingStatus } from '../../../types';
import {
  X,
  Phone,
  MessageSquare,
  Share2,
  Navigation,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  MapPin,
  ChevronDown,
  Car,
  AlertCircle,
} from 'lucide-react';

interface LiveTrackingModalProps {
  bookingId: string;
  onClose: () => void;
  onOpenChat: (booking: Booking) => void;
  onOpenInvoice: (booking: Booking) => void;
}

export const LiveTrackingModal: React.FC<LiveTrackingModalProps> = ({
  bookingId,
  onClose,
  onOpenChat,
  onOpenInvoice,
}) => {
  const { bookings, updateBookingStatus, showToast } = useApp();
  const booking = bookings.find((b) => b.id === bookingId);

  // Simulated progress along route (0 to 100)
  const [vehicleProgress, setVehicleProgress] = useState<number>(35);
  const [eta, setEta] = useState<number>(booking?.etaMinutes ?? 7);

  useEffect(() => {
    if (!booking || booking.status === 'completed' || booking.status === 'cancelled') return;

    const interval = setInterval(() => {
      setVehicleProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 3;
      });
      setEta((prev) => (prev > 2 ? prev - 1 : 2));
    }, 4000);

    return () => clearInterval(interval);
  }, [booking?.status]);

  if (!booking) return null;

  const stages: { key: BookingStatus; label: string; desc: string }[] = [
    { key: 'confirmed', label: 'Booking Confirmed', desc: 'System matched nearby certified crew' },
    { key: 'assigned', label: 'Electrician Assigned', desc: 'Technician verified tool kit' },
    { key: 'on_the_way', label: 'On the Way', desc: 'En route with electric service vehicle' },
    { key: 'arrived', label: 'Arrived at Location', desc: 'Parked outside customer entrance' },
    { key: 'in_progress', label: 'Service Started', desc: 'Diagnosis & electrical repair active' },
    { key: 'completed', label: 'Service Completed', desc: 'Tested, invoiced & safety verified' },
  ];

  const currentStageIndex = stages.findIndex((s) => s.key === booking.status);
  const activeIndex = currentStageIndex === -1 ? 2 : currentStageIndex;

  const handleAdvanceStatus = () => {
    if (activeIndex < stages.length - 1) {
      const nextStatus = stages[activeIndex + 1].key;
      updateBookingStatus(booking.id, nextStatus);
      if (nextStatus === 'completed') {
        onOpenInvoice(booking);
      }
    }
  };

  const handleShareTracking = () => {
    navigator.clipboard?.writeText(
      `Track my electrician dispatch #${booking.id} live: https://myelectrician.app/track/${booking.id}`
    );
    showToast('success', 'Tracking Link Copied', 'Share link copied to clipboard.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-white sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-full sm:h-[90vh]">
        {/* Top Header */}
        <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
            <h2 className="text-sm font-bold text-slate-900">
              Live Technician Tracking
            </h2>
            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono font-semibold">
              #{booking.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareTracking}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Share Tracking"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Map & Route Simulation */}
        <div className="relative flex-1 bg-slate-100 overflow-hidden min-h-[260px]">
          {/* SVG Map Canvas */}
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 600 400"
            preserveAspectRatio="none"
          >
            {/* Background Roads / Blocks */}
            <rect width="600" height="400" fill="#E2E8F0" />
            {/* City blocks */}
            <rect x="20" y="20" width="120" height="100" rx="8" fill="#CBD5E1" />
            <rect x="160" y="20" width="200" height="100" rx="8" fill="#F1F5F9" />
            <rect x="380" y="20" width="180" height="100" rx="8" fill="#CBD5E1" />

            <rect x="20" y="140" width="120" height="120" rx="8" fill="#F1F5F9" />
            {/* City Park */}
            <rect x="160" y="140" width="200" height="120" rx="8" fill="#D1FAE5" />
            <text x="230" y="205" fill="#059669" fontSize="12" fontWeight="bold">
              Central City Park
            </text>

            <rect x="380" y="140" width="180" height="120" rx="8" fill="#CBD5E1" />

            <rect x="20" y="280" width="260" height="100" rx="8" fill="#CBD5E1" />
            <rect x="300" y="280" width="260" height="100" rx="8" fill="#F1F5F9" />

            {/* River */}
            <path
              d="M0 70 Q 200 40 400 90 T 600 60"
              stroke="#93C5FD"
              strokeWidth="24"
              fill="none"
              opacity="0.8"
            />

            {/* Street Grid network */}
            <line x1="0" y1="130" x2="600" y2="130" stroke="#FFFFFF" strokeWidth="14" />
            <line x1="0" y1="270" x2="600" y2="270" stroke="#FFFFFF" strokeWidth="14" />
            <line x1="150" y1="0" x2="150" y2="400" stroke="#FFFFFF" strokeWidth="14" />
            <line x1="370" y1="0" x2="370" y2="400" stroke="#FFFFFF" strokeWidth="14" />

            {/* Street Center Dotted Lines */}
            <line
              x1="0"
              y1="130"
              x2="600"
              y2="130"
              stroke="#CBD5E1"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            <line
              x1="150"
              y1="0"
              x2="150"
              y2="400"
              stroke="#CBD5E1"
              strokeWidth="2"
              strokeDasharray="6 6"
            />

            {/* Active Dispatch Navigation Route */}
            <path
              d="M 150 340 L 150 270 L 370 270 L 370 130 L 460 130"
              stroke="#0057D9"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.9"
            />
            <path
              d="M 150 340 L 150 270 L 370 270 L 370 130 L 460 130"
              stroke="#FFC107"
              strokeWidth="4"
              strokeDasharray="8 8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Destination Pin: Customer Home */}
            <g transform="translate(460, 130)">
              <circle r="18" fill="#0057D9" opacity="0.2" className="animate-ping" />
              <circle r="12" fill="#0057D9" />
              <circle r="5" fill="#FFFFFF" />
            </g>

            {/* Moving Technician Icon position based on vehicleProgress */}
            {(() => {
              // Path coordinates interpolation:
              // Segment 1: (150, 340) -> (150, 270) (length 70)
              // Segment 2: (150, 270) -> (370, 270) (length 220)
              // Segment 3: (370, 270) -> (370, 130) (length 140)
              // Segment 4: (370, 130) -> (460, 130) (length 90)
              // Total = 520
              const dist = (vehicleProgress / 100) * 520;
              let x = 150;
              let y = 340;
              if (dist <= 70) {
                y = 340 - dist;
              } else if (dist <= 290) {
                y = 270;
                x = 150 + (dist - 70);
              } else if (dist <= 430) {
                x = 370;
                y = 270 - (dist - 290);
              } else {
                y = 130;
                x = 370 + (dist - 430);
              }

              return (
                <g transform={`translate(${x}, ${y})`}>
                  <circle r="22" fill="#0057D9" opacity="0.25" className="animate-pulse" />
                  <circle r="16" fill="#0057D9" stroke="#FFFFFF" strokeWidth="2.5" />
                  {/* Van symbol inside */}
                  <path
                    d="M-7 -3 L-2 -3 L1 0 L6 0 L6 4 L-7 4 Z"
                    fill="#FFC107"
                  />
                  <circle cx="-4" cy="5" r="2" fill="#FFFFFF" />
                  <circle cx="4" cy="5" r="2" fill="#FFFFFF" />
                </g>
              );
            })()}
          </svg>

          {/* Floating ETA Badge */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/80 p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0057D9]">
              <Clock className="w-5 h-5 animate-spin text-blue-600" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                Estimated Arrival
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                  {booking.status === 'arrived' || booking.status === 'in_progress' ? '0' : eta}
                </span>
                <span className="text-xs font-semibold text-slate-600">
                  {booking.status === 'arrived' ? 'Arrived!' : 'mins away'}
                </span>
              </div>
            </div>
          </div>

          {/* Destination Overlay */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/80 p-2.5 max-w-[200px]">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900 truncate">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{booking.addressType}</span>
            </div>
            <p className="text-[10px] text-slate-500 truncate mt-0.5">{booking.address}</p>
          </div>

          {/* Simulation Helper bar */}
          <div className="absolute bottom-3 left-4 right-4 bg-slate-900/90 text-white backdrop-blur-md px-3.5 py-2 rounded-xl flex items-center justify-between text-xs">
            <span className="text-slate-300 text-[11px]">
              Stage: <strong className="text-white capitalize">{booking.status.replace('_', ' ')}</strong>
            </span>
            <button
              onClick={handleAdvanceStatus}
              className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition-colors cursor-pointer"
            >
              Simulate Next Step →
            </button>
          </div>
        </div>

        {/* Status Stepper & Electrician Details Card */}
        <div className="p-4 sm:p-5 bg-white overflow-y-auto space-y-4">
          {/* Electrician Profile Card */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={booking.electricianPhoto || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80'}
                  alt={booking.electricianName || 'Electrician'}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-0.5 rounded-full ring-2 ring-white">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    {booking.electricianName || 'Suman Shrestha'}
                  </h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                    Certified
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span className="flex items-center gap-1 font-semibold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {booking.electricianRating || 4.95}
                  </span>
                  <span>·</span>
                  <span>9 yrs exp</span>
                  <span>·</span>
                  <span>1,420 jobs</span>
                </div>
                <p className="text-[11px] text-slate-600 flex items-center gap-1 mt-1 font-mono">
                  <Car className="w-3 h-3 text-slate-400" />
                  Service Van (BA 23 PA 4912)
                </p>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`tel:${booking.electricianPhone || '+9779801234567'}`}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call</span>
              </a>
              <button
                onClick={() => onOpenChat(booking)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#0057D9] hover:bg-blue-700 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>
            </div>
          </div>

          {/* Live Timeline Stepper */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Service Milestones
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {stages.map((stage, idx) => {
                const isPassed = idx <= activeIndex;
                const isCurrent = idx === activeIndex;

                return (
                  <div
                    key={stage.key}
                    className={`p-2.5 rounded-xl border text-xs transition-all ${
                      isCurrent
                        ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-bold shadow-sm'
                        : isPassed
                        ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950'
                        : 'border-slate-200 bg-slate-50 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono opacity-70">0{idx + 1}</span>
                      {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <p className="text-xs leading-tight">{stage.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Job summary row */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-[10px] font-medium">Booked Service</p>
              <p className="font-bold text-slate-900">{booking.serviceName}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-[10px] font-medium">Estimated Total</p>
              <p className="font-extrabold text-[#0057D9]">${booking.totalAmount.toFixed(2)}</p>
            </div>
          </div>

          {booking.status === 'completed' && (
            <button
              onClick={() => onOpenInvoice(booking)}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>View Service Invoice & Leave Review</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
