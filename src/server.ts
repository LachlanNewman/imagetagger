import express from "express"
import routes from "./routes"
import { handleErrorMiddleware, limiter } from "./middleware";
import path from "path"

const server = express()
server.use(express.urlencoded({extended: true}));
server.use(express.json())
server.use(express.static(path.join(__dirname, "../images")));
server.use(handleErrorMiddleware)
server.use(limiter);
server.use(routes);

export default server;