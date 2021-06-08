const express = require('express');
const cors = express('cors');
// const cors = require('./middleware/cors');

const app = express();

app.use(express.json());

const router = express.Router();

app.use(cors);

app.use(router);

app.listen(3000, ()=>{
    console.log('localhost server is listening on port 3000!')
});

