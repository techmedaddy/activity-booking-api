const jwt = require('jsonwebtoken');

// JWT Authentication Middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use flexible user ID assignment
    req.user = {
      userId: decoded.userId || decoded.id || decoded._id || null
    };

    if (!req.user.userId) {
      console.warn('JWT payload missing user ID:', decoded);
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
