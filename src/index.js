require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// const cors = require('./middleware/cors');
const router = require('./routes')
const { connectToDB } = require('./utils/db');

const PORT = process.env.PORT || 3000;
const app = express();

const morganLog = process.env.NODE_ENV === 'production' ? morgan('common') : morgan('dev');
app.use(morganLog);
app.use(cors());

app.use(express.json());

app.use('/api', router);

connectToDB();

app.listen(PORT, ()=>{
    console.log(`localhost server is listening on port ${PORT}!`)
});

