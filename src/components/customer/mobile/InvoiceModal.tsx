import React, { useState } from 'react';
import { Booking } from '../../../types';
import { useApp } from '../../../context/AppContext';
import {
  X,
  CheckCircle2,
  Download,
  Star,
  ShieldCheck,
  Heart,
  Repeat,
  FileText,
  DollarSign,
} from 'lucide-react';

interface InvoiceModalProps {
  booking: Booking | null;
  onClose: () => void;
  onBookAgain: (serviceId: any) => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  booking,
  onClose,
  onBookAgain,
}) => {
  const { rateBooking, showToast } = useApp();
  const [selectedRating, setSelectedRating] = useState<number>(booking?.rating || 5);
  const [reviewText, setReviewText] = useState<string>(booking?.reviewText || '');
  const [tip, setTip] = useState<number>(booking?.tipAmount || 5);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!booking?.rating);

  if (!booking) return null;

  const handleSaveReview = () => {
    rateBooking(booking.id, selectedRating, reviewText, tip);
    setIsSubmitted(true);
  };

  const handleDownloadInvoice = () => {
    showToast('success', 'Invoice Downloaded', `Invoice_${booking.id}.pdf saved to your device.`);
  };

  const totalWithTip = booking.totalAmount + (isSubmitted ? 0 : tip);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-white sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-full sm:h-[90vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                Service Completed & Invoiced
              </h2>
              <p className="text-[10px] text-slate-500 font-mono">Invoice #{booking.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable invoice content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-slate-800">
          {/* Success Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-950">Electrical Safety Verified</p>
                <p className="text-[11px] text-emerald-800">
                  Grounding & load tested. 30-day rework warranty active.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
              {booking.paymentStatus === 'Paid' ? 'PAID' : 'PENDING'}
            </span>
          </div>

          {/* Electrician summary */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <img
                src={booking.electricianPhoto || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80'}
                alt={booking.electricianName || 'Electrician'}
                className="w-12 h-12 rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">{booking.electricianName || 'Suman Shrestha'}</p>
                <p className="text-[11px] text-slate-500">Master Electrical Contractor</p>
                <div className="flex items-center gap-1 text-[10px] text-amber-600 font-semibold mt-0.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{booking.electricianRating || 4.95} Rating</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleDownloadInvoice}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>
          </div>

          {/* Itemized Bill */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-white space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
              Itemized Charges
            </h4>
            <div className="flex justify-between text-slate-600">
              <span>{booking.serviceName} Base Labor:</span>
              <span className="font-semibold text-slate-900">${booking.breakdown.labor.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Initial Diagnostic & Safety Scan:</span>
              <span className="font-semibold text-slate-900">${booking.breakdown.inspection.toFixed(2)}</span>
            </div>
            {booking.breakdown.parts > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Spare Parts & Wire Fittings:</span>
                <span className="font-semibold text-slate-900">${booking.breakdown.parts.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Government VAT (13%):</span>
              <span className="font-semibold text-slate-900">${booking.breakdown.tax.toFixed(2)}</span>
            </div>
            {tip > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Technician Appreciation Tip:</span>
                <span>+${tip.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-extrabold text-slate-900">
              <span>Total Amount:</span>
              <span className="text-[#0057D9]">${totalWithTip.toFixed(2)}</span>
            </div>
            <div className="text-[11px] text-slate-500 pt-1">
              Paid via {booking.paymentMethod} · Trans ID: TXN-{booking.id.replace('ME-', '748')}
            </div>
          </div>

          {/* Tip Technician Section */}
          {!isSubmitted && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Tip Your Electrician (Optional)</span>
                <span className="text-[10px] text-emerald-600 font-semibold">100% goes directly to crew</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[0, 3, 5, 10].map((amount) => {
                  const isSelected = tip === amount;
                  return (
                    <button
                      key={amount}
                      onClick={() => setTip(amount)}
                      className={`py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {amount === 0 ? 'No Tip' : `$${amount}`}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Rate & Review */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {isSubmitted ? 'Your Feedback' : 'Rate Your Experience'}
            </h4>

            {/* Stars */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  disabled={isSubmitted}
                  onClick={() => setSelectedRating(star)}
                  className="cursor-pointer transition-transform hover:scale-110 disabled:cursor-default"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= selectedRating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-700 ml-2">
                {selectedRating === 5 && 'Excellent (5.0)'}
                {selectedRating === 4 && 'Very Good (4.0)'}
                {selectedRating === 3 && 'Average (3.0)'}
                {selectedRating < 3 && 'Needs Improvement'}
              </span>
            </div>

            {!isSubmitted ? (
              <>
                <textarea
                  rows={2}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share a few words about the electrician's punctuality, professionalism, and workmanship..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
                />
                <button
                  onClick={handleSaveReview}
                  className="w-full py-2.5 rounded-xl bg-[#0057D9] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  Submit Rating & Tip
                </button>
              </>
            ) : (
              <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded-xl border border-slate-200">
                "{reviewText || 'Punctual, super neat wiring, left the room completely clean. Highly recommended!'}"
              </p>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              onClose();
              onBookAgain(booking.serviceId);
            }}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Book Again</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
