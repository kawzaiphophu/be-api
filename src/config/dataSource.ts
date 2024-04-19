import { DataSource } from "typeorm";
import UserSchema from "./userSchema";
require('dotenv').config();

const myDataSource: DataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [UserSchema],
    synchronize: true,
    ssl: {
        rejectUnauthorized: false,
    },
});

export { myDataSource };
