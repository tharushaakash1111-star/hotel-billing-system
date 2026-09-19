import { Router } from 'express';
import {
  getOccupancyReport,
  getRevenueReport,
  getServiceTrends,
  getBillingSummary,
  exportReport,
} from './reporting.controller.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';
import { authorizeRoles, enforceBranchScope } from '../../middleware/rbac.middleware.js';

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles('SYSTEM_ADMIN', 'BRANCH_MANAGER'));

router.get('/occupancy', getOccupancyReport);
router.get('/revenue', enforceBranchScope, getRevenueReport);
router.get('/service-trends', getServiceTrends);
router.get('/billing-summary', getBillingSummary);
router.get('/export', exportReport);

export default router;
