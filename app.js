require('dotenv').config();
const express = require('express');
const cors = require('cors');
const URL = require('url').URL;
const dns = require('dns')
const bodyParser = require('body-parser');

const app = express();
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

let user_url = 'https://www.google.comsss';

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/view/index.html');
});

app.post('/api/shorturl',(req,res)=>{
    user_url = req.body.userUrl;
    console.log(user_url);
    if(!user_url) return res.status(400).json({error:'invalid url 1'});

    try {
        const hostname = new URL(user_url).hostname;
        dns.lookup(hostname, (err)=>{
            if(err) return res.status(400).json({error:'invalid url 2'});
            res.json({original_url:user_url,short_url:1});
        });
    } catch (error) {
        return res.status(400).json({error:'invalid url catch'});
    }

   
});

app.get('/api/shorted-url',(req,res)=>{
    res.redirect(user_url);
});

const listner = app.listen(process.env.PORT || 5000, ()=>{console.log(`App is listening on port ${listner.address().port}`)});