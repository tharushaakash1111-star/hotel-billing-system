import { Router } from 'express';
import {
  getAvailability,
  createBooking,
  checkout,
  listBookings,
} from './reservation.controller.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';
import { authorizeRoles, enforceBranchScope } from '../../middleware/rbac.middleware.js';
import { logAudit } from '../../middleware/audit.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/availability', enforceBranchScope, getAvailability);
router.get('/', listBookings);
router.post(
  '/',
  authorizeRoles('SYSTEM_ADMIN', 'BRANCH_MANAGER', 'FRONT_DESK', 'GUEST'),
  logAudit('CREATE_RESERVATION'),
  createBooking,
);
router.post(
  '/:id/checkout',
  authorizeRoles('SYSTEM_ADMIN', 'BRANCH_MANAGER', 'FRONT_DESK'),
  logAudit('CHECKOUT_GUEST'),
  checkout,
);

export default router;
