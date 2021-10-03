import express from "express"
import config from "./config";
import { DB } from "./db";
import routes from "./routes"

const port = config.PORT;
const dbURL = config.DB_URL;

DB.initDB(dbURL)

const server = express()
server.use(express.urlencoded({extended: true}));
server.use(express.json())
server.use(routes);
server.listen(port, () => console.log(`Listening on port ${port}`))

export default server;