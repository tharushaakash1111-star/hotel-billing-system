import prisma from '../../config/db.js';

export const getCatalogue = async (req, res) => {
  try {
    const services = await prisma.serviceCatalogue.findMany();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error loading service catalogue' });
  }
};

export const getQueue = async (req, res) => {
  try {
    const queue = await prisma.serviceUsage.findMany({
      include: {
        service: true,
        booking: {
          include: {
            guest: true,
            rooms: { include: { room: true } },
          },
        },
      },
      orderBy: { requestedAt: 'desc' },
    });

    res.json(queue);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving service queue' });
  }
};

export const createServiceRequest = async (req, res) => {
  try {
    const { bookingId, serviceId, quantity = 1 } = req.body;

    const service = await prisma.serviceCatalogue.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found in catalogue' });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const totalPrice = service.price * quantity;

    // Create service usage record
    const usage = await prisma.serviceUsage.create({
      data: {
        bookingId,
        serviceId,
        quantity,
        totalPrice,
        status: 'PENDING',
      },
      include: {
        service: true,
        booking: { include: { guest: true } },
      },
    });

    // Auto-charge guest folio: Increment booking totalAmount and outstandingDues
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        totalAmount: { increment: totalPrice },
        outstandingDues: { increment: totalPrice },
      },
    });

    // Notify via Sockets if IO instance is attached
    if (req.app.get('io')) {
      req.app.get('io').emit('service:created', usage);
    }

    res.status(201).json({
      message: 'Service request created and added to room bill',
      usage,
    });
  } catch (error) {
    console.error('Service Request Error:', error);
    res.status(500).json({ message: 'Error creating service request' });
  }
};

export const updateServiceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const usage = await prisma.serviceUsage.update({
      where: { id },
      data: { status },
      include: {
        service: true,
        booking: { include: { guest: true } },
      },
    });

    if (req.app.get('io')) {
      req.app.get('io').emit('service:updated', usage);
    }

    res.json({
      message: 'Service status updated',
      usage,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service status' });
  }
};
