import User from "../schemas/user.schema.js";
import bcrypt from "bcrypt";
import { ACCESS_SECERT_TOKEN } from "../configs/token.js"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { passwordValidator, regex } from "../utils/validator.util.js";
dotenv.config();

//Error Handling
const handlerDuplicateField = (err) => {
  let message;
  const keys = Object.keys(err.keyValue);
  if (keys.includes("email")) message = "User already exists";
  return message;
};

const handleValidationError = (err) => {
  let message;
  const key = Object.keys(err.errors);
  if (err.errors[key[0]] && err.errors[key[0]].properties) {
    message = err.errors[key[0]].properties.message;
  }
  return message;
};

export const handleSignup = async (req, res) => {
  try {
    if (!req.body.password) {
      res.status(400).json({
        statusCode: 400,
        error: true,
        payload: {
          message: "Please Provide Password",
        },
      });
      return;
    } else {
      if (!passwordValidator(req.body.password)) {
        res.status(400).json({
          statusCode: 400,
          error: true,
          payload: {
            message: "Enter Valid Password combination of alphabets, at least one special character, and at least one digit with minimum of 8 and maximum of 16 characters.",
          },
        });
        return;
      }
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user= new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });
    const result = await user.save();
    res.status(200).json({
      statusCode: 200,
      success: true,
      payload: {
        message: "Sign Up Successfull",
        userId: result._id,
      },
    });
  } catch (error) {
    let message = "Something Went Wrong";
    if (error.code === 11000) message = handlerDuplicateField(error);
    if (error.name === "ValidationError")
      message = handleValidationError(error);
    res
      .status(400)
      .json({ statusCode: 400, error: true, payload: { message: message } });
    return;
  }
};

export const handleLogin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).json({
        statusCode: 400,
        error: true,
        payload: { message: "Please Provide Email And Password" },
      });
      return;
    }
    const user = await User.findOne({
      email: req.body.email,
      status: true,
    });
    if (user === null) {
      res.status(401).json({
        statusCode: 400,
        error: true,
        payload: { message: "User Not Found" },
      });
      return;
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.status(401).json({
        statusCode: 400,
        error: true,
        payload: { message: "Incorrect Password" },
      });
      return;
    }
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const accessToken = jwt.sign(userData, ACCESS_SECERT_TOKEN);
    res
      .status(200)
      .json({
        statusCode: 200,
        success: true,
        payload: { message: "Login SuccessFull", id: user._id, accessToken },
      });
  } catch (error) {
      console.log(error);
    res.status(400).json({
      statusCode: 400,
      error: true,
      payload: { message: "Something Went Wrong" },
    });
  }
};
