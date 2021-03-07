const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const bodyparser = require('body-parser');
const { render } = require('pug');

mongoose.connect('mongodb://localhost/Order', { useNewUrlParser: true, useUnifiedTopology: true });

const hostname = '127.0.0.1';
const port = 3000;

var orderSchema = new mongoose.Schema({
    name: String,
    password: String,    
})



var order = mongoose.model('order', orderSchema);


//Express stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//pug stuff
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
//endpoints
app.get('/', (req, res) => {
    res.render('index');
});


app.post('/', (req, res) => {
    order.findOne({ name: req.body.name, password: req.body.password }, function (err, user) {
        if (err || !user) { // "if error or no user"
            res.send("User not found.")
        } else {
            res.render('place_order');
        }
    })

});

app.get('/contactus', (req, res) => {
    res.render('contactus');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {

    var data = new order(req.body);
    //console.log(data);
    
        // if(order.findOne({name:req.body.name})){
        //     res.send("Username is taken");
        // }else{
    data.save().then(() => {
        //alert("Success");
        //res.redirect('index.pug');
        //res.send("Saved");
        res.render('index');
    }).catch(() => {
        res.send("Errror");
    });
//}

});

app.get('/place_order',(req,res)=>{
    res.render('place_order');
});
app.post('/place_order',(req,res)=>{
    var data = new order(req.body);
    
        
    data.save().then(() => {
        //alert("Success");
        //res.redirect('index.pug');
        //res.send("Saved");
        console.log(data);
        res.render('index.pug');
    }).catch(() => {
        res.send("Errror");
    });

});
//server start
app.listen(port, () => {
    console.log(`app started at ${port}`);
});


