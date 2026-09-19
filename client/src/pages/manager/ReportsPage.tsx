import React, { useState, useEffect } from 'react';
import { SideNavBar } from '../../components/layout/SideNavBar';
import { TopNavBar } from '../../components/layout/TopNavBar';
import apiClient from '../../api/apiClient';

interface ReportsPageProps {
  onOpenBookingModal: () => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ onOpenBookingModal }) => {
  const [revenueData, setRevenueData] = useState<any>(null);
  const [billingRows, setBillingRows] = useState<any[]>([]);

  useEffect(() => {
    apiClient.get('/reports/revenue').then((res) => setRevenueData(res.data));
    apiClient.get('/reports/billing-summary').then((res) => setBillingRows(res.data));
  }, []);

  const handleExport = (format: string) => {
    apiClient.get(`/reports/export?format=${format}`).then((res) => {
      alert(res.data.message);
    });
  };

  return (
    <div className="bg-[#f9f9ff] min-h-screen font-body-md text-[#111c2c]">
      <TopNavBar />
      <SideNavBar onOpenBookingModal={onOpenBookingModal} />

      <main className="md:ml-64 pt-24 md:pt-32 px-6 md:px-margin-desktop pb-24 max-w-container-max mx-auto">
        <div className="mb-8">
          <h2 className="text-display-lg font-headline-md font-bold text-[#00152f] text-3xl mb-1">
            Management Reporting
          </h2>
          <p className="text-body-md text-[#43474e]">
            Financial and operational insights for SkyNest Properties.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Monthly Revenue Chart */}
          <div className="md:col-span-8 bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#00152f] font-headline-sm">Monthly Revenue per Branch</h3>
                <p className="text-xs text-[#43474e]">Comparing top performing properties (YTD)</p>
              </div>
              <button
                onClick={() => handleExport('pdf')}
                className="flex items-center gap-2 border border-[#c4c6cf] text-[#00152f] px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#dee8ff]"
              >
                <span className="material-symbols-outlined text-sm">download</span> Export PDF
              </button>
            </div>

            <div className="h-64 flex items-end justify-around border-b border-[#c4c6cf]/30 pb-4 pt-8">
              {revenueData?.branches.map((b: any) => (
                <div key={b.name} className="flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1">
                    <div className="w-8 bg-[#485f82] rounded-t" style={{ height: `${(b.previous / 2000000) * 180}px` }}></div>
                    <div className="w-8 bg-[#00152f] rounded-t" style={{ height: `${(b.current / 2000000) * 180}px` }}></div>
                  </div>
                  <span className="text-xs font-semibold text-[#111c2c]">{b.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Service Trends Donut */}
          <div className="md:col-span-4 bg-white rounded-xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#00152f] font-headline-sm mb-1">Service Trends</h3>
              <p className="text-xs text-[#43474e] mb-6">Top-Used Services Distribution</p>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-36 h-36 rounded-full border-8 border-[#00152f] border-t-[#fed65b] border-r-[#7a92b7] flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#00152f]">2.4k</span>
                <span className="text-[10px] text-[#43474e]">Total Uses</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-semibold">
              <div className="flex justify-between">
                <span>Room Service</span>
                <span className="text-[#00152f]">45%</span>
              </div>
              <div className="flex justify-between">
                <span>Spa & Wellness</span>
                <span className="text-[#00152f]">30%</span>
              </div>
              <div className="flex justify-between">
                <span>Concierge</span>
                <span className="text-[#00152f]">25%</span>
              </div>
            </div>
          </div>

          {/* Guest Billing Summary Table */}
          <div className="md:col-span-12 bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#00152f] font-headline-sm">Guest Billing Summary</h3>
                <p className="text-xs text-[#43474e]">Outstanding balances requiring attention.</p>
              </div>
              <button
                onClick={() => handleExport('excel')}
                className="flex items-center gap-2 border border-[#c4c6cf] text-[#00152f] px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#dee8ff]"
              >
                <span className="material-symbols-outlined text-sm">table</span> Export Excel
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#c4c6cf]/30 text-xs text-[#43474e] uppercase font-semibold">
                    <th className="py-3 px-3">Guest Name</th>
                    <th className="py-3 px-3">Booking Ref</th>
                    <th className="py-3 px-3">Branch</th>
                    <th className="py-3 px-3">Total Amount</th>
                    <th className="py-3 px-3">Outstanding</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c4c6cf]/20">
                  {billingRows.map((row) => (
                    <tr key={row.id} className="hover:bg-[#f9f9ff]">
                      <td className="py-3 px-3 font-bold text-[#00152f]">{row.guestName}</td>
                      <td className="py-3 px-3 text-xs text-[#43474e]">{row.bookingRef}</td>
                      <td className="py-3 px-3">{row.branch}</td>
                      <td className="py-3 px-3">${row.totalAmount.toFixed(2)}</td>
                      <td className="py-3 px-3 font-bold text-[#00152f]">${row.outstanding.toFixed(2)}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            row.status === 'ACTION REQUIRED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
