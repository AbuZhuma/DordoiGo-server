const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
// const rateLimit = require()

require('dotenv').config();


const users = require("./routes/users");
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log("MongoDB not connected", err));
    
app.use('/users', users);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});