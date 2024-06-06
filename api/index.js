import express from 'express';
import mongoose from 'mongoose';
import messageRoutes from './routes/messageRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.js';
import { notFound, errorHandler} from "./middleware/errorHandler.js"

const app = express();
app.disable('x-powered-by');

const port = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGO_DB_NAME,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Servir Swagger UI
app.use('/api/api-docs', swaggerUi.serve);
app.get('/api/api-docs', swaggerUi.setup(swaggerDocument));

// Rutas de API
app.use('/api/messages', messageRoutes);

// Middleware para manejo de errores
app.use(notFound);
app.use(errorHandler);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
