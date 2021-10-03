import { Router } from 'express';
import imageRouter from "./images"

const routes = Router();
routes.use('/images',imageRouter);

export default routes;