const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const Item = require('../models/Item');
const User = require('../models/User');

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads'); // Ensure this path is correct
    cb(null, uploadDir); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Extract token

  console.log('Received token:', token); // Log token

  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error('Token verification error:', err); // Log error
    res.status(400).json({ message: 'Invalid token' });
  }
};


// Add a new item with image (authenticated)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  const { name, price, status } = req.body;
  const image = req.file ? req.file.filename : undefined;

  try {
    const newItem = new Item({ name, price, owner: req.user.userId, status, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding item:', error); // Log detailed error
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all unsold items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find({ status: 'unsold' }).populate('owner', 'username');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



// Get items uploaded by the logged-in user (authenticated)
router.get('/my-items', authenticateToken, async (req, res) => {
  try {
    const items = await Item.find({ owner: req.user.userId });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Find the item by ID
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if the logged-in user is the owner of the item
    if (item.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }


    // Delete the item from the database
    await Item.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error); // Log detailed error
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

// Get purchased items by the logged-in user (authenticated)
router.get('/my-purchases', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('purchases');
    res.status(200).json(user.purchases);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

