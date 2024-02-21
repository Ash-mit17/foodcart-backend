import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResonse from "../utils/ApiResponse.js";
import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, location } = req.body;

    if ([name, email, password, location].some((field) => {
        field?.trim === ""
    })) {
        throw new ApiError(400, "All fields are required");
    }
    User.findOne({ email }).then((user) => {
        if (user) {
            throw new ApiError(409, "User already exists with same email");
        }
    })

    const salt = await bcrypt.genSalt(10);
    const securepass = await bcrypt.hash(password, salt);

    await User.create({
        name,
        email,
        password: securepass,
        location
    })

    res.status(201).json(new ApiResonse(201, "User created successfully", name));
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    let validuser = await User.findOne({ email: email });

    if (!validuser) {
        throw new ApiError(400, "Try with a valid credentials email not found");
    }
    const comparepass = await bcrypt.compare(password, validuser.password);
    if (!comparepass) {
        throw new ApiError(400, "Try with a valid credentials");
    }
    const data = {
        user: {
            id: validuser._id
        }
    }
    const authToken = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
    return res.status(201).json(new ApiResonse(201, "User created successfully", { username: validuser.name, authToken: authToken, email: validuser.email }));
})

export { loginUser, registerUser };