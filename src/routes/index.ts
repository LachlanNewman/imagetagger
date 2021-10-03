import { Router } from 'express';
import imageRouter from "./images"
import tagRouter from "./tags"
import userRouter from "./users"
import authRouter from './auth';

const routes = Router();
routes.use('/images',imageRouter);
routes.use('/tags',tagRouter);
routes.use("/users", userRouter)
routes.use("/auth", authRouter)

export default routes;