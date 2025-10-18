require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');
const { swaggerUi, specs } = require('./src/swagger');

const jobRoutes = require('./src/routes/jobRoutes');
const candidateRoutes = require('./src/routes/candidateRoutes');
const analyticsRoutes = require('./src/routes/analyticsRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

connectDB();

app.use('/employer', jobRoutes);
app.use('/employer', candidateRoutes);
app.use('/employer', analyticsRoutes);

const PORT = process.env.PORT || 9902;
app.listen(PORT, () => console.log(`Employer Service running on port ${PORT}`));
