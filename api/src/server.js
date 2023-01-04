import mongoose from 'mongoose';

import {app} from './app.js';

mongoose.connection.on('error', err => {
    console.log('MongoDB connection error: ', err);
});

mongoose.connection.once('open', () => {
    console.log('MongoDB successfully connected...');
    const PORT = process.env.PORT || 5577;
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL);