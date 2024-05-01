import { prisma } from "../client/client.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
export const bedtime = asyncHandler(async(req, res, next) =>
{
    try
{
const {bedtime} = req.body;
const now = new Date();
const addbedtime = await prisma.bedtime.create(
    {
        data:
        {
            bedtime_time: bedtime,
            user_user_id: req.user.user_id,
            bedtime_createdat: now,
            bedtime_modifiedat: now
        }
    }
);
if(addbedtime)
{
    return res.status(200).json(new ApiResponse(200, "Time Added", addbedtime));
}
}
catch(error)
{
    throw new ApiError(403, error?.message  || "Error in Time");
}
});
export const getBedtime = asyncHandler(async(req, res, next)  =>
{
try
{
const getTime = await prisma.bedtime.findMany(
    {
        where:
        {
            user_user_id: req.user.user_id
        }
    }
);
if(getTime)
{
    return res.status(200).json(new ApiResponse(200, "Get Time",getTime));
}
}
catch(error)
{
throw new ApiError(403, error?.message || "Error in Get Time");
}

})