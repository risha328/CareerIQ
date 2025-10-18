require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');
const multer = require('multer');
const { swaggerUi, specs } = require('./src/swagger');

const candidateRoutes = require('./src/routes/candidateRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Note: Multer is now configured in routes/candidateRoutes.js

connectDB();

app.use('/candidate', candidateRoutes);

const PORT = process.env.PORT || 9901;
app.listen(PORT, () => console.log(`Candidate Service running on port ${PORT}`));
