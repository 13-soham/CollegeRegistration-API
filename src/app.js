const express = require("express");
const app = express();
const { connectDb } = require("./config/database");
const { Student } = require("./model/student");
const { validateSignup } = require("./helper/validate");
const bcrypt = require("bcrypt");
const port = 5000;


// middleware to parse json
app.use(express.json());


// student signup
app.post("/signup", async (req, res) => {
    const { name, email, password, rollNum, department } = req.body;
    try {
        // validate student
        validateSignup(req);

        // secure password
        const hashPassword = await bcrypt.hash(password, 10);

        // create student instance
        const student = await Student.create({
            name,
            email,
            password: hashPassword,
            rollNum,
            department
        });

        res.status(201).json({
            message: "student logged succesfull",
            user: student
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
});


// student login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student.findOne({ email: email });
        if (!student) {
            throw new Error("Invaild Email");
        }

        const correct = await bcrypt.compare(password, student.password);
        if (!correct) {
            throw new Error("Invalid Password");
        }
        else {
            res.json({
                message: "student logged successfully"
            });
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
});


// admin view all students
app.get("/admin/getAllStudents", async (req, res) => {
    try {
        const allStudents = await Student.find({});
        res.json({
            list: allStudents
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
});


// admin update Studets via studentId
app.patch("/admin/update/:id", async (req, res) => {
    const studentId = req.params.id;
    try {
        const allowUpdate = ["name", "rollNum", "department"];
        const isAllow = Object.keys(req.body).every((val) => allowUpdate.includes(val));

        if (!isAllow) {
            throw new Error("This field cannot updated");
        }

        const updateStudent = await Student.findByIdAndUpdate(
            {
                _id: studentId
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.json({
            message: updateStudent
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
});


// admin delete Students via emailId
app.delete("/admin/student", async (req, res) => {
    const oldEmail = req.body.email;
    try {
        await Student.findOneAndDelete({
            email : oldEmail
        },
        req.body
        ,{
            new : true,
            runValidators : true
        });

        res.json({
            message : "user deleted succesfully"
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
});


connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`app listen in port ${port}`);
        })
    })
    .catch((err) => {
        console.error(err.message);
    })