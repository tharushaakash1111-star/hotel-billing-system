import React from 'react';
import { SideNavBar } from '../../components/layout/SideNavBar';
import { TopNavBar } from '../../components/layout/TopNavBar';

interface BranchOverviewProps {
  onOpenBookingModal: () => void;
}

export const BranchOverviewPage: React.FC<BranchOverviewProps> = ({ onOpenBookingModal }) => {
  return (
    <div className="bg-[#f9f9ff] min-h-screen font-body-md text-[#111c2c]">
      <TopNavBar />
      <SideNavBar onOpenBookingModal={onOpenBookingModal} />

      <main className="md:ml-64 pt-24 md:pt-32 px-6 md:px-margin-desktop pb-24 max-w-container-max mx-auto">
        <header className="mb-12">
          <h1 className="text-display-lg md:text-display-lg font-headline-md font-bold text-[#00152f] mb-2">
            Good Morning, Management
          </h1>
          <p className="text-body-lg text-[#43474e]">
            Here's a serene overview of your properties' performance today.
          </p>
        </header>

        {/* Bento Key Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Occupancy */}
          <div className="bg-white rounded-xl p-8 shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center gap-2 text-[#43474e] mb-4">
              <span className="material-symbols-outlined text-[#735c00]">king_bed</span>
              <h3 className="text-xs uppercase tracking-wider font-semibold">Total Occupancy</h3>
            </div>
            <p className="text-headline-md font-headline-md text-3xl font-bold text-[#00152f]">85%</p>
            <div className="mt-8 w-full bg-[#f0f3ff] h-2 rounded-full overflow-hidden">
              <div className="bg-[#00152f] h-full w-[85%] rounded-full"></div>
            </div>
          </div>

          {/* Active Bookings */}
          <div className="bg-white rounded-xl p-8 shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center gap-2 text-[#43474e] mb-4">
              <span className="material-symbols-outlined text-[#00152f]">confirmation_number</span>
              <h3 className="text-xs uppercase tracking-wider font-semibold">Active Bookings</h3>
            </div>
            <p className="text-headline-md font-headline-md text-3xl font-bold text-[#00152f]">42</p>
            <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-[#735c00]">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span>+12% vs yesterday</span>
            </div>
          </div>

          {/* Revenue Today */}
          <div className="bg-[#00152f] text-white rounded-xl p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center gap-2 text-[#b0c8f0] mb-4">
                <span className="material-symbols-outlined">payments</span>
                <h3 className="text-xs uppercase tracking-wider font-semibold">Revenue Today</h3>
              </div>
              <p className="text-headline-md font-headline-md text-3xl font-bold">$12,400</p>
            </div>
            <div className="mt-8 h-10 opacity-80">
              <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path d="M0,25 Q10,15 20,20 T40,10 T60,15 T80,5 T100,0" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </section>

        {/* Branch Performance & Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center border-b border-[#c4c6cf]/30 pb-4">
              <h2 className="text-headline-sm font-headline-sm text-xl font-bold text-[#00152f]">Branch Performance</h2>
              <button className="text-xs font-semibold text-[#735c00] hover:text-[#00152f] flex items-center gap-1">
                View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Colombo Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-2/5 h-48 md:h-auto relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9qJ5YtvCPuCjQT1WhBOodyUXgrdtDeP_yK7R_sVCjqB8lzhnEXcosfI1qLLr2xH1ppEPZral1_9BNpq-ZvlTOtZMfx7cRkDvd5XSmnAnh4CFbVkDJGkdSAP1ysi9Z5Tgg3lWpqwxnNqf8aHcsTjXfYmyh_g3UnpSQmVlUvmezo7zij7EjrhD0uN_2BRSi3numXS3dVo5_lABsuaEBRSw7jKDQAJCTkdDYUjNza37Wye-F7wc_OhiczuPqbVe-8aSk3sbHTHNb6Sgh"
                  alt="Colombo Property"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00152f]/70 to-transparent flex items-end p-6">
                  <h3 className="text-headline-sm font-bold text-white text-xl">Colombo Peak</h3>
                </div>
              </div>
              <div className="md:w-3/5 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-[#43474e] uppercase font-semibold">Occupancy</p>
                    <p className="text-headline-sm font-bold text-[#00152f] text-2xl">92%</p>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <p className="text-xs text-[#43474e] uppercase font-semibold">Arr</p>
                      <p className="text-lg font-bold text-[#00152f]">14</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#43474e] uppercase font-semibold">Dep</p>
                      <p className="text-lg font-bold text-[#00152f]">8</p>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-[#f0f3ff] h-1.5 rounded-full mb-4">
                  <div className="bg-[#735c00] h-full rounded-full w-[92%]"></div>
                </div>
                <div className="flex justify-end">
                  <button className="px-5 py-1.5 border border-[#735c00] text-[#735c00] rounded-full text-xs font-semibold hover:bg-[#735c00]/5 transition-colors">
                    Manage Branch
                  </button>
                </div>
              </div>
            </div>

            {/* Kandy Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-2/5 h-48 md:h-auto relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjo6mdaQQ66QRtFZ_DiaHQ4Vrx2n2yska7xCHUNhai3CSKSPM-XDwBZXMNcHG74hnVM6bapxeWMJwq-ZgBQM9114QSecmpJ_ll64lzB2GlLnEwu1Z2VS6aOREUx8zruOzgaL7vY2GUbwCom_UPNEO_tgK5aLHAGxl82p_K4WFN8j1HKANkszH3XNXKzTY9N_cOT2zkXAlveL1dJLhrucYG5pTHgirLaDS-2ePK8H7Z5qlkD6XzjqxDrxuVTJiRcbczRFIDrH8xWq5H"
                  alt="Kandy Property"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00152f]/70 to-transparent flex items-end p-6">
                  <h3 className="text-headline-sm font-bold text-white text-xl">Kandy Mist</h3>
                </div>
              </div>
              <div className="md:w-3/5 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-[#43474e] uppercase font-semibold">Occupancy</p>
                    <p className="text-headline-sm font-bold text-[#00152f] text-2xl">78%</p>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <p className="text-xs text-[#43474e] uppercase font-semibold">Arr</p>
                      <p className="text-lg font-bold text-[#00152f]">22</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#43474e] uppercase font-semibold">Dep</p>
                      <p className="text-lg font-bold text-[#00152f]">15</p>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-[#f0f3ff] h-1.5 rounded-full mb-4">
                  <div className="bg-[#00152f] h-full rounded-full w-[78%]"></div>
                </div>
                <div className="flex justify-end">
                  <button className="px-5 py-1.5 border border-[#735c00] text-[#735c00] rounded-full text-xs font-semibold hover:bg-[#735c00]/5 transition-colors">
                    Manage Branch
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed & Mini Sparkline */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#c4c6cf]/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[#00152f]">Recent Activity</h2>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#00152f]">how_to_reg</span>
                  <div>
                    <p className="font-medium text-[#00152f]">Guest Check-in</p>
                    <p className="text-xs text-[#43474e]">Mr. Silva arrived at Kandy Branch.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#735c00]">spa</span>
                  <div>
                    <p className="font-medium text-[#00152f]">Service Request</p>
                    <p className="text-xs text-[#43474e]">Room 302 requested Spa treatment.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#00152f]">bookmark_added</span>
                  <div>
                    <p className="font-medium text-[#00152f]">New Booking</p>
                    <p className="text-xs text-[#43474e]">Penthouse confirmed for Colombo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
