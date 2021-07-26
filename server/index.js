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
// Use auth
const {auth} = require('./middleware/auth');
// use mongoose and connect to mongoDb database
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}).then( () => console.log('DB connected'))
                        .catch(err => console.error(err));

// bring google parser use body and cookie parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api/users/auth', auth, (req, res) =>{
    res.status(200).json({
        _id:req._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname:req.user.lastname,
        role:req.user.role    
    })
})




app.post('/api/users/register', (req,res) =>{
    const user = new User(req.body);

    user.save((err, doc) =>{
        if(err) {
            return res.json({success: false, err})
        }
        return res.status(200).json({success: true, userData: doc})
    })
})

// for login
app.post('/api/users/login', (req, res) =>{
    // find the email
    User.findOne({ email: req.body.email }, (err, user) =>{
        if(!user)
        return res.json({
            loginSuccess: false,
            message: "Auth failed, email not found"
        });

    // compare password
    user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch){
            return res.json({ loginSuccess: false, message: "wrong password" })
        }
    })
    // general token
    user.generateToken((err, user) =>{
        if(err) return res.status(400).send(err);
        res.cookie('x_auth', user.token)
            .status(200)
            .json({
                loginSuccess: true
            })
    })
    })


})

// for logout
app.get('/api/users/logout', auth, (req,res)=>{
    User.findOneAndUpdate({_id:req.user._id}, {token:''}, (err, doc) =>{
        if(err) return res.json({success: false, err})
        return res.status(200).send({
            success:true
        })
    })
})

// route handling
app.get('/', (req,res) =>{
    res.json('hello reza agung prasetya')
});

// for heroku
const port = process.env.PORT || 5000

app.listen(port, ()=> {
    console.log(`Server Running at ${port}`)
});