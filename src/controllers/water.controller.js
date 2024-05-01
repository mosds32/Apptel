import { prisma } from "../client/client.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
export const addwater = asyncHandler(async(req, res, next)  =>
{
try
{
const {num_glass}=req.body;
const now = new Date();
const water = await prisma.water.create(
    {
        data:
        {
            water_num_of_glass: num_glass,
            user_user_id: req.user.user_id,
            water_createdat: now,
            water_modifiedat: now
        }
    }
);
if(water)
{
    return res.status(200).json(new ApiResponse(200, "Water ", water));
}

}
catch(error)
{
    throw new ApiError(403, error?.message || "Error in Water");
}
} );
export const getWater = asyncHandler(async(req, res, next) =>
{
    try
    {
           const getwaters = await prisma.water.findMany(
            {
                where:
                {
                    user_user_id: req.user.user_id
                }
            }
           );
           if(getwaters)
           {
            return res.status(200).json(new ApiResponse(200, "Get Waters", getwaters));
           }
    }
    catch(error)
    {
        throw new ApiError(403, error?.message || "Error in Water");
    }
} );
