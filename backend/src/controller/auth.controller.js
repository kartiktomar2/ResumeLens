import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { BlacklistToken } from "../models/blacklist.model.js";




/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @description expects data and register a user 
 */


const registerUser = asyncHandler(async (req, res) => {
    //  register a user
    // take username, email and password 
    // check if user have entered it correctly
    // check if a user with this email or username already exist or not 
    // if yes then throw error and if not then create and save the user in db 

    const { username, email, password } = req.body
    if ([username, email, password].some(element => !element || element?.trim() === "")) {
        throw new ApiError(400, 'provide email, username and password')
    }

    //validate email
    if (!email.includes("@")) {
        throw new ApiError(400, "Invalid email")
    }


    // finding existing user
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        let errorMessage = (existingUser?.username === username) ? "A user with this username already exist" : (existingUser?.email === email) ? "A User with this email already exist" : "This user already exist "
        throw new ApiError(400, errorMessage)
    }

    const user = await User.create({
        username,
        email,
        password
    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    )

    const options = {
        httpOnly: true
    }

    res
        .status(201)
        .cookie("token", token, options)
        .json(new ApiResponse(
            "User created successfully",
            201,
            {
                id: user._id,
                username,
                email
            }
        ))
    //  res.cookie tell Express to send a Set-Cookie header in the HTTP response, now browser receives that response and store the cookies in the browser. 
})

/**
 *  @param {*} req 
 * @param {*} res 
 * @description expects  email and password and then login a user 
 */
const loginUser = asyncHandler(async (req, res) => {
    //  take imput(email and password) from req.body
    // validate the input 
    // find if user with this email exist or not, if not throw error 
    // if user exist then validate password 
    // if password is correct then login the user 
    const { email, password } = req.body

    if ([email, password].some(field => !field || field?.trim() === "")) {
        throw new ApiError(400, "all field are required");
    }
    if (!email.includes("@")) {
        throw new ApiError(400, "Invalid Email");
    }

    const user = await User.findOne({ email });
    // The general rule to remember
    // Whenever you write:
    //const result = await somePromise;
    // there are only two possibilities:
    // If somePromise fulfills, result gets the fulfilled value and execution continues.
    // If somePromise rejects, await throws the rejection reason as an exception at that line.If you don't catch that exception inside the async function, JavaScript automatically rejects the Promise returned by the async function.

    if (!user) {
        throw new ApiError(404, "This User does not exist")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid User credentials")
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }

    )

    const options = {
        httpOnly: true
    }

    res
        .status(200)
        .cookie("token", token, options)
        .json(new ApiResponse(
            "user logged in successfully",
            200,
            {
                id: user._id,
                username: user.username,
                email: user.email,

            }

        ))
})


//blacklisting token can be implemented by maintaining a list of blacklisted tokens in the database and checking against that list during authentication. When a user logs out, their token can be added to the blacklist, preventing it from being used for future authentication. Moreover jwt add ist when generating token two token can't be same. 

/**
 * 
 *  @param {*} req 
 * @param {*} res 
 * @description clear token from browser and add token to blacklist 
 */
const logoutUser = asyncHandler(async (req, res) => {
    const { user } = req;
    const token = req.cookies.token;
    

    // adding token in the blacklist
    await BlacklistToken.create({
        token: token
    })

    const options = {
        httpOnly: true
    }

    res
        .status(200)
        .clearCookie("token",options)
        .json(new ApiResponse(
               "User logged out successfully",
               200,
               {
                  username:user.username
               }
        ))
})


const currentUser= asyncHandler(async(req,res)=>{
       const {user}= req

       res
       .status(200)
       .json(new ApiResponse(
           "current loggedin user",
           200,
           {
              name: user.username,
              email:user.email
           }
       ))
})

export { registerUser, loginUser, logoutUser, currentUser }
