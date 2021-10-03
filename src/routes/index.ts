import { Router } from 'express';
import imageRouter from "./images"
import tagRouter from "./tags"
import userRouter from "./users"

const routes = Router();
routes.use('/images',imageRouter);
routes.use('/tags',tagRouter);
routes.use("/users", userRouter)

export default routes;