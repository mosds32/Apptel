import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import {prisma}  from '../client/client.js';
export const getIngredients = asyncHandler(async(req, res, next) =>
{
try
{
const ingredients = await prisma.ingredients.findMany();
if(ingredients)
{
    return res.status(200).json(new ApiResponse(200, "Ingredients", ingredients));
}
}
catch(error)
{
throw new ApiError(403, error?.message || "Ingredients Not");
}

});