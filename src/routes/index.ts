import { Router } from 'express';
import imageRouter from "./images"
import tagRouter from "./tags"

const routes = Router();
routes.use('/images',imageRouter);
routes.use('/tags',tagRouter);

export default routes;