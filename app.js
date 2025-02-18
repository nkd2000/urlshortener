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

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/view/index.html');
});

app.post('/api/shorturl',(req,res)=>{
    user_url = req.body.userUrl;
    if(!user_url) return res.status(400).json({error:'invalid url'});

    try {
        const hostname = new URL(user_url).hostname;
        dns.lookup(hostname, (err)=>{
            if(err) return res.status(400).json({error:'invalid url'});
            res.json({original_url:user_url,short_url:1});
            valid_url = true;
        });
    } catch (error) {
        return res.status(400).json({error:'invalid url'});
    }

   
});

app.get('/api/shorturl/1',(req,res)=>{
    if(valid_url) res.redirect(user_url);
    else res.redirect('/');
});

const listner = app.listen(process.env.PORT || 5000, ()=>{console.log(`App is listening on port ${listner.address().port}`)});