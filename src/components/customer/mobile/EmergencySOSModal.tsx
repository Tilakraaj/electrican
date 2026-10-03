import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  AlertTriangle,
  Zap,
  PhoneCall,
  Clock,
  ShieldAlert,
  X,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmergencyDispatched: (bookingId: string) => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  onEmergencyDispatched,
}) => {
  const { triggerEmergencyBooking } = useApp();
  const [selectedHazard, setSelectedHazard] = useState<string>('Short circuit sparking near breaker');
  const [customNote, setCustomNote] = useState<string>('');
  const [isDispatching, setIsDispatching] = useState<boolean>(false);

  if (!isOpen) return null;

  const hazards = [
    'Short circuit sparking near breaker',
    'Burning smell or smoke from switchboard',
    'Electric shock from water tap / wall',
    'Main power outage in whole home',
    'High voltage appliance burnout',
  ];

  const handleInstantSOS = () => {
    setIsDispatching(true);
    setTimeout(() => {
      const description = customNote ? `${selectedHazard}. Details: ${customNote}` : selectedHazard;
      const bookingId = triggerEmergencyBooking(description);
      setIsDispatching(false);
      onClose();
      onEmergencyDispatched(bookingId);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-red-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Urgent Red Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20 animate-pulse">
              <AlertTriangle className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-red-800/80 px-2 py-0.5 rounded-full border border-red-500/40">
                  Priority 1 Dispatch
                </span>
                <span className="text-xs text-red-200">24/7 Rapid Response</span>
              </div>
              <h2 className="text-xl font-extrabold tracking-tight mt-1 text-white">
                Emergency Electrical SOS
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-slate-800">
          {/* Critical safety advice banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong className="font-bold text-amber-950 block">Immediate Safety Protocol:</strong>
              1. Turn off the main circuit breaker / MCB if safe to reach.
              <br />
              2. Do not touch wet walls, puddle water, or exposed wires.
              <br />
              3. Keep children and pets away from the affected area.
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Select Immediate Hazard
            </label>
            <div className="space-y-2">
              {hazards.map((hazard) => {
                const isSelected = selectedHazard === hazard;
                return (
                  <button
                    key={hazard}
                    type="button"
                    onClick={() => setSelectedHazard(hazard)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-red-600 bg-red-50/70 text-red-950 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Zap className={`w-3.5 h-3.5 ${isSelected ? 'text-red-600' : 'text-slate-400'}`} />
                      {hazard}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Additional Details (Optional)
            </label>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. 2nd floor, sparks from breaker box"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-slate-50/50"
            />
          </div>

          {/* Response SLA metrics */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#0057D9]" />
              <div>
                <p className="text-[10px] text-slate-500 font-medium">Guaranteed Arrival</p>
                <p className="text-xs font-bold text-slate-900">Within 10–15 Mins</p>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="text-[10px] text-slate-500 font-medium">Hotline Support</p>
                <p className="text-xs font-bold text-slate-900">+977 1-4500911</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleInstantSOS}
            disabled={isDispatching}
            className="flex-[2] py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:scale-98 text-white text-xs font-extrabold shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isDispatching ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Dispatching Nearest Crew...</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 fill-white" />
                <span>CONFIRM EMERGENCY DISPATCH</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
