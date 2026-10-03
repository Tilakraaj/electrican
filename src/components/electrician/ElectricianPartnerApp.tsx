import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import {
  Wrench,
  Power,
  DollarSign,
  Star,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Navigation,
  AlertTriangle,
  Camera,
  Plus,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  X,
  CreditCard,
  ChevronRight,
} from 'lucide-react';

export const ElectricianPartnerApp: React.FC = () => {
  const {
    electricianOnline,
    setElectricianOnline,
    electricianWallet,
    completedJobsCount,
    bookings,
    updateBookingStatus,
    incomingJobAlert,
    acceptIncomingJob,
    declineIncomingJob,
    showToast,
  } = useApp();

  const [activeJobSubTab, setActiveJobSubTab] = useState<'overview' | 'active_job' | 'wallet' | 'reviews'>('overview');
  const [addedParts, setAddedParts] = useState<{ name: string; price: number }[]>([
    { name: 'Schneider 16A Modular Switch', price: 8 },
  ]);
  const [customPartName, setCustomPartName] = useState('');
  const [customPartPrice, setCustomPartPrice] = useState('');
  const [workPhotos, setWorkPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
  ]);

  // Find active job assigned to technician
  const activeJob = bookings.find(
    (b) => b.status === 'assigned' || b.status === 'on_the_way' || b.status === 'arrived' || b.status === 'in_progress'
  );

  const handleAddPart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPartName || !customPartPrice) return;
    setAddedParts((prev) => [
      ...prev,
      { name: customPartName, price: parseFloat(customPartPrice) || 5 },
    ]);
    setCustomPartName('');
    setCustomPartPrice('');
    showToast('success', 'Part Added to Job Bill', `${customPartName} added.`);
  };

  const handleUploadPhoto = () => {
    setWorkPhotos((prev) => [
      ...prev,
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=400&q=80',
    ]);
    showToast('info', 'Photo Attached', 'Work completion photo uploaded to service record.');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-2 sm:p-6 bg-slate-200/60">
      {/* Container simulating Electrician Partner Handheld App */}
      <div className="w-full max-w-md bg-slate-900 rounded-[44px] border-[10px] border-slate-950 shadow-2xl overflow-hidden flex flex-col h-[850px] max-h-[92vh] text-white relative">
        {/* Partner Top Bar */}
        <div className="pt-4 px-6 pb-2 bg-slate-900 flex items-center justify-between text-xs shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-extrabold tracking-wide text-white">PARTNER DISPATCH</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-mono">ID: ELEC-01</span>
            <span className="text-xs font-bold text-amber-400">4.95 ★</span>
          </div>
        </div>

        {/* Incoming Dispatch Ringing Alert Modal (if any) */}
        {incomingJobAlert && (
          <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-6 flex flex-col justify-between animate-in zoom-in-95">
            <div className="text-center space-y-2 pt-4">
              <div className="w-16 h-16 rounded-full bg-red-600/20 text-red-500 border border-red-500/40 flex items-center justify-center mx-auto animate-bounce">
                <AlertTriangle className="w-8 h-8 fill-red-500 text-slate-950" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-red-400 bg-red-950 px-3 py-1 rounded-full border border-red-800">
                {incomingJobAlert.isEmergency ? '🚨 URGENT EMERGENCY DISPATCH' : '⚡ NEW BOOKING REQUEST'}
              </span>
              <h3 className="text-lg font-black text-white">{incomingJobAlert.serviceName}</h3>
              <p className="text-xs text-slate-400">
                Customer: {incomingJobAlert.customerName} ({incomingJobAlert.address})
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Distance:</span>
                <span className="font-bold text-white">1.4 km (5 mins away)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payout:</span>
                <span className="font-extrabold text-emerald-400">${incomingJobAlert.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Symptoms:</span>
                <span className="text-slate-300 italic truncate max-w-[200px]">
                  {incomingJobAlert.problemDescription}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => declineIncomingJob(incomingJobAlert.id)}
                className="flex-1 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
              >
                Pass (Decline)
              </button>
              <button
                onClick={() => acceptIncomingJob(incomingJobAlert.id)}
                className="flex-[2] py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>ACCEPT DISPATCH</span>
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
          {/* Status Header: Suman Shrestha + Online Toggle */}
          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80"
                  alt="Suman Shrestha"
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <span
                  className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-slate-900 ${
                    electricianOnline ? 'bg-emerald-500' : 'bg-slate-500'
                  }`}
                />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">Suman Shrestha</h3>
                <p className="text-[11px] text-slate-400">Master Electrician · Van #BA 23</p>
              </div>
            </div>

            {/* Online / Offline switch */}
            <button
              onClick={() => {
                setElectricianOnline(!electricianOnline);
                showToast(
                  electricianOnline ? 'warning' : 'success',
                  electricianOnline ? 'Offline' : 'Online',
                  electricianOnline
                    ? 'You are now offline. No dispatches will ring.'
                    : 'You are now online and available for nearby jobs.'
                );
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                electricianOnline
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{electricianOnline ? 'ONLINE' : 'OFFLINE'}</span>
            </button>
          </div>

          {/* Partner Tabs: Overview vs Active Job vs Earnings */}
          <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveJobSubTab('overview')}
              className={`flex-1 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeJobSubTab === 'overview' ? 'bg-[#0057D9] text-white shadow-xs' : 'text-slate-400'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveJobSubTab('active_job')}
              className={`flex-1 py-1.5 rounded-xl font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeJobSubTab === 'active_job' ? 'bg-[#0057D9] text-white shadow-xs' : 'text-slate-400'
              }`}
            >
              <span>Current Job</span>
              {activeJob && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>
            <button
              onClick={() => setActiveJobSubTab('wallet')}
              className={`flex-1 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeJobSubTab === 'wallet' ? 'bg-[#0057D9] text-white shadow-xs' : 'text-slate-400'
              }`}
            >
              Wallet
            </button>
          </div>

          {/* VIEW: OVERVIEW */}
          {activeJobSubTab === 'overview' && (
            <div className="space-y-4">
              {/* Daily KPI Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Today's Earnings
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-emerald-400 tabular-nums">$98.50</span>
                    <span className="text-[10px] text-emerald-500 font-bold">+18%</span>
                  </div>
                  <p className="text-[10px] text-slate-500">3 jobs finished today</p>
                </div>

                <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Wallet Balance
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#FFC107] tabular-nums">
                      ${electricianWallet.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">Weekly auto-payout on Fri</p>
                </div>
              </div>

              {/* Performance Cards */}
              <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Technician Quality Score
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-slate-950 rounded-2xl border border-slate-800/80">
                    <span className="text-amber-400 font-black text-sm block">4.95 ★</span>
                    <span className="text-[10px] text-slate-500">Rating</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-2xl border border-slate-800/80">
                    <span className="text-emerald-400 font-black text-sm block">99.2%</span>
                    <span className="text-[10px] text-slate-500">Acceptance</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-2xl border border-slate-800/80">
                    <span className="text-blue-400 font-black text-sm block">12m</span>
                    <span className="text-[10px] text-slate-500">Avg Arrival</span>
                  </div>
                </div>
              </div>

              {/* Next/Active Booking Banner */}
              {activeJob ? (
                <div
                  onClick={() => setActiveJobSubTab('active_job')}
                  className="p-4 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 border border-blue-700 cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full">
                      Active Customer Dispatch
                    </span>
                    <span className="text-xs font-mono text-blue-200">#{activeJob.id}</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-white">{activeJob.serviceName}</h4>
                  <p className="text-xs text-blue-100 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-300" />
                    <span className="truncate">{activeJob.address}</span>
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs text-blue-200">
                    <span>Stage: <strong className="text-white capitalize">{activeJob.status.replace('_', ' ')}</strong></span>
                    <span className="text-[#FFC107] font-bold">Open Job Sheet →</span>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-2">
                  <Clock className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs font-bold text-slate-400">Waiting for next dispatch nearby</p>
                  <p className="text-[11px] text-slate-500">
                    Keep app open. New job alerts will sound with customer location and payout.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* VIEW: ACTIVE JOB SHEET */}
          {activeJobSubTab === 'active_job' && (
            <div className="space-y-4">
              {activeJob ? (
                <>
                  {/* Job Header */}
                  <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-400 font-mono">
                        Booking #{activeJob.id}
                      </span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {activeJob.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-white">{activeJob.serviceName}</h3>
                      <p className="text-xs text-slate-300 mt-1 italic">
                        "{activeJob.problemDescription}"
                      </p>
                    </div>

                    {/* Customer contact row */}
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-white">{activeJob.customerName}</p>
                        <p className="text-[11px] text-slate-400">{activeJob.address}</p>
                      </div>
                      <a
                        href={`tel:${activeJob.customerPhone}`}
                        className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Stage Transition Buttons */}
                  <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Update Service Workflow Stage
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => updateBookingStatus(activeJob.id, 'arrived')}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          activeJob.status === 'arrived'
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        Mark: Arrived
                      </button>
                      <button
                        onClick={() => updateBookingStatus(activeJob.id, 'in_progress')}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          activeJob.status === 'in_progress'
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        Mark: In Progress
                      </button>
                    </div>
                  </div>

                  {/* Add Spare Parts / Consumables */}
                  <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white">Spare Parts & Hardware Used</label>
                      <span className="text-[10px] text-slate-400">Added to final bill</span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      {addedParts.map((part, idx) => (
                        <div key={idx} className="flex justify-between p-2 bg-slate-950 rounded-xl border border-slate-800">
                          <span className="text-slate-300">{part.name}</span>
                          <span className="font-bold text-emerald-400">+${part.price}</span>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleAddPart} className="flex gap-2">
                      <input
                        type="text"
                        value={customPartName}
                        onChange={(e) => setCustomPartName(e.target.value)}
                        placeholder="Part name (e.g. 2.5mm Wire)"
                        className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                      <input
                        type="number"
                        value={customPartPrice}
                        onChange={(e) => setCustomPartPrice(e.target.value)}
                        placeholder="$"
                        className="w-16 px-2 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                      >
                        Add
                      </button>
                    </form>
                  </div>

                  {/* Upload Work Photos */}
                  <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white">Work Proof & Safety Photos</label>
                      <button
                        onClick={handleUploadPhoto}
                        className="text-xs font-bold text-blue-400 flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Snap Photo</span>
                      </button>
                    </div>

                    <div className="flex gap-2">
                      {workPhotos.map((url, i) => (
                        <div key={i} className="w-16 h-16 rounded-xl overflow-hidden border border-slate-800">
                          <img
                            src={url}
                            alt="Work completion"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Finalize Service Action */}
                  <button
                    onClick={() => {
                      updateBookingStatus(activeJob.id, 'completed');
                      setActiveJobSubTab('overview');
                    }}
                    className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-black text-xs shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>COMPLETE JOB & GENERATE INVOICE</span>
                  </button>
                </>
              ) : (
                <div className="p-8 text-center bg-slate-900 rounded-3xl border border-slate-800 space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs font-bold text-slate-300">No Active Service Job</p>
                  <p className="text-[11px] text-slate-500">
                    Accept an incoming request from the dashboard to open the active job worksheet.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* VIEW: WALLET */}
          {activeJobSubTab === 'wallet' && (
            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-900 to-slate-900 border border-emerald-800/60 space-y-2 text-white">
                <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                  Total Available Balance
                </span>
                <p className="text-3xl font-black tabular-nums">${electricianWallet.toFixed(2)}</p>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => showToast('success', 'Payout Requested', 'Funds initiated to linked bank account.')}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer"
                  >
                    Request Instant Cashout
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Recent Job Settlements
                </h4>
                <div className="divide-y divide-slate-800 text-xs">
                  <div className="py-2.5 flex justify-between">
                    <div>
                      <p className="font-bold text-white">BLDC Fan Installation</p>
                      <p className="text-[10px] text-slate-500">Job #ME-84812 · Sep 28</p>
                    </div>
                    <span className="font-black text-emerald-400">+$38.50</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <div>
                      <p className="font-bold text-white">Customer Tip (Alex Mercer)</p>
                      <p className="text-[10px] text-slate-500">Service Appreciation Tip</p>
                    </div>
                    <span className="font-black text-emerald-400">+$5.00</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <div>
                      <p className="font-bold text-white">Weekly Platform Payout</p>
                      <p className="text-[10px] text-slate-500">Transferred to NIC Asia Bank</p>
                    </div>
                    <span className="font-bold text-slate-400">-$280.00</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
