import express from 'express';
import healthzRoutes from './context/healthz/routes/healthzRoute';
import usersRoutes from './context/users/routes/usersRoute';
import eventsRoutes from './context/events/routes/eventsRoute';
import {connectDB} from './context/events/infrastructure/db/cassandraClient'; 
const app = express();
connectDB();

app.use(express.json());

app.use('/healthz', healthzRoutes);
app.use('/users', usersRoutes);
app.use('/event', eventsRoutes);


export default app;