import { Router } from "express";
import { userControllers } from "./user.controllers";


const route = Router();

route.post("/create-patient", userControllers.createUser)

export const userRoutes = route;