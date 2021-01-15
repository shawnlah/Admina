import express, { Application } from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import { connect } from 'mongoose';
import bodyParser from 'body-parser'
import authRoutes from './routes/authentication'
import userRoutes from './routes/user'
import leaveRoutes from './routes/leave'
import salaryRoutes from './routes/salary'
import logger from './logger';


// Set up env
dotenv.config()
const port = process.env.SERVER_PORT
const mongoURI = process.env.MONGO_URI

// Boot express
const app: Application = express();

// Cors, any because https://stackoverflow.com/a/59186658
app.use(cors() as any)

// Parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/leave', leaveRoutes)
app.use('/salary', salaryRoutes)

// Start server
app.listen(port, () => logger.debug(`Server is listening on port ${port}!`));

// Connect to db
if (mongoURI) {
  logger.info(`Connecting to ${mongoURI}`)
  connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(res => logger.info('Connected to admina db'))
    .catch(err => logger.debug(`Failed to connect to admina db: ${err}`))
}
