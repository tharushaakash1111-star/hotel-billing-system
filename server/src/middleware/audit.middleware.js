import prisma from '../config/db.js';

export const logAudit = (action) => {
  return async (req, res, next) => {
    const originalSend = res.send;

    res.send = function (body) {
      if (req.user && res.statusCode >= 200 && res.statusCode < 300) {
        prisma.auditLog.create({
          data: {
            userId: req.user.userId || req.user.id,
            action,
            details: JSON.stringify({
              path: req.originalUrl,
              method: req.method,
              query: req.query,
              body: req.body,
            }),
            ipAddress: req.ip || req.connection.remoteAddress || '127.0.0.1',
          },
        }).catch((err) => console.error('Audit Log Error:', err));
      }

      return originalSend.apply(res, arguments);
    };

    next();
  };
};
