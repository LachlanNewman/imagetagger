import express from "express"
import config from "./config";

const server = express()
const port = config.PORT;
console.log(port)

server.listen(port, () => console.log(`Listening on port ${port}`))

export default server;