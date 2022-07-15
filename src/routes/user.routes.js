import express from "express";
import { handleLogin, handleSignup } from "../controllers/user.controller.js"
const router=express.Router();
/**
 * @openapi
 * '/api/user/signup':
 *  post:
 *     tags:
 *     - User
 *     summary: Sign Up For User
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                 type: string
 *              password:
 *                 type: string
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found      
 */
router.post('/signup',handleSignup);

/**
 * @openapi
 * '/api/user/login':
 *  post:
 *     tags:
 *     - User
 *     summary: Login For User
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                 type: string
 *              password:
 *                 type: string
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found      
 */
 router.post('/login',handleLogin);


router.all('*',(req,res)=>{
    res.status(404).json({ status:true, message:"Api Not Found"})
})

export default router;