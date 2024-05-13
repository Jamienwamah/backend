// Requirements
const pg = require('pg');
const express = require('express');
const db = require('./db'); 
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const logger = require('./src/utils/info_logger');
// Removed e_logger
const logoutRoutes = require('./src/routes/Logout');
const userRoutes = require('./src/routes/Users');
const authRoutes = require('./src/routes/auth');
const myHotelRoutes = require("./src/routes/My-hotels");
const HotelRoutes = require("./src/routes/Hotels");
const viewRoutes = require("./src/routes/Views");

dotenv.config();
const { Pool } = pg;

try {
    logger.info('Cloudinary init');
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
} catch (err) {
    // Removed e_logger
    console.error(err);
}

// PORT
const PORT = process.env.PORT || 5000;



const app = express();


// Add endpoint
app.post('/add', async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    try {
        const query = 'INSERT INTO your_table (name, email) VALUES ($1, $2) RETURNING *';
        const values = [name, email];
        const data = await db.query(query, values); // Execute query using db module
        res.json(data.rows[0]);
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Express configuration
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/logout", logoutRoutes);
app.use("/my-hotels", myHotelRoutes);
app.use("/hotels", HotelRoutes);
app.use("/", viewRoutes);

// Auth endpoint
app.post('/check', (req, res) => {
    const { auth_token } = req.cookies;
    try {
        // Verifying token
        const decoded = jwt.verify(auth_token, process.env.JWT_SECRET_KEY);
        // If token is ok
        return res.status(200).json({ valid: true });
    } catch (error) {
        // If token is not ok
        return res.status(401).json({ message: "Not available" });
    }
});

// Listen config
app.listen(PORT, () => {
    logger.info(`Server is started in port ${PORT}`);
});
