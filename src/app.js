const express = require("express");
const { connectDb } = require("./config/database");
const { Student } = require("./model/user");
const { validateSignup } = require("./helper/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { handleAuth } = require("./middleware/auth");
const app = express();
const port = 5000;


// middleware
app.use(express.json());
app.use(cookieParser());


// signup
app.post("/signup", async (req, res)=>{
    const { name, email, password, subject } = req.body;
    try {
        // validaton of data
        validateSignup(req);

        // check user is already exist or not

        // encrypt the password
        const hashPassword = await bcrypt.hash(password, 10);

        // create new user instance
        const newStudent = await Student.create({
            name, email, subject,
            password : hashPassword
        });
        
        res.status(201).json({
            message : "user is created",
            student : newStudent
        });

    } catch (err) {
        res.status(400).json({
            message : err.message
        })
    }
});


// login
app.post("/login", async (req, res)=>{
    const { email, password } = req.body;
    try {
        // check student is valid or not
        const student = await Student.findOne({ email : email});
        if(!student){
            throw new Error("student did not exist");
        }

        // compare the password
        const validPassword = await bcrypt.compare(password, student.password);
        if(!validPassword) throw new Error("password is not valid");
        if(validPassword){
            // create jwt
            const token = await student.getJWT();

            // added this token to cookie and send back to the server
            res.cookie("token", token, {
                expires : new Date(Date.now() + 5*3600000)
            });

            res.json({
                message : "login successful"
            });
        }

    } catch (err) {
         res.status(500).json({
            message : err.message
        })
    }
});


// getProfile
app.get("/profile", handleAuth , async (req, res)=>{
    try {
        const student = req.student;
        res.json({
            student : student
        });
    } catch (err) {
        res.status(404).json({
            message : err.message
        });
    }
});


connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`app listen in port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err.message);
    })