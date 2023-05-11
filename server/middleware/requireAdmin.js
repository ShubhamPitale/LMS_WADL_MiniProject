const requireAdmin = async (req, res, next) => {
  if (req.isAdmin) {
    next();
  } else {
    return res.status(401).json({ err: 'Access Denied' });
  }
};

module.exports = requireAdmin;
