const express = require('express');
const app = express();
const bodyParser =  require('body-parser');
const cookieParser = require('cookie-parser')
const mongooose =  require('mongoose');

const mongoUri = 'mongodb+srv://admin:oJmb6n30atusa7Lq@cluster0.b0reb63.mongodb.net/auth?retryWrites=true&w=majority&appName=Cluster0';
mongooose.connect(mongoUri);

/// MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser())

/// MODELS
const { User } = require('./models/user');

// ROUTES
app.post('/api/user',async(req,res)=>{
    try {
        const user = new User({
            email:req.body.email,
            password:req.body.password
        });
        let doc = await user.save()
        res.status(200).send(doc)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.post('/api/user/login',async(req,res)=>{
    try {
         // 1 - find the user,if good, -> move forward
         let user = await User.findOne({'email': req.body.email});
         if(!user) throw 'User not found';

        // 2 - compare the password with the HASHED password on the DB, -> move forward
        user.comparePassword(req.body.password,(err, isMatch)=>{
            if(err) throw 'Bad password';
            if(!isMatch) return res.status(400).json({
                message:'Bad password'
            })

             // 3 - send response
            user.generateToken((err,user)=>{
                if(err) throw err;
                res.cookie('auth',user.token).send('ok')
            })
        })
    } catch (error) {
        res.json({message:error})
    }
})


app.get('/api/books',(req,res)=>{
    let token =  req.cookies.auth;

    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.status(401).send({message:'Bad token'});
        res.status(200).send(user)
    })

})



const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Started on port ${port}`)
});