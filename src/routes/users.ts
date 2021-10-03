import { Router , Request, Response, NextFunction } from "express";
import User from "../models/user";
import bcrypt from "bcrypt"
import { HttpError, invalidPasswordError, userNameRequiredError } from "../error";

const router = Router()

function validPassWord(password: string){
    return password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
}

router.post("/", async (req:Request,res: Response,next:NextFunction) => {
    const saltRounds = 10;
    const username = req.body.username;
    let password = req.body.password;

    if(!username){
        next(userNameRequiredError)
    }

    if(!validPassWord(password)){
        next(invalidPasswordError)
    }

    password = await bcrypt.hash(password, saltRounds);
    const user = new User({username, password});

    user.save()
    .then(() => res.send({username: user.username}))
    .catch((err: HttpError) => next(err))
})

export default router;