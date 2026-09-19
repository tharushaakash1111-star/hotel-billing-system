import prisma from '../config/db.js';
import { hashPassword } from './password.js';

async function main() {
  console.log('Seeding SkyNest Hotels database...');

  // 1. Create Branches
  const colombo = await prisma.branch.upsert({
    where: { id: 'colombo-branch' },
    update: {},
    create: {
      id: 'colombo-branch',
      name: 'Colombo Peak',
      address: '77 Galle Road, Colombo 03',
      phone: '+94 11 234 5678',
    },
  });

  const kandy = await prisma.branch.upsert({
    where: { id: 'kandy-branch' },
    update: {},
    create: {
      id: 'kandy-branch',
      name: 'Kandy Mist',
      address: '12 Lake Round Road, Kandy',
      phone: '+94 81 222 3344',
    },
  });

  const galle = await prisma.branch.upsert({
    where: { id: 'galle-branch' },
    update: {},
    create: {
      id: 'galle-branch',
      name: 'Galle Horizon',
      address: '45 Fort Rampart Street, Galle',
      phone: '+94 91 223 4455',
    },
  });

  // 2. Create Users
  const defaultPassword = await hashPassword('Admin1234!');

  await prisma.user.upsert({
    where: { email: 'admin@skynest.lk' },
    update: {},
    create: {
      email: 'admin@skynest.lk',
      name: 'Executive Admin',
      passwordHash: defaultPassword,
      role: 'SYSTEM_ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'manager.colombo@skynest.lk' },
    update: {},
    create: {
      email: 'manager.colombo@skynest.lk',
      name: 'Colombo Manager',
      passwordHash: defaultPassword,
      role: 'BRANCH_MANAGER',
      branchId: colombo.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'frontdesk.colombo@skynest.lk' },
    update: {},
    create: {
      email: 'frontdesk.colombo@skynest.lk',
      name: 'Colombo Front Desk',
      passwordHash: defaultPassword,
      role: 'FRONT_DESK',
      branchId: colombo.id,
    },
  });

  // 3. Create Room Types
  const execSuite = await prisma.roomType.upsert({
    where: { id: 'exec-suite-type' },
    update: {},
    create: {
      id: 'exec-suite-type',
      title: 'Executive Suite',
      description: 'Luxury ocean view suite with private balcony',
      baseRate: 450.0,
    },
  });

  const premDouble = await prisma.roomType.upsert({
    where: { id: 'prem-double-type' },
    update: {},
    create: {
      id: 'prem-double-type',
      title: 'Premium Double',
      description: 'Spacious double room with city view',
      baseRate: 250.0,
    },
  });

  // 4. Create Rooms
  const r401 = await prisma.room.upsert({
    where: { id: 'room-401' },
    update: {},
    create: {
      id: 'room-401',
      roomNumber: 'S-401',
      branchId: colombo.id,
      typeId: execSuite.id,
      status: 'OCCUPIED',
    },
  });

  const r402 = await prisma.room.upsert({
    where: { id: 'room-402' },
    update: {},
    create: {
      id: 'room-402',
      roomNumber: 'S-402',
      branchId: colombo.id,
      typeId: execSuite.id,
      status: 'MAINTENANCE',
    },
  });

  const r301 = await prisma.room.upsert({
    where: { id: 'room-301' },
    update: {},
    create: {
      id: 'room-301',
      roomNumber: 'D-301',
      branchId: colombo.id,
      typeId: premDouble.id,
      status: 'OCCUPIED',
    },
  });

  const r302 = await prisma.room.upsert({
    where: { id: 'room-302' },
    update: {},
    create: {
      id: 'room-302',
      roomNumber: 'D-302',
      branchId: colombo.id,
      typeId: premDouble.id,
      status: 'AVAILABLE',
    },
  });

  // 5. Create Service Catalog
  const roomService = await prisma.serviceCatalogue.upsert({
    where: { id: 'srv-room-service' },
    update: {},
    create: {
      id: 'srv-room-service',
      name: 'Room Service - Breakfast',
      category: 'Dining',
      price: 45.0,
    },
  });

  const spaService = await prisma.serviceCatalogue.upsert({
    where: { id: 'srv-spa' },
    update: {},
    create: {
      id: 'srv-spa',
      name: 'Spa - Deep Tissue Massage',
      category: 'Wellness',
      price: 120.0,
    },
  });

  const transportService = await prisma.serviceCatalogue.upsert({
    where: { id: 'srv-transport' },
    update: {},
    create: {
      id: 'srv-transport',
      name: 'Airport Transfer - SUV',
      category: 'Transport',
      price: 85.0,
    },
  });

  // 6. Create Guests & Bookings
  const guest1 = await prisma.guest.upsert({
    where: { email: 'eleanor.vance@example.com' },
    update: {},
    create: {
      fullName: 'Eleanor Vance',
      email: 'eleanor.vance@example.com',
      phone: '+94 77 123 4567',
      loyaltyMemberId: 'SN-8842',
    },
  });

  const guest2 = await prisma.guest.upsert({
    where: { email: 'arthur.pendelton@example.com' },
    update: {},
    create: {
      fullName: 'Arthur Pendelton',
      email: 'arthur.pendelton@example.com',
      phone: '+94 77 987 6543',
    },
  });

  const booking1 = await prisma.booking.upsert({
    where: { bookingRef: 'BKG-8892' },
    update: {},
    create: {
      bookingRef: 'BKG-8892',
      guestId: guest1.id,
      checkInDate: new Date('2023-10-13T14:00:00Z'),
      checkOutDate: new Date('2023-10-16T11:00:00Z'),
      status: 'CHECKED_IN',
      totalAmount: 1512.0,
      outstandingDues: 1200.0,
      rooms: {
        create: { roomId: r401.id },
      },
    },
  });

  const booking2 = await prisma.booking.upsert({
    where: { bookingRef: 'BKG-8893' },
    update: {},
    create: {
      bookingRef: 'BKG-8893',
      guestId: guest2.id,
      checkInDate: new Date('2023-10-14T14:00:00Z'),
      checkOutDate: new Date('2023-10-17T11:00:00Z'),
      status: 'CHECKED_IN',
      totalAmount: 850.0,
      outstandingDues: 450.0,
      rooms: {
        create: { roomId: r301.id },
      },
    },
  });

  // 7. Add Service Requests
  await prisma.serviceUsage.create({
    data: {
      bookingId: booking1.id,
      serviceId: roomService.id,
      quantity: 1,
      totalPrice: 45.0,
      status: 'PENDING',
    },
  });

  await prisma.serviceUsage.create({
    data: {
      bookingId: booking2.id,
      serviceId: spaService.id,
      quantity: 1,
      totalPrice: 120.0,
      status: 'IN_PROGRESS',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
