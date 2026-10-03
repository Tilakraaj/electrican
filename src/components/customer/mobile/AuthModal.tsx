import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { BrandLogo } from '../../common/BrandLogo';
import {
  X,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  RefreshCw,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (phone: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { showToast } = useApp();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('9801122334');
  const [countryCode, setCountryCode] = useState('+977');
  const [otp, setOtp] = useState(['5', '2', '8', '1', '9', '0']);
  const [countdown, setCountdown] = useState(28);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 7) {
      showToast('error', 'Invalid Phone', 'Please provide a valid phone number.');
      return;
    }
    setStep('otp');
    setCountdown(30);
    showToast('info', 'OTP Sent', `A 6-digit verification code was sent to ${countryCode} ${phone}`);
  };

  const handleVerifyOtp = () => {
    showToast('success', 'Logged In', 'Welcome back, Alex Mercer!');
    onSuccess(`${countryCode} ${phone}`);
    onClose();
  };

  const handleGoogleLogin = () => {
    showToast('success', 'Google Auth', 'Successfully connected with Google Account.');
    onSuccess('+977 9801122334');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <BrandLogo size="md" showTagline={true} />
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Welcome to My Electrician
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your mobile number to book electricians and track services.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[11px]">
                Phone Number
              </label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="px-3 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 focus:outline-none"
                >
                  <option value="+977">NP +977</option>
                  <option value="+1">US +1</option>
                  <option value="+91">IN +91</option>
                  <option value="+44">UK +44</option>
                </select>
                <div className="relative flex-1">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="980-1234567"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-xs font-bold tracking-wide focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#0057D9] hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Continue with Phone</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200" />
              <span className="flex-shrink mx-3 text-[11px] text-slate-400 font-medium">or</span>
              <div className="flex-grow border-t border-slate-200" />
            </div>

            {/* Google Login button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
              By proceeding, you agree to My Electrician's Terms of Service, Electrical Safety Policy, and Privacy Policy.
            </p>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Enter 6-Digit OTP
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Verification code sent to{' '}
                <span className="font-bold text-slate-800">
                  {countryCode} {phone}
                </span>{' '}
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-blue-600 underline font-semibold ml-1"
                >
                  Edit
                </button>
              </p>
            </div>

            {/* 6 Digit Input boxes */}
            <div className="flex gap-2 justify-center my-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[index] = e.target.value;
                    setOtp(newOtp);
                  }}
                  className="w-11 h-12 text-center text-lg font-black rounded-xl border border-slate-300 bg-slate-50 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              {countdown > 0 ? (
                <span>Resend OTP in 0:{countdown < 10 ? `0${countdown}` : countdown}s</span>
              ) : (
                <button
                  type="button"
                  onClick={() => setCountdown(30)}
                  className="text-blue-600 font-bold flex items-center gap-1 hover:underline"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Resend OTP</span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleVerifyOtp}
              className="w-full py-3.5 rounded-2xl bg-[#0057D9] hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify & Continue</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
