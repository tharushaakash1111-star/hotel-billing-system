import prisma from '../../config/db.js';

export const getAvailability = async (req, res) => {
  try {
    const { startDate, endDate, branchId, roomTypeId } = req.query;

    const start = startDate ? new Date(startDate) : new Date('2023-10-12');
    const end = endDate ? new Date(endDate) : new Date('2023-10-18');

    // Find rooms matching branch filter
    const whereRoom = {};
    if (branchId) {
      const branch = await prisma.branch.findFirst({
        where: { OR: [{ id: branchId }, { name: { contains: branchId } }] },
      });
      if (branch) whereRoom.branchId = branch.id;
    }
    if (roomTypeId) whereRoom.typeId = roomTypeId;

    const rooms = await prisma.room.findMany({
      where: whereRoom,
      include: {
        roomType: true,
        branch: true,
        bookings: {
          include: {
            booking: {
              include: { guest: true },
            },
          },
        },
      },
    });

    // Format grid response
    const formattedRooms = rooms.map((room) => {
      const activeBookings = room.bookings
        .map((b) => b.booking)
        .filter(
          (b) =>
            b.status !== 'CANCELLED' &&
            new Date(b.checkInDate) <= end &&
            new Date(b.checkOutDate) >= start,
        )
        .map((b) => ({
          bookingId: b.id,
          bookingRef: b.bookingRef,
          guestName: b.guest.fullName,
          status: b.status, // CONFIRMED, CHECKED_IN, MAINTENANCE
          checkIn: b.checkInDate,
          checkOut: b.checkOutDate,
          totalAmount: b.totalAmount,
          outstandingDues: b.outstandingDues,
          vipTag: b.guest.loyaltyMemberId ? 'VIP Guest' : null,
        }));

      return {
        id: room.id,
        roomNumber: room.roomNumber,
        roomType: room.roomType.title,
        branchName: room.branch.name,
        currentStatus: room.status,
        bookings: activeBookings,
      };
    });

    res.json({
      startDate: start,
      endDate: end,
      rooms: formattedRooms,
    });
  } catch (error) {
    console.error('Availability Fetch Error:', error);
    res.status(500).json({ message: 'Error retrieving availability data' });
  }
};

export const createBooking = async (req, res) => {
  try {
    const {
      guestName,
      email,
      phone,
      loyaltyMemberId,
      checkInDate,
      checkOutDate,
      roomCategory,
      roomId,
      branchId,
      guaranteeMethod,
    } = req.body;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Calculate nights
    const nights = Math.max(1, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)));

    // 1. Find or create guest
    let guest = await prisma.guest.findUnique({ where: { email } });
    if (!guest) {
      guest = await prisma.guest.create({
        data: {
          fullName: guestName,
          email,
          phone: phone || '+94770000000',
          loyaltyMemberId,
        },
      });
    }

    // 2. Resolve room category / specific room
    let targetRoom;
    if (roomId) {
      targetRoom = await prisma.room.findUnique({
        where: { id: roomId },
        include: { roomType: true },
      });
    } else {
      // Pick first available room matching category
      targetRoom = await prisma.room.findFirst({
        where: {
          roomType: { title: { contains: roomCategory || 'Suite' } },
        },
        include: { roomType: true },
      });
    }

    if (!targetRoom) {
      return res.status(404).json({ message: 'No available room found for specified category' });
    }

    // 3. Double Booking Concurrency Protection Check
    const overlappingBookings = await prisma.bookingRoom.findMany({
      where: {
        roomId: targetRoom.id,
        booking: {
          status: { in: ['CONFIRMED', 'CHECKED_IN'] },
          checkInDate: { lte: checkOut },
          checkOutDate: { gte: checkIn },
        },
      },
    });

    if (overlappingBookings.length > 0) {
      return res.status(409).json({
        message: 'Conflict Error: The requested room is already booked for these dates.',
      });
    }

    // 4. Calculate Financials
    const nightlyRate = targetRoom.roomType.baseRate;
    const roomCharges = nightlyRate * nights;
    const taxesAndFees = Math.round(roomCharges * 0.12 * 100) / 100; // 12% tax
    const totalAmount = roomCharges + taxesAndFees;

    const bookingRef = `BKG-${Math.floor(1000 + Math.random() * 9000)}`;

    // 5. Create Booking Transaction
    const newBooking = await prisma.booking.create({
      data: {
        bookingRef,
        guestId: guest.id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        status: 'CONFIRMED',
        totalAmount,
        outstandingDues: totalAmount,
        rooms: {
          create: {
            roomId: targetRoom.id,
          },
        },
      },
      include: {
        guest: true,
        rooms: { include: { room: true } },
      },
    });

    res.status(201).json({
      message: 'Reservation confirmed successfully',
      booking: newBooking,
    });
  } catch (error) {
    console.error('Booking Creation Error:', error);
    res.status(500).json({ message: 'Error processing reservation' });
  }
};

export const checkout = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // ZERO-BALANCE GATEKEEPER RULE: Reject if outstanding dues > 0
    if (booking.outstandingDues > 0) {
      return res.status(400).json({
        message: `Checkout Gatekeeper Blocked: Outstanding balance of $${booking.outstandingDues.toFixed(
          2,
        )} must be settled before checkout.`,
        outstandingDues: booking.outstandingDues,
      });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status: 'CHECKED_OUT' },
    });

    res.json({
      message: 'Guest checked out successfully. Room released for cleaning.',
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing checkout' });
  }
};

export const listBookings = async (req, res) => {
  try {
    const { status, branchId } = req.query;

    const where = {};
    if (status) where.status = status;

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        guest: true,
        rooms: { include: { room: { include: { branch: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bookings' });
  }
};
