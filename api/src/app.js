import express from 'express';

import {data} from './data.js';

const app = express();

app.get('/api/products', (req, res) => {
    res.send(data.products)
});

export {app}