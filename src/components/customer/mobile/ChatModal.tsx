import React, { useState } from 'react';
import { Booking } from '../../../types';
import { X, Send, Phone, ShieldCheck, CheckCheck } from 'lucide-react';

interface ChatModalProps {
  booking: Booking | null;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'customer' | 'technician';
  text: string;
  time: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({ booking, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'technician',
      text: 'Namaste! I am on the way with the diagnostic test kit and replacement breakers. Will be there in about 6 minutes.',
      time: '11:02 AM',
    },
    {
      id: 'm2',
      sender: 'customer',
      text: 'Great, thanks! Please buzz apartment 4B at the main lobby gate.',
      time: '11:04 AM',
    },
    {
      id: 'm3',
      sender: 'technician',
      text: 'Noted! I have my safety gear and digital multimeter ready.',
      time: '11:05 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!booking) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      sender: 'customer',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulate technician reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now() + 1}`,
          sender: 'technician',
          text: 'Understood, arriving shortly!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-white sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-full sm:h-[650px]">
        {/* Chat Header */}
        <div className="px-4 py-3 border-b border-slate-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={booking.electricianPhoto || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80'}
                alt={booking.electricianName || 'Electrician'}
                className="w-10 h-10 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-xs text-slate-900">
                  {booking.electricianName || 'Suman Shrestha'}
                </h3>
                <span className="text-[10px] text-blue-600 bg-blue-50 px-1 rounded font-semibold">
                  Assigned Crew
                </span>
              </div>
              <p className="text-[10px] text-slate-500">Booking #{booking.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <a
              href={`tel:${booking.electricianPhone || '+9779801234567'}`}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/70">
          <div className="text-center my-2">
            <span className="text-[10px] font-medium text-slate-400 bg-white/80 px-2.5 py-1 rounded-full border border-slate-200 shadow-xs">
              End-to-End Encrypted Customer Support Channel
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.sender === 'customer';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-[#0057D9] text-white rounded-br-xs'
                      : 'bg-white text-slate-900 border border-slate-200/80 shadow-xs rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${
                      isMe ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.time}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-blue-200" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input bar */}
        <form
          onSubmit={handleSend}
          className="p-3 border-t border-slate-200 bg-white flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message to your technician..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-[#0057D9] hover:bg-blue-700 disabled:opacity-50 text-white transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
