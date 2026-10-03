/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopNavigation } from './components/common/TopNavigation';
import { ToastContainer } from './components/common/ToastContainer';
import { CustomerMobileApp } from './components/customer/mobile/CustomerMobileApp';
import { CustomerWebsite } from './components/customer/website/CustomerWebsite';
import { ElectricianPartnerApp } from './components/electrician/ElectricianPartnerApp';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DesignSystemExplorer } from './components/design_system/DesignSystemExplorer';
import { EmergencySOSModal } from './components/customer/mobile/EmergencySOSModal';
import { LiveTrackingModal } from './components/customer/mobile/LiveTrackingModal';

const AppContent: React.FC = () => {
  const {
    viewMode,
    isEmergencyModalOpen,
    setIsEmergencyModalOpen,
    activeTrackingBookingId,
    setActiveTrackingBookingId,
  } = useApp();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* Top Navigation master perspective switcher */}
      <TopNavigation />

      {/* Main Perspective Views */}
      <div className="flex-1">
        {viewMode === 'customer_mobile' && <CustomerMobileApp />}
        {viewMode === 'customer_website' && <CustomerWebsite />}
        {viewMode === 'electrician_app' && <ElectricianPartnerApp />}
        {viewMode === 'admin_dashboard' && <AdminDashboard />}
        {viewMode === 'design_system' && <DesignSystemExplorer />}
      </div>

      {/* Global Emergency SOS modal */}
      <EmergencySOSModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onEmergencyDispatched={(id) => {
          setActiveTrackingBookingId(id);
        }}
      />

      {/* Global System Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
