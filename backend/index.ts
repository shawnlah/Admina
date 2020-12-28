import express, { Application } from 'express';
import dotenv from 'dotenv'
import { connect } from 'mongoose';
import authRoutes from './routes/authentication'
import logger from './logger';

// Set up env
dotenv.config()
const port = process.env.SERVER_PORT
const mongoURI = process.env.MONGO_URI

// Boot express
const app: Application = express();

// Routes
app.use('/auth', authRoutes)

// Start server
app.listen(port, () => logger.debug(`Server is listening on port ${port}!`));

// Connect to db
if (mongoURI) {
  connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(resp => logger.debug("Successfully connected to mongo db"))
    .catch(err => logger.debug(`Failed to connect to mongo db with uri ${mongoURI} and error: ${err}`))
} else {
  logger.debug("Mongo URI EMPTY")
}
