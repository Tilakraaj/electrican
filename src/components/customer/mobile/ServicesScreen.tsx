import React, { useState } from 'react';
import { SERVICE_CATEGORIES } from '../../../data/mockData';
import { ServiceCategory, ServiceCategoryId } from '../../../types';
import { Search, Zap, Clock, Star, ShieldCheck, ChevronRight } from 'lucide-react';

interface ServicesScreenProps {
  onSelectService: (serviceId: ServiceCategoryId) => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({ onSelectService }) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'emergency'>('all');

  const filtered = SERVICE_CATEGORIES.filter((cat) => {
    const matchSearch =
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase()) ||
      cat.commonIssues.some((i) => i.toLowerCase().includes(search.toLowerCase()));

    if (!matchSearch) return false;
    if (activeFilter === 'popular') return cat.popular;
    if (activeFilter === 'emergency')
      return cat.id === 'wiring' || cat.id === 'switchboard' || cat.id === 'inverter';
    return true;
  });

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div>
        <h2 className="text-lg font-black text-slate-900 tracking-tight">
          Electrical Services Directory
        </h2>
        <p className="text-xs text-slate-500">
          Standardized upfront pricing with 30-day warranty coverage
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by repair type (e.g., MCB, fan, inverter)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: 'All Services (12)' },
          { id: 'popular', label: 'Most Popular' },
          { id: 'emergency', label: 'Emergency Ready' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === tab.id
                ? 'bg-[#0057D9] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {filtered.map((service) => (
          <div
            key={service.id}
            className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-300 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0057D9] flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xs text-slate-900 leading-tight">
                      {service.name}
                    </h3>
                    {service.popular && (
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1 text-slate-600 font-semibold">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {service.estDuration}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-amber-600 font-semibold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {service.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs text-slate-400 block font-normal">Starts at</span>
                <span className="text-sm font-extrabold text-[#0057D9]">
                  ${service.basePrice}
                </span>
              </div>
            </div>

            {/* Common issues chips preview */}
            <div className="pt-1 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
                {service.commonIssues.slice(0, 2).map((issue) => (
                  <span
                    key={issue}
                    className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md truncate max-w-[130px]"
                  >
                    {issue}
                  </span>
                ))}
              </div>
              <button
                onClick={() => onSelectService(service.id)}
                className="px-3 py-1.5 rounded-xl bg-[#0057D9] hover:bg-blue-700 text-white font-bold text-[11px] shadow-xs flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
              >
                <span>Book Service</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
