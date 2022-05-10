import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import {Router} from "express";

export const UserController = Router();

// Register
UserController.post('/register', async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const usernameCheck = await User.findOne({username});
        if(usernameCheck) {
            return res.status(400).send({
                msg: "Username already Exist",
                status: false
            })
        }
        const emailCheck = await User.findOne({email});
        if(emailCheck) {
            return res.status(400).json({
                msg: "Email already Exist",
                status: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        });
        delete user.password;
        return res.json({status: true, user})
    } catch(err) {
        next(err)
    }
})

//Login
UserController.post('/login', async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user) {
            return res.status(400).send({
                msg: "Username already Exist",
                status: false
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({
                msg: "Incorrect password",
                status: false
            })
        }
        delete user.password;
        return res.json({status: true, user})
    } catch(err) {
        next(err)
    }
})

