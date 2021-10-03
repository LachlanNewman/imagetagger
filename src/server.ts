import express from "express"
import routes from "./routes"
import { handleErrorMiddleware } from "./error";
import path from "path"

const server = express()
server.use(express.urlencoded({extended: true}));
server.use(express.json())
server.use(express.static(path.join(__dirname, "../images")));
server.use(routes);
server.use(handleErrorMiddleware)

export default server;