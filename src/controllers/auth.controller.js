import {prisma} from '../client/client.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { hashPassword } from '../utils/HashedPassword.js';
import { generateToken } from '../utils/GenerateTokens.js';
import { comparePassword } from '../utils/ComparePassword.js';
import { mail } from '../utils/Mail.js';
import generateOtp from '../utils/GenerateOtp.js';
import { cookieOptions } from '../config/CookieOption.js';
import { signUpValidator } from '../validator/object.schema.validator.js';
export const signup = asyncHandler(async(req, res, next) =>
{
try
{
const {name, email, password}  = signUpValidator(req.body, res, "Signup");

const findUser = await prisma.user.findFirst(
    {
        where:
        {
            user_email:email
        }
    }
);
if(findUser)
{
    return res.status(200).json(new ApiResponse(402, "User not Found"));
}
const hashedPassword = await hashPassword(password);
const now = new Date();
const newUser = await prisma.user.create(
    {
        data:
        {
            user_email: email,
            user_password: hashedPassword,
            user_name:name,
            user_iscreatedat: now,
            user_ismodifiedat:now,
            user_role: 'admin',
            user_isemailverify: 0
        }
    }
);
if(!newUser)
{
    return res.status(200).json(new ApiResponse(401, "User not Found"));
}

const otp = generateOtp();
await mail(newUser.user_email,otp);

await prisma.otp.create(
    {
        data:
        {
            otp_number:otp,
            user_user_id: newUser.user_id,
            otp_createdat: now,
            otp_modifiedat: now
        }
    }
);
const currentUser = {Email: newUser.user_email};
const {accessToken} = generateToken(currentUser);
await prisma.login.create(
    {
        data:
        {
            user_user_id: newUser.user_id,
            login_status:1,
            login_createdat:now,
            login_modifiedat:now
        }
    }
);
return res.status(200).cookie("accessToken", accessToken, cookieOptions).json(new ApiResponse(200, "Signup User Created Successfully"));
}
catch(error)
{
    throw new ApiError(403, error?.message || "Error in Signup");
}
});

export const login = asyncHandler(async(req, res, next)=>
{
try
{
   const {email, password}= req.body;

   const user = await prisma.user.findFirst(
    {
        where:
        {
            user_email: email
        },
        select:
        {
            user_id: true,
            user_name: true,
            user_email: true,
            user_password: true   
        }
    }
   );
   if(!user)
   {
    return res.status(404).json(new ApiResponse(404, "Login! User not found"));
   }
   const isPasswordValid = await comparePassword(password, user.user_password, res);
   if(!isPasswordValid)
   {
    return res.status(401).json(new ApiResponse(401, "Login! User Password Mismatched"));
   }
   const {accessToken}=generateToken(user);
   const now = new Date();
   const findUser = await prisma.login.findFirst(
    {
      where:
      {
        user_user_id: user.user_id
      }  
    }
   );
   await prisma.login.update({
    where:
    {
        login_id: findUser.login_id
    },
    data:
    {
        user_user_id: user.user_id,
        login_status: 1,
        login_createdat:now, 
        login_modifiedat: now
    }
   });
   const responseData = {
    accessToken,
    user
   };
   return res.status(200).clearCookie("accessToken").cookie("accessToken", accessToken, cookieOptions).json(new ApiResponse(200, "Login! You Signup ", responseData));
}
catch(error)
{
    throw new ApiError(403, error?.message || "Error in Login");
}
});
export const otpverify = asyncHandler(async(req, res, next) =>
{
    try
    {
       const userId = req.user.user_id;
       const otpCode = req.body.otpCode;
       const findUser = await prisma.user.findUnique(
        {
           where:
           {
            user_id: userId
           } 
        }
       );
       if(!findUser)
       {
        return res.status(400).json(new ApiResponse(400, "User Not Found"));
       }
const OtpFinder = await prisma.otp.findFirst(
    {
        where:
        {
            otp_number: otpCode
        }
    }
);
if(!OtpFinder)
{
    return res.status(404).json(new ApiResponse(404, "Otp Not Exist"));
}
const UpdateUser = await prisma.user.update(
    {
        where:
        {
            user_id: findUser.user_id
        },
        data:
        {
            user_isemailverify:1
        }
    }
);
if(UpdateUser)
{
    return res.status(200).json(new ApiResponse(200, "User Verify", UpdateUser));
}
    }
    catch(error)
    {
        throw new ApiError(403, error?.message || "Error in Verify Otp");
    }
}  );

export const resendOtp = asyncHandler(async(req, res) =>
{
    try
    {
       const {email} = req.body;
       const now = new Date();
       const otpCode = generateOtp();
       const user = await prisma.user.findFirst(
        {
            where:
            {
                user_email: email
            }
        }
       );
       if(!user)
       {
        return res.status(404).json("Resend Otp, User not Found");
       }
const userotprecord = await prisma.otp.findFirst(
    {
        where:
        {
            user_user_id: user.user_id
        }
    }
);
if(!userotprecord)
{
return res.status(404).json(new ApiResponse(404, "User Record Not Found"));
}
const UpdateOtp = await prisma.otp.update(
    {
        where:
        {
            otp_id: userotprecord.otp_id
        },
        data:
        {
            otp_number: otpCode,
            otp_createdat: now,
            otp_modifiedat: now
        }
    }
);
await mail(email, otpCode);
if(UpdateOtp)
{
return res.status(200).json(new ApiResponse(200, "OTP Resend Successfully"));
}
    }
    catch(error)
    {
        throw new ApiError(403, error?.message || "Error in Resend Otp");
    }
} );

export const forgetPassword = asyncHandler(async(req, res, next) =>
{
try
{
const {email, password, otpCode} = req.body;
const now = new Date();
let otp = otpCode || null;
const findUser = await prisma.user.findFirst(
    {
        where:
        {
            user_email: email
        }
    }
);
if(!findUser)
{
    return res.status(200).json(new ApiResponse(200, "User Not Exists"));
}
const OtpFinder = await prisma.otp.findFirst(
    {
        where:
        {
            user_user_id: findUser.user_id
        },
        orderBy:
        {
            otp_createdat:'desc'
        }
    }
);
if(!OtpFinder?.otp_number)
{
    const otp = generateOtp();
    const zipCodeUser = await prisma.otp.upsert(
        {
            create:
            {
                otp_number:`${otp}`,
                user_user_id: findUser.user_id,
                otp_createdat: now
            },
            update:
            {
                otp_number: `${otp}`,
            },
            where:
            {
                user_user_id: findUser.user_id
            }
        }
    );
    await mail(findUser.user_email, otp);
    return res.status(200).json(new ApiResponse(200, "User Email Sent Successfully"));
}
let OtpValid = parseInt(OtpFinder.otp_number) === parseInt(otp);
if(OtpValid)
{
await prisma.user.update(
    {
        data:
        {
            user_ismodifiedat:now,
            user_isemailverify:1
        },
        where:
        {
            user_id: findUser.user_id,
            user_email: findUser.user_email
        }
    });
if(password)
{
    const hashedPassword = await hashPassword(password);
    const updatedUser = await prisma.user.update(
        {
            where:
            {
                user_id: findUser.user_id
            },
            data:
            {
               user_password: hashedPassword,
               user_ismodifiedat: now 
            },
            select:
            {
                user_id: true,
                user_email: true,
                user_password: true
            }
        }
    );
    const accessToken = generateToken(updatedUser)?.accessToken;
    return res.status(200).cookie("accessToken", accessToken, cookieOptions).json(new ApiResponse(200, "Forget User Email Verfied ", {accessToken}));
}
return res.status(200).json(new ApiResponse(200, "Forget Password! User Email Verify"));
}
if(!findUser.user_isemailverify)
{
    return res.status(402).json(new ApiResponse(402, "User Email Not Verify"));
}
return res.status(200).json(new ApiResponse(200, "Forget Password  Success "));
}
catch(error)
{
    throw new ApiError(403, error?.message || "Error in Change Password");
}
});

export const logout = asyncHandler(async(req, res, next) =>
{
try
{
const userId  = req.user.user_id;
const findUser = await prisma.login.findFirst(
    {
        where:
        {
            user_user_id: userId
        }
    }
);
const login_status = await prisma.login.update(
    {
        where:
        {
            login_id: findUser.login_id
        },
        data:
        {
            login_status: 0
        }
    }
);
if(login_status)
{
    res.clearCookie("accessToken", cookieOptions);
}
return res.status(200).json(new ApiResponse(200, "Logout SuccessFully"));

}
catch(error)
{
    throw new ApiError(403, error?.message || "Error in logout");
}


});