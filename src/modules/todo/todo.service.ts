import { pool } from "../../config/db";

const createTodo = async (user_id: string, title: string) => {
  // 1. Check if user exists
  const userCheck = await pool.query(
    `SELECT id FROM users WHERE id = $1`,
    [user_id]
  );

  if (userCheck.rows.length === 0) {
    throw new Error("USER_NOT_FOUND");
  }

  // 2. Insert todo
  const result = await pool.query(
    `INSERT INTO todos(user_id, title)
     VALUES($1, $2)
     RETURNING *`,
    [user_id, title]
  );

  return result;
};

const getTodo = async()=>{
    const result = await pool.query(`SELECT * FROM todos`);
    return result;
};

const updateTodo = async(title:string, id:string)=>{
    const result = await pool.query(`UPDATE todos SET title=$1 WHERE id=$2 RETURNING *`, [title, id]);
    return result;
};

const deleteTodo = async(id:string)=>{
    const result = await pool.query(`DELETE FROM todos WHERE id=$1`, [id]);
    return result;
};

export const todoServices = {
  createTodo,
  getTodo,
  deleteTodo,
  updateTodo
};
