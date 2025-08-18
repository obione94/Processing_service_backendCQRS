import express from 'express';
import healthzRoutes from './context/healthz/routes/healthzRoute';
import usersRoutes from './context/users/routes/usersRoute';

const app = express();

app.use(express.json());

app.use('/healthz', healthzRoutes);
app.use('/users', usersRoutes);


export default app;