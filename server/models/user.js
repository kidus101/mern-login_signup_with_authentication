const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const joi = require("joi")
const passwordComplexity = require("joi-password-complexity")

const userSchema = new mongoose.Schema({
    firstname:{ type:String , required:true
    },
    lastname: { type:String , required:true
    },
    email : { type : String , required : true },
    password : { type : String , required : true }
})

// defining a new method named generateAuthToken that can be called on instances of the userSchema.
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id} , process.env.JWTPRIVATEKEY , { expiresIn : "7d" })
    return token;
}

const User = mongoose.model("user" , userSchema)

//Validation
const validate = (data) => {
    const Schema = joi.object({
        firstName : joi.string().required().label("First Name"),
        lastName : joi.string().required().label("Last Name"),
        email : joi.string().required().label("Email"),
        password : passwordComplexity().required().label("Password")
    });

    return Schema.validate(data)
}

module.exports = {User , validate}









