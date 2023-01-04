import express from 'express';
import morgan from 'morgan';

import {data} from './data.js';
import { timeLogger } from './middleware/timeLogger.js';

const app = express();
app.use(morgan('dev'));
app.use(timeLogger);

app.get('/api/products', (req, res) => {
    res.send(data.products)
});

export {app}