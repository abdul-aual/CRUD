import express, { type Request, type Response } from 'express';
import config from './config';
import { pool } from './config/db';
import initDB from './config/db';
import logger from './middleware/logger';
import { userRoutes } from './modules/user/user.routes';

const app = express();
const port = config.port;

//parser
app.use(express.json());

initDB();

app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use("/users", userRoutes);

//single user
app.get("/users/:id", async(req:Request, res:Response)=>{
    try{
        const userId = req.params.id;
        const result = await pool.query(`SELECT * FROM users WHERE ID=$1`, [userId]);
        if(result.rows.length===0){
            res.status(404).json({
                message: "user not found"
            })
            return;
        }
        res.status(200).json({
            message:"User retrieved successfully",
            data: result.rows[0]
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

//update user
app.put("/users/:id", async(req:Request, res:Response)=>{
    try{
        const userId = req.params.id;
        const {name, email} = req.body;
        console.log(req.body);
        const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`, [name, email, userId]);
        if(result.rows.length===0){
            res.status(404).json({
                message: "user not found"
            })
            return;
        }
        res.status(200).json({
            message:"User updated successfully",
            data: result.rows[0]
        })

    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

//delete user
app.delete("/users/:id", async(req:Request, res:Response)=>{
    try{
        const userId = req.params.id;
        const result = await pool.query(`DELETE FROM users WHERE id=$1`, [userId]);

        if(result.rowCount===0){
            res.status(404).json({
                success:false,
                message:"user not found"
            })
            return;
        }
        res.status(200).json({
            success:true,
            message:"user deleted successfully"
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});



//todo CRUD
app.post("/todos", async(req:Request, res:Response)=>{
    try{
        const {user_id, title } = req.body;

    // Check if user exists
    const userCheck = await pool.query(`SELECT * FROM users WHERE id=$1`, [user_id]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
      return
    }
        const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title]);
        res.status(201).json({
            success:true,
            message:"todos inserted successfully",
            data: result.rows[0]
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

//todos delete
app.delete("/todos/:id", async(req:Request, res:Response)=>{
    try{
        const userId = req.params.id;
        const result = await pool.query(`DELETE FROM todos WHERE id=$1`, [userId]);

        if(result.rowCount===0){
            res.status(404).json({
                success:false,
                message:"user not found"
            })
            return;
        }
        res.status(200).json({
            success:true,
            message:"user deleted successfully"
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
