import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
import { connect } from 'mongoose';

// Set up env
dotenv.config()
const port = process.env.SERVER_PORT
const mongoURI = process.env.MONGO_URI

// Boot express
const app: Application = express();

// Application routing
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: 'all is ok' });
});

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));

// Connect to db
if (mongoURI) {
  connect(mongoURI)
    .then(resp => console.log("Successfully connected to mongo db"))
    .catch(err => console.log(`Failed to connect to mongo db with uri ${mongoURI} and error: ${err}`))
} else {
  console.log("Mongo URI EMPTY")
}
