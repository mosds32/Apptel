import {prisma}  from '../client/client.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
export const getCategory = asyncHandler(async(req, res, next) =>
{
try
{
const get_category = await prisma.categoryexercise.findMany();
if(get_category)
{
    return res.status(200).json(new ApiResponse(200, "Get Category", get_category));
}
}
catch(error)
{
    throw new ApiError(403, error?.message || "Error in Category");
}

});  