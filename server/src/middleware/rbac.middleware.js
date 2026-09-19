export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. Role ${req.user.role} is not authorized for this resource.` 
      });
    }

    next();
  };
};

export const enforceBranchScope = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'User not authenticated' });

  // System admins have access to all branches
  if (req.user.role === 'SYSTEM_ADMIN') {
    return next();
  }

  // Branch Managers, Front Desk, Service Staff are restricted to their assigned branch
  const requestedBranchId = req.query.branchId || req.body.branchId;

  if (requestedBranchId && req.user.branchId && requestedBranchId !== req.user.branchId) {
    return res.status(403).json({ message: 'Access denied. You cannot access data for another hotel branch.' });
  }

  next();
};
