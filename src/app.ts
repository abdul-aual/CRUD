import express, { type Request, type Response } from 'express';
import initDB from './config/db';
import logger from './middleware/logger';
import { userRoutes } from './modules/user/user.routes';
import { todoRoutes } from './modules/todo/todo.routes';
import { authRoutes } from './modules/auth/auth.routes';

const app = express();


//parser
app.use(express.json());

initDB();

app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use("/users", userRoutes);

app.use("/todos", todoRoutes);

app.use("/auth", authRoutes);


app.use((req,res)=>{
    res.status(404).json({
        success:false,
        message:"Route not found",
        path:req.path,
    });
});


export default app;