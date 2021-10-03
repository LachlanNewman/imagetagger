import express from "express"
import config from "./config";
import routes from "./routes"

const server = express()
const port = config.PORT;

server.use(routes);
server.listen(port, () => console.log(`Listening on port ${port}`))

export default server;