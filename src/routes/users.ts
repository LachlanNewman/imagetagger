import { Router , Request, Response, NextFunction } from "express";
import User from "../models/user";

const router = Router()

router.post("/", async (req:Request,res: Response,next:NextFunction) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = new User({username, password});
        await user.save()
        res.statusCode = 201;
        res.send({username})
})

export default router;