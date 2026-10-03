import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  ServiceCategory,
  ServiceCategoryId,
  Electrician,
} from '../../../types';
import {
  SERVICE_CATEGORIES,
  TRUSTED_ELECTRICIANS,
} from '../../../data/mockData';
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Mic,
  Camera,
  Upload,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CreditCard,
  Wallet,
  Zap,
  Star,
  Sparkles,
} from 'lucide-react';

interface BookingFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: ServiceCategoryId;
  onBookingSuccess: (bookingId: string) => void;
}

export const BookingFlowModal: React.FC<BookingFlowModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  onBookingSuccess,
}) => {
  const { createBooking } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceCategoryId>(
    initialServiceId || 'switchboard'
  );
  const [selectedCommonIssue, setSelectedCommonIssue] = useState<string>('');
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [hasVoiceNote, setHasVoiceNote] = useState<boolean>(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
  ]);
  const [selectedAddressType, setSelectedAddressType] = useState<'Home' | 'Office' | 'Other'>('Home');
  const [addressLine, setAddressLine] = useState<string>(
    'Apartment 4B, Emerald Residency, Lazimpat, Kathmandu'
  );
  const [selectedDate, setSelectedDate] = useState<string>('Today, Oct 3');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00 AM - 12:00 PM');
  const [selectedElectricianId, setSelectedElectricianId] = useState<string>('auto');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'eSewa' | 'Khalti' | 'Card' | 'Bank Transfer'>('eSewa');
  const [createdBookingId, setCreatedBookingId] = useState<string>('');

  if (!isOpen) return null;

  const currentService =
    SERVICE_CATEGORIES.find((s) => s.id === selectedServiceId) ||
    SERVICE_CATEGORIES[0];

  const matchedElectrician: Electrician | undefined =
    selectedElectricianId === 'auto'
      ? TRUSTED_ELECTRICIANS[0]
      : TRUSTED_ELECTRICIANS.find((e) => e.id === selectedElectricianId);

  // Pricing math
  const inspectionFee = 15;
  const laborEstimate = currentService.basePrice;
  const partsEstimate = 12;
  const subtotal = inspectionFee + laborEstimate + partsEstimate;
  const tax = Math.round(subtotal * 0.13 * 10) / 10;
  const totalAmount = subtotal + tax;

  const handleNext = () => {
    if (step === 10) {
      // Create booking on step 10 -> move to 11 (confirmation)
      const newId = createBooking({
        customerName: 'Alex Mercer',
        customerPhone: '+977 980-1122334',
        serviceId: currentService.id,
        serviceName: currentService.name,
        problemDescription:
          problemDescription || selectedCommonIssue || 'Standard electrical diagnostic & repair',
        commonIssueSelected: selectedCommonIssue,
        photos: uploadedPhotos,
        hasVoiceNote,
        address: addressLine,
        addressType: selectedAddressType,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        electricianId: matchedElectrician?.id,
        electricianName: matchedElectrician?.name,
        electricianPhoto: matchedElectrician?.photo,
        electricianRating: matchedElectrician?.rating,
        electricianPhone: matchedElectrician?.phone,
        status: 'on_the_way',
        breakdown: {
          inspection: inspectionFee,
          labor: laborEstimate,
          parts: partsEstimate,
          tax,
        },
        totalAmount,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      });
      setCreatedBookingId(newId);
      setStep(11);
    } else if (step < 11) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 1 && step < 11) {
      setStep((s) => s - 1);
    }
  };

  const handleSimulateAddPhoto = () => {
    setUploadedPhotos((prev) => [
      ...prev,
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=400&q=80',
    ]);
  };

  const handleToggleVoice = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setTimeout(() => {
        setIsRecordingVoice(false);
        setHasVoiceNote(true);
      }, 2000);
    } else {
      setIsRecordingVoice(false);
      setHasVoiceNote(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl bg-white sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-full sm:h-[90vh]">
        {/* Header with step progress indicator */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            {step > 1 && step < 11 && (
              <button
                onClick={handleBack}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 mr-1"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                Step {step} of 11
              </p>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                {step === 1 && 'Select Electrical Service'}
                {step === 2 && 'Describe Your Problem'}
                {step === 3 && 'Upload Photos & Video'}
                {step === 4 && 'Service Location'}
                {step === 5 && 'Select Preferred Date'}
                {step === 6 && 'Select Time Slot'}
                {step === 7 && 'Choose Electrician'}
                {step === 8 && 'Itemized Price Estimate'}
                {step === 9 && 'Booking Summary'}
                {step === 10 && 'Payment Method'}
                {step === 11 && 'Booking Confirmed!'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar line */}
        <div className="w-full h-1 bg-slate-100">
          <div
            className="h-full bg-[#0057D9] transition-all duration-300"
            style={{ width: `${(step / 11) * 100}%` }}
          />
        </div>

        {/* Step Body */}
        <div className="p-5 flex-1 overflow-y-auto">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Choose the electrical task or problem category you require assistance with:
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {SERVICE_CATEGORIES.map((cat) => {
                  const isSelected = selectedServiceId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedServiceId(cat.id)}
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-8 h-8 rounded-xl bg-blue-100/70 text-[#0057D9] flex items-center justify-center text-xs font-bold">
                          <Zap className="w-4 h-4" />
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 leading-tight">{cat.name}</p>
                        <p className="text-[11px] font-semibold text-blue-600 mt-1">
                          Starts at ${cat.basePrice}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Describe Problem */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Common Symptoms in {currentService.name}
                </label>
                <div className="flex flex-wrap gap-2">
                  {currentService.commonIssues.map((issue) => {
                    const isSelected = selectedCommonIssue === issue;
                    return (
                      <button
                        key={issue}
                        onClick={() => setSelectedCommonIssue(issue)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#0057D9] text-white border-blue-600 shadow-sm'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {issue}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Detailed Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="e.g. Master bedroom wall socket began smoking after plugging in heater. Breaker trips immediately."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                />
              </div>

              {/* Voice Memo feature */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isRecordingVoice
                        ? 'bg-red-500 text-white animate-pulse'
                        : hasVoiceNote
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {isRecordingVoice
                        ? 'Listening to your voice...'
                        : hasVoiceNote
                        ? 'Voice Memo Recorded (0:14s)'
                        : 'Record Voice Memo'}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Explain the issue verbally to the technician
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    isRecordingVoice
                      ? 'bg-red-600 text-white'
                      : hasVoiceNote
                      ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isRecordingVoice ? 'Stop' : hasVoiceNote ? 'Re-record' : 'Tap to Record'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Upload Photos/Videos */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Photos help our technicians bring exact replacement MCBs, sockets, or cable gauges.
              </p>

              <div className="grid grid-cols-3 gap-3">
                {uploadedPhotos.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <img
                      src={url}
                      alt="Problem preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={() => setUploadedPhotos((prev) => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-slate-900/80 text-white flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {/* Upload button */}
                <button
                  onClick={handleSimulateAddPhoto}
                  className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 flex flex-col items-center justify-center text-slate-500 transition-colors cursor-pointer"
                >
                  <Camera className="w-6 h-6 mb-1 text-blue-600" />
                  <span className="text-[11px] font-bold text-slate-700">Add Photo</span>
                  <span className="text-[9px] text-slate-400">or short clip</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Select Address */}
          {step === 4 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                Saved Service Addresses
              </label>

              {[
                { type: 'Home', address: 'Apartment 4B, Emerald Residency, Lazimpat, Kathmandu' },
                { type: 'Office', address: 'Floor 3, Trade Tower, Thapathali, Kathmandu' },
              ].map((item) => {
                const isSelected = selectedAddressType === item.type;
                return (
                  <div
                    key={item.type}
                    onClick={() => {
                      setSelectedAddressType(item.type as any);
                      setAddressLine(item.address);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        {item.type}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-xs text-slate-600">{item.address}</p>
                  </div>
                );
              })}

              <div className="pt-2">
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Or enter specific house / apartment instructions:
                </label>
                <input
                  type="text"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Select Date */}
          {step === 5 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                When do you need the technician?
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: 'Today, Oct 3', tag: 'Fastest' },
                  { label: 'Tomorrow, Oct 4', tag: 'Available' },
                  { label: 'Sunday, Oct 5', tag: 'Weekend' },
                ].map((d) => {
                  const isSelected = selectedDate === d.label;
                  return (
                    <button
                      key={d.label}
                      onClick={() => setSelectedDate(d.label)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-950 font-bold shadow-sm'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Calendar className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                      <p className="text-xs">{d.label.split(',')[0]}</p>
                      <p className="text-[10px] text-slate-500 font-normal">{d.label.split(',')[1]}</p>
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full inline-block mt-1">
                        {d.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: Select Time */}
          {step === 6 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                Select 2-Hour Arrival Window
              </label>
              <div className="space-y-2">
                {[
                  '09:00 AM - 11:00 AM',
                  '11:00 AM - 01:00 PM',
                  '02:00 PM - 04:00 PM',
                  '04:30 PM - 06:30 PM',
                  '07:00 PM - 09:00 PM (Night Slot)',
                ].map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 text-blue-950 shadow-sm'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                        {slot}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 7: Select Electrician */}
          {step === 7 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                Choose Dedicated Technician
              </label>

              {/* Auto match */}
              <div
                onClick={() => setSelectedElectricianId('auto')}
                className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                  selectedElectricianId === 'auto'
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        Smart Auto-Match (Recommended)
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Dispatches fastest verified technician nearby
                      </p>
                    </div>
                  </div>
                  {selectedElectricianId === 'auto' && (
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  )}
                </div>
              </div>

              {/* Individual electricians */}
              {TRUSTED_ELECTRICIANS.slice(0, 3).map((elec) => {
                const isSelected = selectedElectricianId === elec.id;
                return (
                  <div
                    key={elec.id}
                    onClick={() => setSelectedElectricianId(elec.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={elec.photo}
                          alt={elec.name}
                          className="w-10 h-10 rounded-xl object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-xs font-bold text-slate-900">{elec.name}</p>
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded font-bold">
                              Verified
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500">
                            <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              {elec.rating}
                            </span>
                            <span>·</span>
                            <span>{elec.distanceKm} km away</span>
                            <span>·</span>
                            <span>{elec.experienceYears} yrs exp</span>
                          </div>
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 8: Price Estimate Breakdown */}
          {step === 8 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Diagnostic & Safety Inspection:</span>
                  <span className="font-semibold text-slate-900">${inspectionFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Service Labor ({currentService.name}):</span>
                  <span className="font-semibold text-slate-900">${laborEstimate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Consumable Spares (Tapes, clips, screws):</span>
                  <span className="font-semibold text-slate-900">${partsEstimate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>VAT / Taxes (13%):</span>
                  <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-2.5 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>Estimated Total:</span>
                  <span className="text-[#0057D9]">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-2.5 text-xs text-blue-900">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Standardized Rate Guarantee:</strong> If the physical repair requires additional major hardware parts (e.g. brand new MCB or 20m cable), the technician will present itemized pricing in the app for your digital approval before installation.
                </span>
              </div>
            </div>
          )}

          {/* STEP 9: Booking Summary */}
          {step === 9 && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-slate-900">{currentService.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Scheduled:</span>
                  <span className="font-semibold text-slate-900">{selectedDate} @ {selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Technician:</span>
                  <span className="font-semibold text-slate-900">{matchedElectrician?.name || 'Smart Auto-Match'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-900 truncate max-w-[220px]">{addressLine}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Estimated Payable:</span>
                  <span className="text-sm font-extrabold text-[#0057D9]">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 10: Payment */}
          {step === 10 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                Choose Payment Method
              </label>

              {[
                { id: 'eSewa', label: 'eSewa Mobile Wallet', badge: 'Instant Cashback', icon: <Wallet className="w-4 h-4 text-emerald-600" /> },
                { id: 'Khalti', label: 'Khalti Digital Wallet', badge: 'Popular', icon: <Wallet className="w-4 h-4 text-purple-600" /> },
                { id: 'Card', label: 'Credit / Debit Card', badge: 'Visa / Mastercard', icon: <CreditCard className="w-4 h-4 text-blue-600" /> },
                { id: 'COD', label: 'Cash on Service Completion', badge: 'Pay Electrician Directly', icon: <CreditCard className="w-4 h-4 text-amber-600" /> },
              ].map((p) => {
                const isSelected = paymentMethod === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPaymentMethod(p.id as any)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                        {p.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{p.label}</p>
                        <p className="text-[10px] text-slate-500">{p.badge}</p>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 11: Booking Confirmation */}
          {step === 11 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Dispatch Confirmed
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-2">
                  Booking #{createdBookingId} is Active!
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  {matchedElectrician?.name} has accepted your request and is en route in his service van.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-slate-900">{currentService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled:</span>
                  <span className="font-semibold text-slate-800">{selectedDate} @ {selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment:</span>
                  <span className="font-semibold text-slate-800">{paymentMethod}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2 max-w-sm mx-auto">
                <button
                  onClick={() => {
                    onClose();
                    onBookingSuccess(createdBookingId);
                  }}
                  className="w-full py-3 rounded-xl bg-[#0057D9] hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
                >
                  Track Electrician Live Now →
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation CTA */}
        {step < 11 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
            <div className="text-xs">
              <span className="text-slate-400">Total Est:</span>{' '}
              <strong className="text-slate-900 font-extrabold">${totalAmount.toFixed(2)}</strong>
            </div>
            <div className="flex items-center gap-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-[#0057D9] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>{step === 10 ? 'Confirm & Book' : 'Continue'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
