// use express
const express = require('express');
const app = express();

// Use bodyParser
const bodyParser = require('body-parser');

// Use cookieParser
const cookieParser = require('cookie-parser');

const config = require('./config/key')

// Use User
const { User } = require('./models/user');

// use mongoose and connect to mongoDb database
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}).then( () => console.log('DB connected'))
                        .catch(err => console.error(err));

// bring google parser use body and cookie parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/users/register', (req,res) =>{
    const user = new User(req.body)

    user.save((err, userData) =>{
        if(err) {
            return res.json({success: false, err})
        }
        return res.status(200).json({success: true})
    })
})

// route handling
app.get('/', (req,res) =>{
    res.json('hello reza agung prasetya')
});


app.listen(5000);