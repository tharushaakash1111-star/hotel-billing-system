import prisma from '../../config/db.js';

export const getFolio = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        guest: true,
        rooms: { include: { room: { include: { roomType: true, branch: true } } } },
        serviceUsages: { include: { service: true } },
        payments: true,
      },
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking folio not found' });
    }

    const totalPaid = booking.payments.reduce((acc, p) => acc + p.amount, 0);
    const calculatedOutstanding = Math.max(0, booking.totalAmount - totalPaid);

    res.json({
      bookingRef: booking.bookingRef,
      guest: booking.guest,
      rooms: booking.rooms.map((r) => ({
        roomNumber: r.room.roomNumber,
        roomType: r.room.roomType.title,
        branch: r.room.branch.name,
      })),
      itemizedServices: booking.serviceUsages.map((s) => ({
        serviceName: s.service.name,
        quantity: s.quantity,
        unitPrice: s.service.price,
        totalPrice: s.totalPrice,
        requestedAt: s.requestedAt,
      })),
      totalAmount: booking.totalAmount,
      totalPaid,
      outstandingDues: calculatedOutstanding,
      payments: booking.payments,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error loading folio' });
  }
};

export const recordPayment = async (req, res) => {
  try {
    const { bookingId, amount, method, stripeId } = req.body;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const payment = await prisma.payment.create({
      data: {
        bookingId,
        amount: parseFloat(amount),
        method,
        stripeId,
      },
    });

    const newOutstanding = Math.max(0, booking.outstandingDues - parseFloat(amount));

    await prisma.booking.update({
      where: { id: bookingId },
      data: { outstandingDues: newOutstanding },
    });

    res.status(201).json({
      message: 'Payment recorded successfully',
      payment,
      remainingOutstanding: newOutstanding,
    });
  } catch (error) {
    console.error('Payment Error:', error);
    res.status(500).json({ message: 'Error processing payment' });
  }
};

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;
    res.json({
      clientSecret: `mock_stripe_secret_${Math.random().toString(36).substring(7)}`,
      amount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error initializing payment gateway' });
  }
};
