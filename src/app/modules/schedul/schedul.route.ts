import { Router } from "express";
import { scheduleControllers } from "./schedul.controller";


const router = Router();

router.get("/", scheduleControllers.schedulesForDoctor)
router.post("/create-schedule", scheduleControllers.insertIntoDB)
router.delete("/:id", scheduleControllers.deleteScheduleFromDB)


export const scheduleRoutes = router;