const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/authModel');

// Register a new user
exports.register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, mobileNumber } = req.body;

  console.log('Password:', password);  // Log the password for debugging
  console.log('Confirm Password:', confirmPassword);

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobileNumber
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during user registration:', err);  // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: err.message }); // Return the error message to the client
  } 
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({
      token,
      userId: user._id 
    });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
