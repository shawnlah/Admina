import express, { Application, Request, Response, NextFunction } from 'express';

// Boot express
const app: Application = express();
// TODO: Get this from .env
const port = 5000;

// Application routing
app.use('/', (req: Request, res: Response, next: NextFunction ) => {
  console.log('hi')
  res.status(200).send({data: 'Hello from shawn from the future'});
});

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
