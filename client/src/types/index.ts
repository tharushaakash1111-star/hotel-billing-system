export type Role = 'SYSTEM_ADMIN' | 'BRANCH_MANAGER' | 'FRONT_DESK' | 'SERVICE_STAFF' | 'GUEST';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  branchId?: string | null;
  branchName?: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface RoomBookingSpan {
  bookingId: string;
  bookingRef: string;
  guestName: string;
  status: 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  outstandingDues: number;
  vipTag?: string | null;
}

export interface AvailabilityRoom {
  id: string;
  roomNumber: string;
  roomType: string;
  branchName: string;
  currentStatus: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'OUT_OF_ORDER';
  bookings: RoomBookingSpan[];
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

export interface ServiceQueueItem {
  id: string;
  quantity: number;
  totalPrice: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  requestedAt: string;
  service: ServiceItem;
  booking: {
    id: string;
    bookingRef: string;
    guest: {
      fullName: string;
      email: string;
    };
    rooms: Array<{
      room: {
        roomNumber: string;
      };
    }>;
  };
}

export interface BillingSummaryRow {
  id: string;
  guestName: string;
  bookingRef: string;
  branch: string;
  totalAmount: number;
  outstanding: number;
  status: 'ACTION REQUIRED' | 'PENDING';
}
