import { Router , Request, Response, NextFunction } from "express";
import User from "../models/user";
import bcrypt from "bcrypt"
import { invalidUserNameError, invalidJWTError } from "../error";
import jwt from "jsonwebtoken"


const secretKey = "secretkey";
const router = Router()

async function verifyUser(username: string, password: string): Promise<boolean>{
    const user = await User.findOne({username})
    if(user){
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if(passwordsMatch){
            return true
        }
    }
    return false;
}

export const authenticateMiddleware = (req:Request, res: Response, next: NextFunction) => {
    const token  = req.headers.authorization as string;
    jwt.verify(token, secretKey, async function(err, credentials){
        if(err){
            next(invalidJWTError)
            return
        }
        credentials = credentials as {username:string, password: string};
        const userVerified = await verifyUser(credentials.username, credentials.password)
        if(!userVerified){
            next(invalidUserNameError);
            return
        }
        next()
    })
}

router.post("/",async (req:Request,res: Response,next:NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;
    const userVerified = await verifyUser(username, password)
    if(!userVerified){
        next(invalidUserNameError);
        return
    }
    const token = jwt.sign({ username, password }, secretKey);
    res.send({token})
})

export default router;