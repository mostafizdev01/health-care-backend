import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { DoctorScheduleController } from "./doctorSchedule.controllers";

const router = express.Router();

router.post(
    "/",
    auth(UserRole.DOCTOR),
    DoctorScheduleController.insertIntoDB
)

export const doctorScheduleRoutes = router;