import { Router } from 'express';
import imageRouter from "./images"
import tagRouter from "./tags"
import userRouter from "./users"
import authRouter, {authenticateMiddleware} from './auth';

const routes = Router();

routes.use('/images',authenticateMiddleware,imageRouter);
routes.use('/tags'  ,authenticateMiddleware,tagRouter);
routes.use("/users" ,userRouter)
routes.use("/auth"  ,authRouter)

export default routes;