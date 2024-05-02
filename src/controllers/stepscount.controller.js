import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import {prisma} from '../client/client.js';
export const stepsCounts = asyncHandler(async(req, res, next) =>
{
try
{
const {steps_count, steps_date} = req.body;
const now = new Date();
const create_counts = await prisma.stepscount.create(
    {
        data:
        {
            stepscount_count: parseInt(steps_count),
            stepscount_date: steps_date,
            stepscount_createdat: now,
            stepscount_modifiedat: now, 
            user_user_id: req.user.user_id
        }
    }
);
if(create_counts)
{
    return res.status(200).json(new ApiResponse(200, "Countes Added", create_counts));
}

}
catch(error)
{
    throw new ApiError(403, error?.message || "Error in stepsCounts");
}

});
export const getSteps = asyncHandler(async(req, res, next) =>
{
    try
    {
const findSteps = await prisma.stepscount.findMany(
    {
        where:
        {
            user_user_id: req.user.user_id
        }
    }
);
if(findSteps)
{
    return res.status(200).json(new ApiResponse(200, "Get Steps", findSteps));
}
    }
    catch(error)
    {
        throw new ApiError(403, error?.message || "Error in Get Steps");
    }
} );
export const avgSteps = asyncHandler(async(req, res, next) =>
{
try
{
const finder = await prisma.stepscount.findMany(
    {
        where:
        {
            user_user_id:req.user.user_id
        }
    }
);
const avgSteps = finder.map(stepsCounts => stepsCounts.stepscount_count);

// Calculate the sum of all steps counts
const sum = avgSteps.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

// Calculate the average steps count
const averageStepsCount = sum / avgSteps.length;

if(averageStepsCount)
{
    return res.status(200).json(new ApiResponse(200, "Average Steps", averageStepsCount));
}

}
catch(error)
{
throw new ApiError(403, error?.message || "Error in Average");
}

});