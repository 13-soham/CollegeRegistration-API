const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxLength : 50
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate(elem){
            if(!validator.isEmail(elem)){
                throw new Error("Pls give valid email");
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(pass){
            if(!validator.isStrongPassword(pass)){
                throw new Error("pls use a strong password");
            }
        }
    },
    rollNum : {
        type : Number,
        required : true,
        unique : true,
        min : 1000,
        max : 5000
    },
    department : {
        type : String,
        required : true,
        validate(dep){
            if(!["CSE", "AGRI", "BIO", "ECE"].includes(dep)){
                throw new Error("incorrect field selected");
            }
        }
    }
},{ timestamps : true});

const Student = mongoose.model("Student", studentSchema);
module.exports = { Student };