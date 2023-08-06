const mongooose = require('mongoose');
const bcrypt = require('bcryptjs');

// Defining Schema
const usersSchema = new mongooose.Schema({
    firstname: {
        type:String,
        required:true
    },
    lastname : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender: {
        type:String
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    customerType:{
        type:String,
        default:"Customer"
    },
    age: {
        type:Number
    },
    password : {
        type:String,
        required:true
    },
    confirmpassword : {
        type:String
    },
    token :{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    }
})

usersSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
        this.confirmpassword = undefined;
    }
    next()
})
    


const Users = new mongooose.model("User", usersSchema);

module.exports = Users;