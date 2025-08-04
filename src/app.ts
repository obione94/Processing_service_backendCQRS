import express from 'express';
import healthzRoutes from './context/healthz/routes/healthzRoute';

const app = express();

app.use(express.json());

app.use('/healthz', healthzRoutes);


export default app;