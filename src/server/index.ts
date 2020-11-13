import express from 'express';
import apiRouter from './routes/index';

const app: express.Application = express();

app.use(apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
