const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as per your project structure

// Middleware to authenticate the user based on JWT token
const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from Authorization header
  console.log('Received token:', token); // Log token to check


  if (!token) {
    return res.status(401).json({ error: 'You must be logged in to access this resource.' });
  }

  try {
    console.log('JWT Secret:', process.env.JWT_SECRET); // Temporary logging for debugging

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with your secret key
    console.log('Decoded token:', decoded);

    const user = await User.findById(decoded.id); // Find the user by decoded ID from the token

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error('Authentication error:', error); // Log the error for debugging
    return res.status(401).json({ error: 'You must be logged in to access this resource.' });
  }
};


module.exports = authenticateUser;
