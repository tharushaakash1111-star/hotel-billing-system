import { Router } from 'express';
import {
  getCatalogue,
  getQueue,
  createServiceRequest,
  updateServiceStatus,
} from './service.controller.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';
import { authorizeRoles } from '../../middleware/rbac.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/catalogue', getCatalogue);
router.get('/queue', getQueue);
router.post(
  '/',
  authorizeRoles('SYSTEM_ADMIN', 'BRANCH_MANAGER', 'FRONT_DESK', 'SERVICE_STAFF', 'GUEST'),
  createServiceRequest,
);
router.patch(
  '/:id/status',
  authorizeRoles('SYSTEM_ADMIN', 'BRANCH_MANAGER', 'FRONT_DESK', 'SERVICE_STAFF'),
  updateServiceStatus,
);

export default router;
