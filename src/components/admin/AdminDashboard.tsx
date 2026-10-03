import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TRUSTED_ELECTRICIANS,
  STORE_PRODUCTS,
} from '../../data/mockData';
import { BookingStatus, Product } from '../../types';
import { BrandLogo } from '../common/BrandLogo';
import {
  LayoutDashboard,
  Users,
  Wrench,
  ShoppingBag,
  CalendarCheck,
  CreditCard,
  Star,
  Settings,
  ShieldCheck,
  TrendingUp,
  Search,
  Plus,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  DollarSign,
  MapPin,
  Clock,
  ArrowUpRight,
  Filter,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    bookings,
    updateBookingStatus,
    products,
    updateProductStock,
    showToast,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'customers' | 'electricians' | 'bookings' | 'products'
  >('overview');

  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('all');
  const [electricianFilter, setElectricianFilter] = useState<'all' | 'verified' | 'pending'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample customers list
  const customers = [
    {
      id: 'CUST-101',
      name: 'Alex Mercer',
      phone: '+977 980-1122334',
      email: 'alex.mercer@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bookingsCount: 14,
      ordersCount: 3,
      status: 'Active',
      joined: 'Mar 2024',
    },
    {
      id: 'CUST-102',
      name: 'Priya Sharma',
      phone: '+977 981-8899001',
      email: 'priya.sharma@yahoo.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      bookingsCount: 6,
      ordersCount: 1,
      status: 'Active',
      joined: 'Jan 2025',
    },
    {
      id: 'CUST-103',
      name: 'Kiran Dangol',
      phone: '+977 984-1237890',
      email: 'kiran.dangol@outlook.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      bookingsCount: 4,
      ordersCount: 2,
      status: 'Active',
      joined: 'Aug 2025',
    },
  ];

  const filteredBookings = bookings.filter((b) => {
    if (bookingFilterStatus !== 'all' && b.status !== bookingFilterStatus) return false;
    if (searchTerm) {
      return (
        b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-64 bg-slate-900 text-white shrink-0 p-5 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <BrandLogo size="md" variant="light" showTagline={false} />
            <span className="text-[10px] font-mono tracking-widest text-blue-400 font-bold block mt-1">
              CENTRAL DISPATCH CONSOLE
            </span>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            {[
              { id: 'overview', label: 'Executive Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'bookings', label: 'Bookings & Dispatch', icon: <CalendarCheck className="w-4 h-4" />, badge: `${bookings.length}` },
              { id: 'electricians', label: 'Electricians & KYC', icon: <Wrench className="w-4 h-4" />, badge: '4 Verified' },
              { id: 'products', label: 'Product Inventory', icon: <ShoppingBag className="w-4 h-4" />, badge: `${products.length}` },
              { id: 'customers', label: 'Customer Management', icon: <Users className="w-4 h-4" /> },
            ].map((item) => {
              const isActive = activeAdminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveAdminTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0057D9] text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Admin profile footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            <p className="font-bold text-white">Central Operations</p>
            <p className="text-[10px]">Super Admin Access</p>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {activeAdminTab === 'overview' && 'Executive SaaS Dashboard'}
              {activeAdminTab === 'bookings' && 'Booking Dispatch Management'}
              {activeAdminTab === 'electricians' && 'Electrician Partner Directory & KYC'}
              {activeAdminTab === 'products' && 'Marketplace Catalog & Stock Management'}
              {activeAdminTab === 'customers' && 'Registered Customers Directory'}
            </h1>
            <p className="text-xs text-slate-500">
              Real-time platform activity across Kathmandu Valley
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Live API & WebSocket Dispatch Active</span>
            </span>
          </div>
        </div>

        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {activeAdminTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1">
                <span className="text-slate-400 text-xs font-semibold">Total Revenue (MTD)</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-slate-900 tabular-nums">$14,290</span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center">
                    +18.4% <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">14% platform commission cut</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1">
                <span className="text-slate-400 text-xs font-semibold">Active Electricians</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-blue-600 tabular-nums">28 Pro</span>
                  <span className="text-xs font-bold text-emerald-600">14 On Duty</span>
                </div>
                <p className="text-[10px] text-slate-400">99.4% on-time arrival rate</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1">
                <span className="text-slate-400 text-xs font-semibold">Today's Bookings</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-slate-900 tabular-nums">18 Dispatches</span>
                  <span className="text-xs font-bold text-amber-500">2 Urgent SOS</span>
                </div>
                <p className="text-[10px] text-slate-400">Avg response: 1.8 mins</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1">
                <span className="text-slate-400 text-xs font-semibold">Marketplace Orders</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-slate-900 tabular-nums">42 Orders</span>
                  <span className="text-xs font-bold text-emerald-600">$4,850 GMV</span>
                </div>
                <p className="text-[10px] text-slate-400">Smart switches & BLDC fans</p>
              </div>
            </div>

            {/* Charts: Revenue & Weekly Bookings Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Weekly Trend Bar Chart */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Revenue & Service Volume</h3>
                    <p className="text-xs text-slate-400">Past 7 days performance</p>
                  </div>
                  <span className="text-xs font-bold text-[#0057D9] bg-blue-50 px-2.5 py-1 rounded-full">
                    Weekly +22%
                  </span>
                </div>

                {/* SVG Visual Chart */}
                <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-100">
                  {[
                    { day: 'Mon', val: 65, amount: '$1.4k' },
                    { day: 'Tue', val: 78, amount: '$1.8k' },
                    { day: 'Wed', val: 84, amount: '$2.1k' },
                    { day: 'Thu', val: 70, amount: '$1.6k' },
                    { day: 'Fri', val: 95, amount: '$2.6k' },
                    { day: 'Sat', val: 100, amount: '$2.9k' },
                    { day: 'Sun', val: 88, amount: '$2.3k' },
                  ].map((bar) => (
                    <div key={bar.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                      <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                        {bar.amount}
                      </span>
                      <div
                        className="w-full max-w-[36px] bg-gradient-to-t from-[#0057D9] to-blue-400 rounded-t-xl transition-all group-hover:from-blue-700 group-hover:to-blue-500"
                        style={{ height: `${bar.val}%` }}
                      />
                      <span className="text-[11px] font-bold text-slate-600">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Categories Distribution */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Most Requested Services</h3>
                    <p className="text-xs text-slate-400">Share of monthly dispatches</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Grounding High
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { name: 'Switch Board & Socket Repair', pct: 34, color: 'bg-[#0057D9]' },
                    { name: 'House Wiring & Short Circuit', pct: 28, color: 'bg-indigo-600' },
                    { name: 'BLDC Ceiling Fan Setup', pct: 18, color: 'bg-amber-500' },
                    { name: 'Smart Home Automation', pct: 12, color: 'bg-emerald-600' },
                    { name: 'EV Charger & Solar Net Metering', pct: 8, color: 'bg-blue-400' },
                  ].map((cat) => (
                    <div key={cat.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700">{cat.name}</span>
                        <span className="font-bold text-slate-900">{cat.pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${cat.color} rounded-full`}
                          style={{ width: `${cat.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Urgent Dispatches Live Monitor */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Live Dispatch Activity Monitor
                  </h3>
                  <p className="text-xs text-slate-400">Active jobs currently en route or in progress</p>
                </div>
                <button
                  onClick={() => setActiveAdminTab('bookings')}
                  className="text-xs font-bold text-[#0057D9] hover:underline"
                >
                  View All Bookings →
                </button>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {bookings.map((b) => (
                  <div key={b.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{b.serviceName}</span>
                          <span className="text-[10px] font-mono text-slate-400">#{b.id}</span>
                        </div>
                        <p className="text-slate-500 text-[11px]">
                          Customer: {b.customerName} · Technician: {b.electricianName || 'Unassigned'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-[#0057D9]">${b.totalAmount}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase">
                        {b.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS DISPATCH TABLE */}
        {activeAdminTab === 'bookings' && (
          <div className="space-y-4">
            {/* Filter controls */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by ID, customer or service..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
                {['all', 'on_the_way', 'in_progress', 'completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setBookingFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer ${
                      bookingFilterStatus === status
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status.replace('_', ' ').toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="p-4">Booking ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Electrician</th>
                      <th className="p-4">Service</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-mono font-bold text-slate-900">{b.id}</td>
                        <td className="p-4 font-medium">{b.customerName}</td>
                        <td className="p-4 text-slate-800 font-semibold">{b.electricianName || 'Smart Match'}</td>
                        <td className="p-4 font-bold text-slate-900">{b.serviceName}</td>
                        <td className="p-4 text-slate-500">{b.date} ({b.timeSlot})</td>
                        <td className="p-4 font-black text-[#0057D9]">${b.totalAmount.toFixed(2)}</td>
                        <td className="p-4">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              b.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {b.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          {b.status !== 'completed' && (
                            <button
                              onClick={() => updateBookingStatus(b.id, 'completed')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] transition-colors cursor-pointer"
                            >
                              Force Complete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ELECTRICIANS DIRECTORY & KYC */}
        {activeAdminTab === 'electricians' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Partner Contractors</h3>
                  <p className="text-xs text-slate-400">Credential checks, background records and tool audits</p>
                </div>
                <button
                  onClick={() => showToast('info', 'Partner Portal', 'New registration link copied.')}
                  className="px-3.5 py-2 rounded-xl bg-[#0057D9] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Onboard Electrician</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="p-4">Electrician</th>
                      <th className="p-4">Specialization</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4">Experience</th>
                      <th className="p-4">Vehicle</th>
                      <th className="p-4">Jobs Done</th>
                      <th className="p-4">KYC Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {TRUSTED_ELECTRICIANS.map((elec) => (
                      <tr key={elec.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={elec.photo}
                              alt={elec.name}
                              className="w-9 h-9 rounded-xl object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <p className="font-bold text-slate-900">{elec.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{elec.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-slate-800">{elec.specialization}</td>
                        <td className="p-4 font-bold text-amber-600">{elec.rating} ★ ({elec.reviewsCount})</td>
                        <td className="p-4 text-slate-600">{elec.experienceYears} Years</td>
                        <td className="p-4 font-mono text-[11px] text-slate-600">{elec.vehicle}</td>
                        <td className="p-4 font-black text-slate-900 tabular-nums">{elec.completedJobs}</td>
                        <td className="p-4">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Verified License
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-1">
                          <button
                            onClick={() => showToast('success', 'Verified', `Electrician ${elec.name} verified.`)}
                            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px]"
                          >
                            Audit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCT INVENTORY */}
        {activeAdminTab === 'products' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Electrical Hardware Inventory</h3>
                  <p className="text-xs text-slate-400">Real-time warehouse stock and pricing controls</p>
                </div>
                <button
                  onClick={() => showToast('info', 'Add Product', 'Product creation wizard opened.')}
                  className="px-3.5 py-2 rounded-xl bg-[#0057D9] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New SKU</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="p-4">Product Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Brand</th>
                      <th className="p-4">Retail Price</th>
                      <th className="p-4">Discount</th>
                      <th className="p-4">Stock Units</th>
                      <th className="p-4">Installation</th>
                      <th className="p-4 text-right">Stock Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-bold text-slate-900">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-8 h-8 rounded-lg object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <span className="truncate max-w-[200px]">{prod.name}</span>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-slate-700">{prod.category}</td>
                        <td className="p-4 text-slate-500">{prod.brand}</td>
                        <td className="p-4 font-black text-[#0057D9]">${prod.price}</td>
                        <td className="p-4 text-amber-600 font-bold">{prod.discountPercent}%</td>
                        <td className="p-4 font-bold tabular-nums">
                          <span
                            className={prod.stockCount < 10 ? 'text-red-600' : 'text-slate-800'}
                          >
                            {prod.stockCount} in stock
                          </span>
                        </td>
                        <td className="p-4 text-slate-600">
                          {prod.installationAvailable ? `+$${prod.installationFee}` : 'None'}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => updateProductStock(prod.id, prod.stockCount + 10)}
                            className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 font-bold text-[10px] cursor-pointer"
                          >
                            +10 Stock
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMER MANAGEMENT */}
        {activeAdminTab === 'customers' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Customer Accounts</h3>
                <p className="text-xs text-slate-400">Profiles, booking volume and verified account status</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="p-4">Customer ID</th>
                      <th className="p-4">Name & Contact</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Total Bookings</th>
                      <th className="p-4">Store Orders</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {customers.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-mono font-bold text-slate-900">{c.id}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={c.avatar}
                              alt={c.name}
                              className="w-8 h-8 rounded-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <p className="font-bold text-slate-900">{c.name}</p>
                              <p className="text-[10px] text-slate-400">{c.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-slate-600">{c.email}</td>
                        <td className="p-4 font-black text-slate-900 tabular-nums">{c.bookingsCount}</td>
                        <td className="p-4 font-bold text-blue-600 tabular-nums">{c.ordersCount}</td>
                        <td className="p-4">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {c.status}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">{c.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
