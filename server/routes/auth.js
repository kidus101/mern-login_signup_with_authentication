const express = require("express")
const router = express.Router()

const { User } = require("../models/user")
const bcrypt = require("bcrypt")
const Joi = require("joi")

router.post("/" , async (req , res)=> {
    try {
        const {  error } = validate(req.body)

        //If there is an Error then Display the Error Message
        if (error){
            res.status(400).dend({ message : error.details[0].message })
        }

        // Check If there is a corrosponding email to that user's email used whilst Logging in
        const user = await User.findOne({ email : req.body.email })

        // If there is No user by that email
        if (!user){
            res.status(401).send( { message : " Invalid Email Or password " })
        }

        // Comparing the password in the database and the password the user typed in
        const validPassword = await bcrypt.compare( 
            req.body.password , user.password
        )

        // If the password is not the same as the database one 
        if (!validPassword){
            res.status(401).send( { message : " Invalid Email or password"} )
        }

        // Generating a token for the user and sending it
        const token = user.generateAuthToken();
        res.status(200).send( { data : token , message: " Logged in Successfully "} )

    } catch (error) {
        res.status(500).send({ message : "Internal Server Error"  })
    }

    const validate = (data) => {
        const schema = Joi.object({
            email : Joi.string().email().required().label("Email"),
            password : Joi.string().required().label("Password")
        })

        return schema.validate(data)
    }

})

module.exports = route