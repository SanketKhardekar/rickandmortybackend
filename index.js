//Import Packages
import mongoose from "mongoose";
import { mongoDb } from "./src/configs/mongodb.config.js"
import express from "express";
import cors from "cors";
import compression from "compression";
import morganMiddleware from "./src/middlewares/morgan.middleware.js";
import userRoute from "./src/routes/user.routes.js";
import favouriteRoute from "./src/routes/favourite.routes.js";
import logger from "./src/utils/logger.util.js";
import swaggerDocs from "./swagger.js";
const app=express();
const PORT=5000;

//Mongo Db Connection
mongoose.connect(mongoDb.DB_URL);
mongoose.connection.on("connected", () => {
  logger.info("Mongo DB Connected");
});
// Mounting Middlewares
app.use(morganMiddleware)
app.use(compression({
    level:6,
    threshold:0,
    filter:(req,res)=>{
        if(req.header['x-no-compression'])
        {
            return false;
        }
        return compression.filter(req,res);
    }
}))
app.use(express.json())
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

//Routing
app.use('/api/user',userRoute);
app.use('/api/favourite',favouriteRoute);

//Listening To Port
app.listen(PORT,()=>{
    logger.info(`Employee Management App Running on port ${PORT}`);
    swaggerDocs(app,PORT);
})