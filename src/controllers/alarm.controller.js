import { prisma } from "../client/client.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
export const SetAlaram = asyncHandler(async(req, res, next) =>
{
try
{
const {alarmTime} = req.body;
const now = new Date();
const addTime = await prisma.alarm.create(
    {
        data:
        {
            alarm_time: alarmTime,
            alarm_createdat: now,
            alarm_modifiedat: now,
            user_user_id: req.user.user_id
        }
    }
);
if(addTime)
{
    return res.status(200).json(new ApiResponse(200, "User Set Alarm", addTime));
}
}
catch(error)
{
throw new ApiError(403, error?.message || "Error in Getting Food");
}
});
export const getAlarm = asyncHandler(async(req, res, next) =>
{
try
{
const ViewTime = await prisma.alarm.findMany(
    {
        where:
        {
            user_user_id: req.user.user_id
        }
    }
);
if(ViewTime)
{
    return res.status(200).json(new ApiResponse(200, "Time", ViewTime));
}
}
catch(error)
{
 throw new ApiError(403, error?.nessage || "Error in Time");
}

});
