import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
const auth =(...roles: string[])=>{
    return async(req:Request, res:Response, next:NextFunction)=>{
        try{
            const token = req.headers.authorization;
        if(!token){
            return res.status(500).json({message: "you are not allowed!"})
        };
        const decoded = jwt.verify(token, config.jwtSecret as string ) as JwtPayload;
        console.log({decoded});
        req.user= decoded ;
        if(roles.length && !roles.includes(decoded.role as string)){
            return res.status(500).json({
                message: "unauthorized!!",
            })
        }
        next();
        }catch(err:any){
            res.status(500).json({
                success:false,
                message:err.message
            })
        }
    }
};

export default auth;