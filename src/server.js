const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
require('dotenv').config(); 
const users = require("./routes/users");
const products = require("./routes/products")
const profiles = require("./routes/profiles")

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    message: 'Too many requests from this IP, please try again later.',
    headers: true,
});
  
app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log("MongoDB not connected", err));
    
app.use('/users', users);
app.use('/products', products)
app.use('/profiles', profiles)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});