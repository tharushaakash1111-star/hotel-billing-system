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
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 backdrop-blur-xl bg-white/80 shadow-[30px_0_60px_-15px_rgba(0,21,47,0.15)] z-50 py-8 px-4 justify-between transition-all duration-300">
      <div>
        <div className="mb-12 px-2">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#00152f] flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white">hotel_class</span>
            </div>
            <h2 className="text-headline-sm font-headline-sm font-bold text-[#00152f] tracking-tight">SkyNest Hotels</h2>
          </div>
          <p className="text-label-sm font-label-sm text-[#43474e] uppercase tracking-widest pl-14">Executive Management</p>
        </div>

        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg text-label-md font-label-md transition-all duration-300 ${
                    isActive
                      ? 'text-[#00152f] font-bold border-r-4 border-[#00152f] bg-[#f0f3ff] scale-95 origin-left'
                      : 'text-[#43474e] hover:text-[#00152f] hover:bg-[#dee8ff]'
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <button
          onClick={onOpenBookingModal}
          className="w-full mb-8 py-3 px-4 bg-[#00152f] text-white rounded-lg text-label-md font-label-md font-semibold hover:shadow-lg hover:shadow-[#00152f]/20 transition-all duration-300 flex justify-center items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Booking
        </button>

        <ul className="space-y-2 border-t border-[#c4c6cf]/30 pt-4">
          <li>
            <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg text-[#43474e] hover:text-[#00152f] hover:bg-[#dee8ff] transition-all duration-300">
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span className="text-label-md font-label-md">Settings</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg text-[#43474e] hover:text-[#00152f] hover:bg-[#dee8ff] transition-all duration-300">
              <span className="material-symbols-outlined text-[20px]">help_center</span>
              <span className="text-label-md font-label-md">Support</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};
