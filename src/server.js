const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const app = express();
require('dotenv').config();
const users = require("./routes/users");
const products = require("./routes/products")
const profiles = require("./routes/profiles")
const search = require("./routes/search")
const containers = require("./routes/containers")
const filter = require("./routes/filter")
const chat = require("./routes/chats");
const config = require('./config');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: (req, res) => req.clientIp
});

app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(express.json());

const PORT = config.PORT || 5000;
const dbURI = config.MONGO_URI

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/users', users);
app.use('/api/products', products)
app.use('/api/profiles', profiles)
app.use('/api/search', search)
app.use("/api/containers", containers)
app.use("/api/filter", filter)
app.use("/api/chats", chat)
app.get("/test", (req, res) => {
    res.send(dbURI)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});