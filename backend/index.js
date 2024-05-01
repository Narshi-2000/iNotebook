const connectToMongo =require('./db');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env.local') });
const express =require('express');
var cors = require('cors');

connectToMongo();
const app =express();
const port= 5000;

//middleware
app.use(cors());
app.use(express.json());

// all the routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, ()=>{
    console.log(`iNotebook app listening at http://localhost:${port}`)
})
