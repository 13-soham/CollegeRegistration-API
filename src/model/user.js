const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const validator = require("validator");

const studentSchema = mongoose.Schema({ 
    name : {
        type : String,
        required : true,
        maxLength : 30
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("email is not valid");
            }
        }
    },
    password : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true,
        validate(val){
            if(!["math", "physics", "cse"].includes(val)){
                throw new Error("subject not valid");
            }
        }
    }
 },{ timestamps : true });


studentSchema.methods.getJWT = async function (){
    const student = this;
    const token = await JWT.sign({ id : student._id}, "Secrect@123", {
        expiresIn : "5h"
    });

    return token;
}

const Student = mongoose.model("student", studentSchema);
module.exports = { Student };