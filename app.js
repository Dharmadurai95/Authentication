const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');




const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
console.log (md5('12345678909876'));

mongoose.connect("mongodb://localhost:3003/Authenticate", { useNewUrlParser: true ,useUnifiedTopology: true });

const secretSchema = new mongoose.Schema({
    email:String,
    password:String
});

const User = new mongoose.model('User',secretSchema);


app.get("/",(req,res)=> {
    res.render('home')
});

app.get("/login",(req,res)=> {
    res.render('login')
});

app.get('/register',(req,res)=> {
    res.render('register')
});
///first time login mehtod in register form
app.post("/register",(req,res)=> {
   const newUser = new User ({
       email:(req.body.username),
       password:(req.body.password)
   });

   newUser.save((err)=> {
       if(err) {
           console.log(err)
       }
       else {
           res.render("secret")
       };
   });
});

//once register then you login the method

app.post("/login",(req,res)=> {
    const username = req.body.username;
    const password = md5(req.body.password);

    User.findOne({email:username},(err,youHaveAcc)=> {
        if(err) {
            console.log(err)
        }
        else {
            if(youHaveAcc) {
                if(youHaveAcc.password == password) {
                    res.render("secret");
                }
            }
        }
    });
});



app.listen(3000,()=> {
    console.log('success fully port');
});
 