import express from 'express';
import path from 'path';
import { myDataSource } from './src/config/dataSource';
import router from './src/route/router';

async function connectDatabase() {
    try {
        await myDataSource.initialize();
        console.log("Data Source Connected!");
    } catch (err) {
        console.error("Error Connect data source:", err);
    }
}
connectDatabase();

const app = express();
const PORT = 3001;

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
