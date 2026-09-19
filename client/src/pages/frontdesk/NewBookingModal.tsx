import React, { useState } from 'react';
import apiClient from '../../api/apiClient';

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const NewBookingModal: React.FC<NewBookingModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loyaltyMemberId, setLoyaltyMemberId] = useState('');
  const [checkInDate, setCheckInDate] = useState('2023-10-14');
  const [checkOutDate, setCheckOutDate] = useState('2023-10-17');
  const [roomCategory, setRoomCategory] = useState('Executive Suite');
  const [guaranteeMethod, setGuaranteeMethod] = useState('CREDIT_CARD');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await apiClient.post('/reservations', {
        guestName,
        email,
        phone,
        loyaltyMemberId,
        checkInDate,
        checkOutDate,
        roomCategory,
        guaranteeMethod,
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error processing reservation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#00152f]/30 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-0 flex flex-col z-10">
        {/* Header */}
        <div className="p-6 border-b border-[#c4c6cf]/30 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur z-10">
          <div>
            <h3 className="text-headline-sm font-bold text-[#00152f] text-xl">Create Reservation</h3>
            <p className="text-xs text-[#43474e] uppercase font-semibold">Colombo Peak Branch</p>
          </div>
          <button onClick={onClose} className="text-[#43474e] hover:text-[#00152f]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-100 text-red-800 text-xs rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Guest Details */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-sm font-bold text-[#00152f] mb-4 flex items-center gap-2 border-b border-[#c4c6cf]/30 pb-2">
              <span className="material-symbols-outlined text-base">person</span> Guest Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#43474e] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="ghost-input w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#43474e] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eleanor@example.com"
                  className="ghost-input w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#43474e] mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+94 77 123 4567"
                  className="ghost-input w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#43474e] mb-1">Loyalty Member ID</label>
                <input
                  type="text"
                  value={loyaltyMemberId}
                  onChange={(e) => setLoyaltyMemberId(e.target.value)}
                  placeholder="SN-XXXXX"
                  className="ghost-input w-full text-sm"
                />
              </div>
            </div>
          </div>

          {/* Stay Details */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-[#00152f] mb-4 flex items-center gap-2 border-b border-[#c4c6cf]/30 pb-2">
              <span className="material-symbols-outlined text-base">calendar_month</span> Stay Information
            </h4>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#43474e] mb-1">Check-In</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="ghost-input w-full text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#43474e] mb-1">Check-Out</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="ghost-input w-full text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#43474e] mb-1">Room Category</label>
                <select
                  value={roomCategory}
                  onChange={(e) => setRoomCategory(e.target.value)}
                  className="ghost-input w-full text-sm bg-transparent"
                >
                  <option value="Executive Suite">Executive Suite</option>
                  <option value="Premium Double">Premium Double</option>
                </select>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-[#00152f] mb-4 flex items-center gap-2 border-b border-[#c4c6cf]/30 pb-2">
              <span className="material-symbols-outlined text-base">payments</span> Financial Calculation
            </h4>
            <div className="bg-[#f0f3ff] p-4 rounded-xl border border-[#c4c6cf]/30 mb-4 text-xs space-y-2">
              <div className="flex justify-between">
                <span>Nightly Rate</span>
                <span className="font-bold">$450.00</span>
              </div>
              <div className="flex justify-between">
                <span>Nights</span>
                <span className="font-bold">3</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#c4c6cf]/30">
                <span>Taxes & Fees (12%)</span>
                <span className="font-bold">$162.00</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#00152f]">
                <span>Total Amount</span>
                <span>$1,512.00</span>
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-[#43474e] mb-2">Guarantee Method</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="CREDIT_CARD"
                    checked={guaranteeMethod === 'CREDIT_CARD'}
                    onChange={() => setGuaranteeMethod('CREDIT_CARD')}
                  />
                  <span>Credit Card</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="CORPORATE_ACCOUNT"
                    checked={guaranteeMethod === 'CORPORATE_ACCOUNT'}
                    onChange={() => setGuaranteeMethod('CORPORATE_ACCOUNT')}
                  />
                  <span>Corporate Account</span>
                </label>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 pt-4 border-t border-[#c4c6cf]/30 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg text-xs font-semibold text-[#735c00] border border-[#735c00] hover:bg-[#735c00]/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#00152f] hover:bg-[#0f2a4a] shadow-md"
            >
              {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
