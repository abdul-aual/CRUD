import express, {Request, Response} from "express";
import { userServices } from "./user.service";
const createUser = async(req:Request, res:Response)=>{
    const {name, email} = req.body;
    try{
        const result = await userServices.createUser(name, email);
        res.status(201).json({
            success:true,
            message:"Data inserted successfully",
            data: result.rows[0]
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};

const getUser=async(req:Request, res:Response)=>{
    try{
       const result = await userServices.getUser();
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
};

const getSingleUser = async(req:Request, res:Response)=>{
    try{
        const result = await userServices.getSingleUser(req.params.id as string)
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
};

const updateuser = async(req:Request, res:Response)=>{
    try{
        const userId = req.params.id;
        const {name, email} = req.body;
        const result = await userServices.updateUser(name, email, userId as string);
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
};

const deleteUser = async(req:Request, res:Response)=>{
    try{
        const result = await userServices.deleteUser(req.params.id!)
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
}


export const userControllers={
    createUser,
    getUser,
    getSingleUser,
    updateuser,
    deleteUser,
}