// use express
const express = require('express');
const app = express();

// use mongoose and connect to mongoDb database
const mongoose = require('mongoose');
mongoose.connect('mongodb://rezaprasetya:reza123@boiler-app-shard-00-00.5wvjk.mongodb.net:27017,boiler-app-shard-00-01.5wvjk.mongodb.net:27017,boiler-app-shard-00-02.5wvjk.mongodb.net:27017/boiler?ssl=true&replicaSet=atlas-j0bq0o-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then( () => console.log('DB connected'))
                        .catch(err => console.error(err));
// route handling
app.get('/', (req,res) =>{
    res.send('hello world')
});


app.listen(5000);