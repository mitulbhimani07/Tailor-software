// index.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3002;
const mongoose = require('mongoose');
// MongoDB connection
// const database = require('./config/database');
mongoose.connect("mongodb+srv://meetkumartailor99048:g6EPjKQCCwlLvbJ8@cluster0.3mpwzsg.mongodb.net/Tailor")
  .then(() => {
    console.log("DB is Connected");
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
  });


// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Routes
app.use('/', require('./routes/TailorRoutes'));
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});