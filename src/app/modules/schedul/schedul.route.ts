import { Router } from "express";
import { scheduleControllers } from "./schedul.controller";


const router = Router();

router.post("/create-schedule", scheduleControllers.insertIntoDB)


export const scheduleRoutes = router;