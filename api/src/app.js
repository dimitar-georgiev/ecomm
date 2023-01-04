import express from 'express';
import morgan from 'morgan';

import {data} from './data.js';

const app = express();
app.use(morgan('dev'));

app.get('/api/products', (req, res) => {
    res.send(data.products)
});

export {app}