import express, { type Request, type Response } from 'express';
import config from './config';
import initDB from './config/db';
import logger from './middleware/logger';
import { userRoutes } from './modules/user/user.routes';
import { todoRoutes } from './modules/todo/todo.routes';
import { authRoutes } from './modules/auth/auth.routes';

const app = express();
const port = config.port;

//parser
app.use(express.json());

initDB();

app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use("/users", userRoutes);

app.use("/todos", todoRoutes);

app.use("/auth", authRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
