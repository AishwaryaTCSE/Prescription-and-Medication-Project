import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Middlewares
import errorMiddleware from './middlewares/error.middleware.js';

// Routes
import authRoutes from './routes/auth.routes.js';
import medicationRoutes from './routes/medication.routes.js';
import aiRoutes from './routes/ai.routes.js';

const app = express();

// Core Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API Routes V1
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/medication', medicationRoutes);
app.use('/api/v1/ai', aiRoutes);

// Health Check
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Prescription Management API is running.'
    });
});

// Error Handling Middleware (must be registered last)
app.use(errorMiddleware);

export default app;