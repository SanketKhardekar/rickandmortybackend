import mongoose from "mongoose";
const regex = {
    email:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
    name: /^[a-z A-Z]{2,30}/,
};

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Please Provide Manager First Name"],
        validate:{
            validator: firstName => regex.name.test(firstName),
            message: props=> `(${props.value}) Enter Valid First Name having min 2 and max 30 alphabets`
        }
    },
    lastName:{
        type:String,
        required:[true,"Please Provide Manager Last Name"],
        validate:{
            validator: lastName => regex.name.test(lastName),
            message: props=> `(${props.value}) Enter Valid Last Name having min 2 and max 30 alphabets`
        }
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Please Provide Manager Email'],
        validate:{
            validator: email => regex.email.test(email),
            message: props => `${props.value} is not valid email check again`,
        }
    },
    password:{
        type:String,
        required:[true,'Please Provide Password']
    },
    status:{
        type:Boolean,
        default:true,
    }
},{
    timestamps: true,
})

const user= mongoose.model('users',userSchema);

export default user