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


// Fetch user details by user_id
exports.getUserDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch user details based on userId
    const user = await User.findById(userId).select('-password');  // Exclude the password from the response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, mobileNumber } = req.body;
  const profileImage = req.file ? req.file.path : null;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {firstName, lastName, email, mobileNumber, profileImage},
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user details:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getImage=async (req, res) =>{
  const { userId } = req.params;
  User.findById(userId)
    .then(user => {
      if (!user || !user.profileImage) {
        return res.status(404).send('Image not found');
      }
      // Send the image file
      res.sendFile(path.join(__dirname, user.profileImage));
      
    })
    .catch(err => res.status(500).json({ message: 'Server error', error: err.message }));
}