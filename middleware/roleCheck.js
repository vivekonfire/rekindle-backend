exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User with role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};
