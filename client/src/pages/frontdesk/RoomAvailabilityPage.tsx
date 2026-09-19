import React, { useState, useEffect } from 'react';
import { SideNavBar } from '../../components/layout/SideNavBar';
import { TopNavBar } from '../../components/layout/TopNavBar';
import apiClient from '../../api/apiClient';
import { AvailabilityRoom } from '../../types';

interface RoomAvailabilityProps {
  onOpenBookingModal: () => void;
}

export const RoomAvailabilityPage: React.FC<RoomAvailabilityProps> = ({ onOpenBookingModal }) => {
  const [rooms, setRooms] = useState<AvailabilityRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAvailability = () => {
    setIsLoading(true);
    apiClient
      .get('/reservations/availability?startDate=2023-10-12&endDate=2023-10-18')
      .then((res) => {
        setRooms(res.data.rooms || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  return (
    <div className="bg-[#f9f9ff] min-h-screen font-body-md text-[#111c2c]">
      <TopNavBar />
      <SideNavBar onOpenBookingModal={onOpenBookingModal} />

      <main className="md:ml-64 pt-24 px-6 md:px-margin-desktop pb-24 min-h-screen">
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="text-display-lg font-headline-md font-bold text-[#00152f] text-3xl mb-1">
              Room Availability
            </h2>
            <p className="text-body-md text-[#43474e]">
              Manage allocations, visualize capacity, and process new reservations across the property.
            </p>
          </div>
          <button
            onClick={onOpenBookingModal}
            className="bg-[#00152f] hover:bg-[#0f2a4a] text-white px-6 py-3 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Booking
          </button>
        </div>

        {/* Filter Bento */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="col-span-1 md:col-span-5 bg-white rounded-xl shadow-sm p-4 flex flex-col justify-center">
            <label className="text-xs uppercase font-semibold text-[#43474e] mb-1">Date Range</label>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00152f]">calendar_today</span>
              <input
                type="text"
                readOnly
                value="Oct 12 - Oct 18, 2023"
                className="ghost-input w-full text-sm font-semibold cursor-pointer"
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 bg-white rounded-xl shadow-sm p-4 flex flex-col justify-center">
            <label className="text-xs uppercase font-semibold text-[#43474e] mb-1">Room Type</label>
            <select className="ghost-input w-full text-sm font-semibold cursor-pointer bg-transparent">
              <option>All Room Types</option>
              <option>Executive Suite</option>
              <option>Premium Double</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-3 bg-white rounded-xl shadow-sm p-4 flex flex-col justify-center">
            <label className="text-xs uppercase font-semibold text-[#43474e] mb-1">Branch</label>
            <select className="ghost-input w-full text-sm font-semibold cursor-pointer bg-transparent">
              <option>Colombo Peak</option>
              <option>Kandy Mist</option>
              <option>Galle Horizon</option>
            </select>
          </div>
        </div>

        {/* Status Legend */}
        <div className="flex flex-wrap items-center gap-6 mb-4 px-2 text-xs uppercase font-semibold">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00152f]"></div>
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#485f82]"></div>
            <span>Checked-In</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#e7eeff] border border-[#d8e3fa]"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#fed65b]"></div>
            <span>Maintenance</span>
          </div>
        </div>

        {/* The Availability Grid */}
        <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
          <div className="min-w-[750px]">
            {/* Grid Header Dates */}
            <div className="grid grid-cols-8 gap-2 border-b border-[#c4c6cf]/30 pb-3 mb-4 text-center text-xs font-semibold text-[#43474e]">
              <div className="text-left pl-2 font-bold text-[#00152f]">Room</div>
              <div>Mon 12</div>
              <div>Tue 13</div>
              <div className="bg-[#f0f3ff] rounded p-1 font-bold text-[#00152f]">Wed 14 (Today)</div>
              <div>Thu 15</div>
              <div>Fri 16</div>
              <div>Sat 17</div>
              <div>Sun 18</div>
            </div>

            {/* Room Rows */}
            {isLoading ? (
              <div className="text-center py-12 text-sm text-[#43474e]">Loading room matrix...</div>
            ) : (
              <div className="space-y-3">
                {rooms.map((room) => (
                  <div key={room.id} className="grid grid-cols-8 gap-2 items-center bg-[#f9f9ff] p-2 rounded-lg border border-[#c4c6cf]/20">
                    <div className="pl-2">
                      <p className="font-bold text-sm text-[#00152f]">{room.roomNumber}</p>
                      <p className="text-[10px] text-[#43474e]">{room.roomType}</p>
                    </div>

                    {/* 7 Calendar Cells */}
                    {[12, 13, 14, 15, 16, 17, 18].map((day) => {
                      const booking = room.bookings.find((b) => {
                        const inDay = new Date(b.checkIn).getDate();
                        const outDay = new Date(b.checkOut).getDate();
                        return day >= inDay && day <= outDay;
                      });

                      if (room.currentStatus === 'MAINTENANCE' && day === 15) {
                        return (
                          <div key={day} className="bg-[#fed65b] text-[#745c00] rounded p-1.5 text-[10px] font-bold text-center truncate">
                            Deep Clean
                          </div>
                        );
                      }

                      if (booking) {
                        const isCheckedIn = booking.status === 'CHECKED_IN';
                        return (
                          <div
                            key={day}
                            title={`${booking.guestName} (${booking.status})`}
                            className={`rounded p-1.5 text-[10px] font-bold text-white text-center truncate cursor-pointer shadow-sm ${
                              isCheckedIn ? 'bg-[#485f82]' : 'bg-[#00152f]'
                            }`}
                          >
                            {booking.guestName}
                          </div>
                        );
                      }

                      return (
                        <div key={day} className="h-8 bg-[#e7eeff] rounded hover:bg-[#dee8ff] transition-colors cursor-pointer"></div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
