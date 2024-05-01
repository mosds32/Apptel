import { prisma } from "../client/client.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
export const addlike = asyncHandler(async(req, res, next) =>
{
try
{
    const {userlike, food_id} = req.body;
    const now = new Date();
const likeUser = await prisma.userlike.create(
    {
        data:
        {
          userlike_like: userlike,
          userlike_createdat: now,
          userlike_modifiedat: now,
          food_food_id: parseInt(food_id),
          user_user_id: req.user.user_id
        }
    }
);
if(likeUser)
{
    return res.status(200).json(new ApiResponse(200, "Like Food ", likeUser));
}
}
catch(error)
{
throw new ApiError(403, error?.message || "Error in Likes");
}
});