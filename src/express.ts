import express, { type Request, type Response } from 'express';
import {Pool} from "pg";
import dotenv from "dotenv";
import path from "path";
dotenv.config({path:path.join(process.cwd(), ".env")})

const app = express();
const port = 3000;
//parser
app.use(express.json());

const pool = new Pool({
    connectionString: `${process.env.connection_str}`
});

const initDB = async()=>{
 await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    age INT,
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `)
}
initDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.post("/users", async(req:Request, res:Response)=>{
    const {name, email} = req.body;
    try{
        const result = await pool.query(`INSERT INTO users(name, email) VALUES($1, $2)`, [name, email]);
        res.status(201).json({
            success:true,
            message:"Data inserted successfully"
           // data: result.rows[0]
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

//all users
app.get("/users", async(req:Request, res:Response)=>{
    try{
        const result = await pool.query(`SELECT * FROM users`);
        res.status(200).json({
            success:true,
            message:"users retrived successfully",
            data: result.rows
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

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
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
