require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 9900;
app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
