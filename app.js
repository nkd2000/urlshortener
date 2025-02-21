require('dotenv').config();
const express = require('express');
const cors = require('cors');
const URL = require('url').URL;
const dns = require('dns')
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/public',express.static(`${process.cwd()}/public`));

let user_url = '/';
let valid_url = false;
let urlId = 0;
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/view/index.html');
});

app.post('/api/shorturl',(req,res)=>{
    user_url = req.body.userUrl;
    if(!user_url) return res.json({error:'invalid url'});

    try {
        const hostname = new URL(user_url).hostname;
        dns.lookup(hostname, (err)=>{
            if(err) return res.json({error:'invalid url'});
            urlId = Math.round(Math.random()*1000);
            res.json({original_url:user_url,short_url:urlId});
            valid_url = true;
        });
    } catch (error) {
        return res.json({error:'invalid url'});
    }

   
});

app.get('/api/shorturl/:urlId',(req,res)=>{
    if(valid_url) return res.redirect(user_url);
    else return res.json({error:'invalid url'});
});

const listner = app.listen(process.env.PORT || 5000, ()=>{console.log(`App is listening on port ${listner.address().port}`)});