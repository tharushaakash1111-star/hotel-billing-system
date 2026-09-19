import React, { useState, useEffect } from 'react';
import { SideNavBar } from '../../components/layout/SideNavBar';
import { TopNavBar } from '../../components/layout/TopNavBar';
import apiClient from '../../api/apiClient';
import { ServiceQueueItem, ServiceItem } from '../../types';

interface GuestServicesProps {
  onOpenBookingModal: () => void;
}

export const GuestServicesPage: React.FC<GuestServicesProps> = ({ onOpenBookingModal }) => {
  const [queue, setQueue] = useState<ServiceQueueItem[]>([]);
  const [catalogue, setCatalogue] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([apiClient.get('/services/queue'), apiClient.get('/services/catalogue')])
      .then(([queueRes, catRes]) => {
        setQueue(queueRes.data || []);
        setCatalogue(catRes.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await apiClient.patch(`/services/${id}/status`, { status: newStatus });
      fetchData();
    } catch (err) {
      alert('Error updating status');
    }
  };

  return (
    <div className="bg-[#f9f9ff] min-h-screen font-body-md text-[#111c2c]">
      <TopNavBar />
      <SideNavBar onOpenBookingModal={onOpenBookingModal} />

      <main className="md:ml-64 pt-24 px-6 md:px-margin-desktop pb-24 min-h-screen">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-xs font-semibold text-[#00152f] mb-1 uppercase tracking-widest">
              Real-time Operations
            </p>
            <h2 className="text-display-lg font-headline-md text-3xl font-bold text-[#111c2c]">
              Service Tracking
            </h2>
          </div>
          <button className="bg-[#f0f3ff] text-[#735c00] border border-[#735c00]/30 hover:bg-[#735c00] hover:text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export Report
          </button>
        </div>

        {/* Live Service Queue Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#111c2c] flex items-center gap-2 font-headline-sm">
              <span className="material-symbols-outlined text-[#00152f]">schedule</span>
              Live Service Queue
            </h3>
            <span className="text-xs font-semibold text-[#00152f]">Real-time Sync Active</span>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
            {queue.map((item) => (
              <div
                key={item.id}
                className="glass-panel min-w-[300px] rounded-xl p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform bg-white/80 border border-[#c4c6cf]/30 shadow-md"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-2xl font-bold text-[#00152f] font-headline-sm block">
                      {item.booking?.rooms[0]?.room?.roomNumber || 'Room'}
                    </span>
                    <span className="text-xs text-[#43474e]">{item.booking?.guest?.fullName}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'PENDING'
                        ? 'bg-red-100 text-red-800'
                        : item.status === 'IN_PROGRESS'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#111c2c] mb-2">{item.service?.name}</p>
                  <div className="flex justify-between items-center text-xs text-[#43474e]">
                    <span>${item.totalPrice.toFixed(2)}</span>
                    {item.status === 'PENDING' && (
                      <button
                        onClick={() => handleStatusUpdate(item.id, 'IN_PROGRESS')}
                        className="px-3 py-1 bg-[#00152f] text-white rounded text-xs hover:bg-[#0f2a4a]"
                      >
                        Start
                      </button>
                    )}
                    {item.status === 'IN_PROGRESS' && (
                      <button
                        onClick={() => handleStatusUpdate(item.id, 'COMPLETED')}
                        className="px-3 py-1 bg-green-700 text-white rounded text-xs hover:bg-green-800"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Grid: Active Guests & Catalogue */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-[#00152f] mb-4 font-headline-sm">Active In-House Guests</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#c4c6cf]/30 text-xs text-[#43474e] uppercase font-semibold">
                  <th className="pb-3">Room</th>
                  <th className="pb-3">Guest Name</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c4c6cf]/20">
                <tr>
                  <td className="py-3 font-bold text-lg text-[#00152f]">S-401</td>
                  <td className="py-3 font-medium">Eleanor Vance</td>
                  <td className="py-3 text-right">
                    <button className="text-[#00152f] font-semibold text-xs border border-[#00152f] px-3 py-1 rounded hover:bg-[#00152f] hover:text-white">
                      + Add Charge
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-lg text-[#00152f]">D-301</td>
                  <td className="py-3 font-medium">Arthur Pendelton</td>
                  <td className="py-3 text-right">
                    <button className="text-[#00152f] font-semibold text-xs border border-[#00152f] px-3 py-1 rounded hover:bg-[#00152f] hover:text-white">
                      + Add Charge
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-span-12 lg:col-span-4 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-[#00152f] mb-4 font-headline-sm">Service Catalogue</h3>
            <div className="space-y-3">
              {catalogue.map((cat) => (
                <div key={cat.id} className="flex justify-between items-center p-3 rounded-lg border border-[#c4c6cf]/30 bg-[#f9f9ff]">
                  <span className="text-xs font-semibold text-[#111c2c]">{cat.name}</span>
                  <span className="text-xs font-bold text-[#00152f]">${cat.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
