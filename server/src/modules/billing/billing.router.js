import { Router } from 'express';
import { getFolio, recordPayment, createPaymentIntent } from './billing.controller.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';
import { authorizeRoles } from '../../middleware/rbac.middleware.js';
import { logAudit } from '../../middleware/audit.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/folio/:bookingId', getFolio);
router.post('/payment-intent', createPaymentIntent);
router.post(
  '/payment',
  authorizeRoles('SYSTEM_ADMIN', 'BRANCH_MANAGER', 'FRONT_DESK', 'GUEST'),
  logAudit('PROCESS_PAYMENT'),
  recordPayment,
);

export default router;
