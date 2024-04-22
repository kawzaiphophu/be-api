import express from 'express';
import path from 'path';
import { myDataSource } from './src/config/dataSource';
import router from './src/route/router';

let isConnected = false; 

async function connectDatabase() {
    try {
        if (!isConnected) {
            await myDataSource.initialize();
            console.log("Data Source Connected!");
            isConnected = true; 
        } else {
            console.log("Data Source is already connected.");
        }
    } catch (err) {
        console.error("Error Connect data source:", err);
    }
}

const app = express();
const PORT = 3001;

app.use(async (req, res, next) => {
    try {
        await connectDatabase();
        next();
    } catch (err) {
        next(err);
    }
});

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
