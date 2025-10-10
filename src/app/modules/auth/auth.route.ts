import { Router } from "express";
import { authControllers } from "./auth.controller";


const router = Router();

router.post("/login", authControllers.loginPatient)

export const authRoutes = router;