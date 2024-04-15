import { DataSource } from "typeorm";
import UserSchema from "./userSchema";

const myDataSource: DataSource = new DataSource({
    type: "postgres",
    host: "dpg-codpsr0l5elc73fsirug-a.singapore-postgres.render.com",
    port: 5432,
    username: "db_spjb_user",
    password: "5LcCZ6DwPYYsZIeOiCARnwM80gqnYFrW",
    database: "be-api",
    entities: [UserSchema],
    synchronize: true,
    ssl: {
        rejectUnauthorized: false,
    },
});

export { myDataSource };
