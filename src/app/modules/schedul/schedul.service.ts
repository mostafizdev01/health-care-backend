import { addHours, addMinutes, format } from "date-fns";
import { prisma } from "../../shared/prisma";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { IJWTPayload } from "../../types/common";
import { Prisma } from "@prisma/client";


const insertIntoDB = async (payload: any) => {
    const { startTime, endTime, startDate, endDate } = payload;

    const intervalTime = 30;
    const schedules = [];

    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
        const startDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-MM-dd")}`,
                    Number(startTime.split(":")[0]) // example 11:30 theke 0 number index => 11.
                ),
                Number(startTime.split(":")[1]) // example 11:30 theke 1 number index => 30.
            )
        )
        const endDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-MM-dd")}`,
                    Number(endTime.split(":")[0]) // example 11:30 theke 0 number index => 11.
                ),
                Number(endTime.split(":")[1]) // example 11:30 theke 1 number index => 30.
            )
        )

        while (startDateTime < endDateTime) {
            const slotStartDateTime = startDateTime // mone koi 11:30 theke ekta slot stert hoilo.
            const slotEndDateTime = addMinutes(startDateTime, intervalTime);

            const schedulDate = {
                startDateTime: slotStartDateTime,
                endDateTime: slotEndDateTime
            }

            const existingSchedule = await prisma.schedule.findFirst({
                where: schedulDate
            })

            if (!existingSchedule) {
                const result = await prisma.schedule.create({
                    data: schedulDate
                })
                schedules.push(result)
            }

            slotStartDateTime.setMinutes(slotStartDateTime.getMinutes() + intervalTime);
        }

        currentDate.setDate(currentDate.getDate() + 1)
    }

    return schedules;
}

/// create schedules 

const schedulesForDoctor = async (user: IJWTPayload,
    fillters: any, options: IOptions
) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
    const { startDateTime: filterStartDateTime, endDateTime: filterEndDateTime } = fillters;

    const andConditions: Prisma.ScheduleWhereInput[] = [];

    if(filterStartDateTime && filterEndDateTime){
        andConditions.push({
            AND: [
                {
                    startDateTime: {
                        gte: filterStartDateTime
                    }
                },
                {
                    endDateTime: {
                        lte: filterEndDateTime
                    }
                }
            ]
        })
    }

    const whereConditions: Prisma.ScheduleWhereInput = andConditions.length > 0 ? {
        AND: andConditions
    } : {}

    const doctorSchedules = await prisma.doctorSchedules.findMany({
        where: {
            doctor: {
                email: user.email
            }
        },

        select:{
            scheduleId: true
        }
    });

    const doctorScheduleIds = doctorSchedules.map(schedule => schedule.scheduleId);

    const result = await prisma.schedule.findMany({
        where: {
            ...whereConditions,
            id: {
                notIn: doctorScheduleIds
            }
        },
        skip,
        take: limit,
        orderBy : {
            [sortBy]: sortOrder
        }
    });

    const total = await prisma.schedule.count({
        where: {
            ...whereConditions,
            id: {
                notIn: doctorScheduleIds
            }
        }
    })

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}

const deleteScheduleFromDB = async (id: string)=> {
    return await prisma.schedule.delete({
        where: {
            id
        }
    })
}

export const scheduleServices = {
    insertIntoDB,
    schedulesForDoctor,
    deleteScheduleFromDB
}