import { prisma } from "../client/client.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
export const mealplan = asyncHandler(async(req, res, next) =>
{
try
{
    const {food_id} = req.body;
    const now = new Date();
const takePlan = await prisma.mealplan.create(
    {
        data:
        {
            food_food_id: food_id,
            user_user_id: req.user.user_id,
            mealplan_createdat: now,
            mealplan_modifiedat: now
        }
    }
);
if(takePlan)
{
    return res.status(200).json(new ApiResponse(200, "Food Take", takePlan));
}
}
catch(error)
{
    throw new ApiError(403, error?.message || "Error in Take Plan");
}
});
export const getMealPlan = asyncHandler(async(req, res, next) =>
{
try
{
const meals = await prisma.mealplan.findMany(
    {
        where:
        {
            user_user_id: req.user.user_id
        }
    }
);
if(meals)
{
    return res.status(200).json(new ApiResponse(200, "Get Plans", meals));
}
}
catch(error)
{
    throw new ApiError(403, error?.message || "Error in Meal Plans");
}


})