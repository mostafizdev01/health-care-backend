import { addHours, addMinutes, format } from "date-fns";
import { prisma } from "../../shared/prisma";


const insertIntoDB = async (payload: any) => {

    const { startTime, endTime, startDate, endDate } = payload;

    const intervalTime = 30;
    const schedules = [];

    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while(currentDate <= lastDate){
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

        while (startDateTime < endDateTime){
            const slotStartDateTime = startDateTime // mone koi 11:30 theke ekta slot stert hoilo.
            const slotEndDateTime = addMinutes(startDateTime, intervalTime);

            const schedulDate = {
                startDateTime: slotStartDateTime,
                endDateTime: slotEndDateTime
            }

            const existingSchedule = await prisma.schedule.findFirst({
                where: schedulDate
            })

            if(!existingSchedule){
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

export const scheduleServices = {
    insertIntoDB
}