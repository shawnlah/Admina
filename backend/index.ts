import express, { Application } from 'express';
import dotenv from 'dotenv'
import { connect, disconnect } from 'mongoose';
import authRoutes from './routes/authentication'
import userRoutes from './routes/user'
import logger from './logger';


// Set up env
dotenv.config()
const port = process.env.SERVER_PORT
const mongoURI = process.env.MONGO_URI

// Boot express
const app: Application = express();

// Routes
app.use('/auth', authRoutes)
app.use('/user', userRoutes)

// Start server
app.listen(port, () => logger.debug(`Server is listening on port ${port}!`));

// Connect to db
if (mongoURI) {
  logger.info(`Connecting to ${mongoURI}`)
  connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(res => logger.info('Connected to ekolah db'))
    .catch(err => logger.debug(`Failed to connect to eskolah db: ${err}`))
}
