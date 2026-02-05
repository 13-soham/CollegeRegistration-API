const validate = require("validator");

const validateSignup = (req)=>{
    const { name, email, password } = req.body;
    if(!name || !email || !password) throw new Error("Invalid credentials");
    if(!validate.isEmail(email)) throw new Error("Invalid credentials");
    if(!validate.isStrongPassword(password)) throw new Error("give a strong password");
}

module.exports = { validateSignup };