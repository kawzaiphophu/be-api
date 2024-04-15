import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';

import { myDataSource } from './src/config/dataSource';
import UserSchema from './src/config/userSchema';
import router from './src/route/router';

dotenv.config();

const app = express();
const PORT = 3001;

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(router);

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source initialized!");
    })
    .catch((err: Error) => {
        console.error("Error initializing data source:", err);
    });

app.get('/', async (req: Request, res: Response) => {
    try {
        const userRepository = myDataSource.getRepository(UserSchema);
        const users = await userRepository.find();
        res.render('home', { users });
    } catch (error: unknown) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
