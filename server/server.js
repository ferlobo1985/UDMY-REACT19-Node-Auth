const express = require('express');
const app = express();
const bodyParser =  require('body-parser');
const mongooose =  require('mongoose');

const mongoUri = 'mongodb+srv://admin:oJmb6n30atusa7Lq@cluster0.b0reb63.mongodb.net/auth?retryWrites=true&w=majority&appName=Cluster0';
mongooose.connect(mongoUri);

/// MIDDLEWARE
app.use(bodyParser.json());

/// MODELS
const { User } = require('./models/user');

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Started on port ${port}`)
});