import * as dotenv from "dotenv";

interface IConfig extends dotenv.DotenvParseOutput{
    PORT: string;
}

const config = dotenv.config()
if (config.error) {
    throw config.error
}

export default config.parsed as IConfig 