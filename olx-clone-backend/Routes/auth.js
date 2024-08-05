const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.get('/some', async(req,res) => {
  try{
    console.log("its working");
    res.status(201).json({message: "User registered successfully"})
  }catch{
    res.status(500).json({message: 'Server error'})
  }
})

router.post('/register', async(req, res) => {
  const {username, email, password} = req.body;

  try{
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message: 'User already exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newUser = new User({
      username, 
      email,
      password: hashedPassword
    })
    console.log(newUser)
    await newUser.save();

    res.status(201).json({message: "User registered successfully"})
  }catch(error){
    res.status(500).json({message: 'Server error'})
  }
})


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
