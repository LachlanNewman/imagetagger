import mongoose from "mongoose";

export class DB {
    public static async initDB(url: string) {
        return mongoose.connect(url)
    }

    public static async closeCon() {
        return mongoose.connection.close(true);
    }
}