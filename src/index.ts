import config from "./config";
import { DB } from "./db";
import server from "./server"
import fs from "fs"

const port = config.PORT;
const dbURL = config.DB_URL;
const imageDir = config.IMG_DIR

// check images directory exists
if (!fs.existsSync(imageDir)) {
   fs.mkdirSync(imageDir)
}

DB.initDB(dbURL)
server.listen(port, () => console.log(`Listening on port ${port}`))

export default server;