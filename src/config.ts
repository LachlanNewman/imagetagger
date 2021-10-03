import * as dotenv from "dotenv";

interface IConfig extends dotenv.DotenvParseOutput{
    PORT: string;
    DB_URL: string;
}

const config = dotenv.config()
if (config.error) {
    throw config.error
}

export default config.parsed as IConfig 