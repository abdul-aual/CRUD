import { Request, Response } from "express";
import { todoServices } from "./todo.service";

const createTodo =  async (req: Request, res: Response) => {
  try {
    const { user_id, title } = req.body;

    const result  = await todoServices.createTodo(user_id, title);

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: result.rows[0]
    });
  } catch (err: any) {
    if (err.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getTodo = async(req:Request, res:Response)=>{
    try{
        const result = await todoServices.getTodo();
        res.status(201).json({
            success:true,
            message: "todo retrived Successfully",
            data: result.rows
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message:err.message
        });
    }
};

const updateTodo = async(req:Request, res:Response)=>{
try{
    const {title}=req.body;
    const result = await todoServices.updateTodo(title , req.params.id!);
    if(result.rows.length===0){
        res.status(404).json({
            message: "Todo not found with this ID"
        });
        return;
    };
    res.status(200).json({
        message: "Todo updated successfully",
        data: result.rows[0]
    })
}catch(err:any){
    res.status(500).json({
        success: false,
        message:err.message
    });
}
};

const deleteTodo =  async(req:Request, res:Response)=>{
    try{
        const userId = req.params.id;
        
        const result =await todoServices.deleteTodo(userId as string);

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
};

export const todoControllers={
    createTodo,
    getTodo,
    deleteTodo,
    updateTodo
}
