import express from "express";
import { addFavourite, deleteFavCharacter, fetchFavourites } from "../controllers/fav.controller.js";
import { ACCESS_SECERT_TOKEN } from "../configs/token.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router=express.Router();
//Authentication Function
const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    console.log(authHeader);
    const token=authHeader && authHeader.split(' ')[1];
    if(token === null)
        return res.status(401).json({ statusCode: 401, error:true, payload:{ message:"Authorization Not Found"}});
    jwt.verify(token,ACCESS_SECERT_TOKEN,(err,data)=>{
        if(err)
            return res.status(403).json({ statusCode: 403, error:true, payload:{ message:"Unauthorized Request"}})
        req.userData=data;
        next();
    })
}
/**
 * @openapi
 * '/api/favourite/':
 *  get:
 *     tags:
 *     - Favourite Character
 *     summary: Fetching Favourite Characters
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 *      401:
 *        description: Authorization Not Found
 *      403:
 *        description: Unauthorized Request
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found      
 */

 router.get('/',authenticateToken,fetchFavourites);
/**
 * @openapi
 * '/api/favourite/add':
 *  post:
 *     tags:
 *     - Favourite Character
 *     summary: Add New Favourite Character
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - favId
 *            properties:
 *              favId:
 *                type: string
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 *      401:
 *        description: Authorization Not Found
 *      403:
 *        description: Unauthorized Request
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found      
 */
 router.post('/add',authenticateToken,addFavourite);
 /**
 * @openapi
 * '/api/favourite/delete?favId=id':
 *  delete:
 *     tags:
 *     - Favourite Character
 *     summary: Delete Favourite Character
 *     parameters:
 *       - in: query
 *         name: favId
 *         type: integer
 *         required: true
 *         description: Numeric ID of the Favourite Character To Delete 
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 *      401:
 *        description: Authorization Not Found
 *      403:
 *        description: Unauthorized Request
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found      
 */
router.delete('/delete',authenticateToken,deleteFavCharacter);

router.all('*',(req,res)=>{
    res.status(404).json({ status:true, message:"Api Not Found"})
})

export default router;