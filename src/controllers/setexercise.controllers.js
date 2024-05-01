import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { prisma } from '../client/client.js';
export const getSetExercise = asyncHandler(async(req, res, next) =>
{
    try
    {
const getsetExercise = await prisma.setexercise.findMany();
if(getsetExercise)
{
    return res.status(200).json(new ApiResponse(200, "Get Exercise ", getsetExercise));
}
    }
    catch(error)
    {
        throw new ApiError(403, error?.message || "Error in Set Exercise");
    }
} )