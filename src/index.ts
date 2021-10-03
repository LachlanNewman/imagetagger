import express from "express"

const server = express()
server.listen(8000, () => "Listening on port 8080")

export default server;