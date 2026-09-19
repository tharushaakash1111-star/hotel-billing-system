import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SideNavBarProps {
  onOpenBookingModal?: () => void;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({ onOpenBookingModal }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: 'Branch Overview', path: '/manager/dashboard', icon: 'dashboard' },
    { label: 'Bookings', path: '/frontdesk/availability', icon: 'calendar_month' },
    { label: 'Guest Services', path: '/frontdesk/services', icon: 'concierge' },
    { label: 'Reports', path: '/manager/reports', icon: 'assessment' },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 backdrop-blur-xl bg-white/80 dark:bg-tertiary-container/80 shadow-[30px_0_60px_-15px_rgba(0,21,47,0.15)] z-50 py-8 px-4 justify-between transition-all duration-300">
      <div>
        {/* Brand Header */}
        <div className="mb-10 px-2">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-white text-[22px]">hotel_class</span>
            </div>
            <h2 className="text-headline-sm font-headline-sm font-bold text-primary tracking-tight text-xl">SkyNest Hotels</h2>
          </div>
          <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest pl-12">Executive Management</p>
        </div>

        {/* Navigation Tabs */}
        <ul className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-primary font-bold border-r-4 border-primary bg-surface-container-low scale-95 origin-left shadow-sm'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[20px] ${isActive ? 'fill' : ''}`}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        {/* Action Button */}
        <button
          onClick={onOpenBookingModal}
          className="w-full mb-6 py-3 px-4 bg-primary hover:bg-primary-container text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex justify-center items-center gap-2 shadow-md"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Booking
        </button>

        {/* Footer Settings */}
        <ul className="space-y-1.5 border-t border-outline-variant/30 pt-4 px-2">
          <li>
            <a href="#" className="flex items-center gap-4 px-2 py-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all text-sm font-medium">
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-4 px-2 py-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all text-sm font-medium">
              <span className="material-symbols-outlined text-[20px]">help_center</span>
              <span>Support</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};
