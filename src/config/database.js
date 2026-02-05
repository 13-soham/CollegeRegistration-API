const mongoose = require("mongoose");

const connectDb = async ()=>{
    mongoose.connect("mongodb+srv://NamasteNodeJs:TyC04SJFdhZfxH6Z@namastenodejs.exkc5xt.mongodb.net/college");
    console.log("database is connected");
}

module.exports = { connectDb };