import {prisma} from "../client/client.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
export const getExercise = asyncHandler(async(req, res, next) =>
{
try
{
const exercise = await prisma.exercise.findMany();
if(exercise)
{
    return res.status(200).json(new ApiResponse(200, "Get Exercise", exercise));
}
}
catch(error)
{
throw new ApiError(403, error?.message || "Error in Exercise");
}
});