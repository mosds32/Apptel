import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { prisma } from '../client/client.js';
export const getSets = asyncHandler(async(req, res, next) =>
{
try
{
 const sets = await prisma.sets.findMany();
 if(sets)
 {
    return res.status(200).json(new ApiResponse(200, "Get Sets", sets));
 }
}
catch(error)
{
    throw new ApiError(403, error?.message || "Error in Sets");
}
});