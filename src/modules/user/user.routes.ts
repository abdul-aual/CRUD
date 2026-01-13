import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router= express.Router();

router.post("/", userControllers.createUser);

router.get("/", auth("admin"), userControllers.getUser);

router.get("/:id", auth("admin", "user"), userControllers.getSingleUser);

router.put("/:id", userControllers.updateuser);

router.delete("/:id", userControllers.deleteUser);



export const userRoutes = router;