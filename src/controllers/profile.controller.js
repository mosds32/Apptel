import {prisma} from '../client/client.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
export const addProfile = asyncHandler(async(req, res, next) =>
{
try
{
const {name, email, weight, height  } = req.body;
const now = new Date();
const imgPath = "/uploads/images/" + req.file.filename;
const create_profile = await prisma.profile.create(
    {
      data:
      {
      profile_name: name,
      profile_email: email,
      profile_img: imgPath,
      profile_height: parseInt(height),
      profile_weight: parseInt(weight),
      profile_iscreatedat: now,
      profile_ismodifiedat: now,
      user_user_id: req.user.user_id
      }
    }
);
if(create_profile)
{
    return res.status(200).json(new ApiResponse(200, "Profile Created", create_profile));
}
}
catch(error)
{
    throw new ApiError(403, error?.message || "Error in Add Profile");
}
});
export const getProfile = asyncHandler(async(req, res, next) =>
{
try
{
       const getProfile = await prisma.profile.findMany(
        {
            where:
            {
                user_user_id: req.user.user_id
            }
        }
       );
       if(getProfile)
       {
        return res.status(200).json(new ApiResponse(200, "Profile ", getProfile));
       }
}
catch(error)
{
    throw new ApiError(403, error?.message || "Error in Profile");
}

});