import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router= express.Router();

router.post("/", userControllers.createUser);

router.get("/", auth(), userControllers.getUser);

router.get("/:id", userControllers.getSingleUser);

router.put("/:id", userControllers.updateuser);

router.delete("/:id", userControllers.deleteUser);



export const userRoutes = router;