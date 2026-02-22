const validator = require("validator");

const validateSignup = (req)=>{
    const { name, email, password } = req.body;
    if(!name) throw new Error("pls give the name first");
    else if(!validator.isEmail(email)) throw new Error("email is not valid");
    else if(!validator.isStrongPassword(password)) throw new Error("password is not strong");
}

module.exports = { validateSignup };