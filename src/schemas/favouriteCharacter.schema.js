import mongoose from "mongoose";
const favoutiteCharacterSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "Please Provide Manager Id"]
    },
    id:{
        type:Number,
        required:[true,'Please Provide Favoutite Charater Id'],
    },
    name:{
        type:String,
        required:[true,'Please Provide Favoutite Charater Name'],
    },
    origin:{
        type:String,
        required:[true,'Please Provide Favoutite Charater Origin'],
    },
    image:{
        type:String,
        required:[true,'Please Provide Favoutite Charater Image Url'],
    },
    status:{
        type:String,
        required:[true,'Please Provide Favoutite Charater Status'],
    },
    species:{
        type:String,
        required:[true,'Please Provide Favoutite Charater Species'],
    },
    gender:{
        type:String,
        required:[true,'Please Provide Favoutite Charater Gender'],
    },
    location:{
        type:String,
        required:[true,'Please Provide Favoutite Charater Location'],
    },
    active:{
        type:Boolean,
        default:true,
    }
},{
    timestamps: true,
})

const favChar= mongoose.model('favouriteCharacter',favoutiteCharacterSchema);

export default favChar