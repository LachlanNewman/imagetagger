import { Router , Request, Response, NextFunction } from "express";
import User from "../models/user";
import bcrypt from "bcrypt"

const router = Router()

router.post("/", async (req:Request,res: Response,next:NextFunction) => {
    const saltRounds = 10;
    const username = req.body.username;
    let password = req.body.password;
    password = await bcrypt.hash(password, saltRounds);
    const user = new User({username, password});
    await user.save()
    res.send({username: user.username})
})

export default router;