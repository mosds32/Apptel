import { prisma } from "../client/client.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
export const addSchedule = asyncHandler(async(req, res, next) =>
{
    try
    {
const {schedule_time, exercise_id} = req.body;
const now = new Date();
const create_schedule = await prisma.schedule.create(
    {
        data:
        {
          schedule_time: schedule_time,
          schedule_createdat: now,
          schedule_modifiedat: now,
          user_user_id: req.user.user_id,
          exercise_exercise_id: exercise_id
        }
    }
);
if(create_schedule)
{
    return res.status(200).json(new ApiResponse(200, "Schedule Created", create_schedule));
}
    }
    catch(error)
    {
        throw new ApiError(403, error?.message || "Error in Add Schedule");
    }
});

export const GetSchedule = asyncHandler(async(req, res, next) =>
{
try
{
const Schedule = await prisma.schedule.findMany(
    {
        where:
        {
            user_user_id: req.user.user_id
        }
    }
);
if(Schedule)
{
    return res.status(200).json(new ApiResponse(200, "Schedule Data", Schedule));
}
}
catch(error)
{
    throw new ApiError(403, error?.message || "Error in Get Schedule");
}
});
