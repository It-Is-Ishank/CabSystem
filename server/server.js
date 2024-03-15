require("dotenv").config();
const express = require('express');
//const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cabsys.takh8to.mongodb.net/?retryWrites=true&w=majority&appName=CabSys`, {})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", () => {
    console.log("Connected to MongoDB!");
});

// Define routes
//app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/cabs', require('./routes/cabRoutes'));
app.use('/api/places', require('./routes/placesRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
