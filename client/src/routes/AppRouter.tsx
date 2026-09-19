import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/auth/LandingPage';
import { BranchOverviewPage } from '../pages/manager/BranchOverviewPage';
import { RoomAvailabilityPage } from '../pages/frontdesk/RoomAvailabilityPage';
import { GuestServicesPage } from '../pages/frontdesk/GuestServicesPage';
import { ReportsPage } from '../pages/manager/ReportsPage';
import { NewBookingModal } from '../pages/frontdesk/NewBookingModal';
import { useAuth } from '../context/AuthContext';

export const AppRouter: React.FC = () => {
  const { user } = useAuth();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleOpenBookingModal = () => setIsBookingModalOpen(true);
  const handleCloseBookingModal = () => setIsBookingModalOpen(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/manager/dashboard"
          element={user ? <BranchOverviewPage onOpenBookingModal={handleOpenBookingModal} /> : <Navigate to="/" />}
        />
        <Route
          path="/frontdesk/availability"
          element={user ? <RoomAvailabilityPage onOpenBookingModal={handleOpenBookingModal} /> : <Navigate to="/" />}
        />
        <Route
          path="/frontdesk/services"
          element={user ? <GuestServicesPage onOpenBookingModal={handleOpenBookingModal} /> : <Navigate to="/" />}
        />
        <Route
          path="/manager/reports"
          element={user ? <ReportsPage onOpenBookingModal={handleOpenBookingModal} /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <NewBookingModal isOpen={isBookingModalOpen} onClose={handleCloseBookingModal} />
    </>
  );
};
