require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html');
});

app.post('/api/shorturl',(req,res)=>{
    res.json({original_url:user_url, short_url:shorted_url});
});

//