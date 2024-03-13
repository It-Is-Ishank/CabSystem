require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.f387jr1.mongodb.net/`, {});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define routes
//app.use('/api/bookings', require('./routes/bookingRoutes'));
//app.use('/api/cabs', require('./routes/cabRoutes'));
app.use('/api/places', require('./routes/placesRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
