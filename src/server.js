const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
require('dotenv').config(); 
const users = require("./routes/users");
const products = require("./routes/containers")
const profiles = require("./routes/profiles")
const search = require("./routes/search")
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

app.use('/api/users', users);
app.use('/api/containers', products)
app.use('/api/profiles', profiles)  
app.use('/api/search', search)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});