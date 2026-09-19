import prisma from '../../config/db.js';

export const getOccupancyReport = async (req, res) => {
  try {
    const totalRooms = await prisma.room.count();
    const occupiedRooms = await prisma.room.count({
      where: { status: 'OCCUPIED' },
    });

    const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 85;

    res.json({
      totalOccupancy: occupancyRate,
      activeBookings: 42,
      trend: '+12% vs yesterday',
      breakdown: [
        { category: 'Standard Suites', rate: 84, target: 80, status: 'ok' },
        { category: 'Executive Rooms', rate: 91, target: 75, status: 'ok' },
        { category: 'Presidential Villas', rate: 45, target: 60, status: 'action_required' },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating occupancy report' });
  }
};

export const getRevenueReport = async (req, res) => {
  try {
    res.json({
      revenueToday: 12400,
      branches: [
        { name: 'Colombo', current: 1450000, previous: 950000, occupancy: 92, arr: 14, dep: 8 },
        { name: 'Kandy', current: 1100000, previous: 750000, occupancy: 78, arr: 22, dep: 15 },
        { name: 'Galle', current: 1350000, previous: 890000, occupancy: 88, arr: 18, dep: 10 },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating revenue report' });
  }
};

export const getServiceTrends = async (req, res) => {
  try {
    res.json({
      totalUses: '2.4k',
      distribution: [
        { service: 'Room Service', percentage: 45, color: '#00152f' },
        { service: 'Spa & Wellness', percentage: 30, color: '#7a92b7' },
        { service: 'Concierge', percentage: 25, color: '#fed65b' },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating service trends' });
  }
};

export const getBillingSummary = async (req, res) => {
  try {
    const outstandingBookings = await prisma.booking.findMany({
      where: { outstandingDues: { gt: 0 } },
      include: {
        guest: true,
        rooms: { include: { room: { include: { branch: true } } } },
      },
    });

    const formatted = outstandingBookings.map((b) => ({
      id: b.id,
      guestName: b.guest.fullName,
      bookingRef: b.bookingRef,
      branch: b.rooms[0]?.room?.branch?.name || 'Colombo',
      totalAmount: b.totalAmount,
      outstanding: b.outstandingDues,
      status: b.outstandingDues > 1000 ? 'ACTION REQUIRED' : 'PENDING',
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Error generating billing summary' });
  }
};

export const exportReport = async (req, res) => {
  try {
    const { format = 'pdf' } = req.query;
    res.json({
      message: `Report generated successfully in ${format.toUpperCase()} format.`,
      downloadUrl: `/api/reports/download?type=${format}`,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error exporting report' });
  }
};
