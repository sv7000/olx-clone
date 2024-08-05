const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./Routes/auth')
const itemRoutes = require('./Routes/item')

const app = express()

app.use(express.json())
app.use(cors()) 


mongoose.connect(process.env.MONGODB_URI).then(() => console.log("MongoDB connected successfully")).catch((err) => console.log(err))

app.use('/api/auth', authRoutes)
app.use('/api/items', itemRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

