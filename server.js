var express = require('express');
var app = express();



app.use('/',express.static('../todos'));


app.listen(8080,function(){
    console.log('App on 8080')
});

// Start MongoDB
var { Todo } = require("./mongodb");



// Router
app.use(function (req, res, next) {
    next();
});

require('./routes/router')(app);

const router = express.Router();


/*
app.get('/getTodos',function(req,res){
    let query = { text: { $exists: true } };
    Todo.find(query, function(err,Todo){
        if(err) return console.log(err);
        if(Todo.length == 0){
            res.send("");
        } else {
            res.send(Todo);
        }
    })
});

app.post('/',jsonParser,function(req,res){
    console.log('got post method');
    var listing = new Todo({text: req.body.todo.text, done:req.body.done})
    console.log(req.body.todo);
    console.log({text: req.body.todo, done:req.body.done});
    listing.save(function(err,listing){
        if(err) {
            res.send(err);
        } else {
            Todo.find(function(err,Todo){
                if(err) return console.log(err);
                res.send(Todo)
            });
        }
    });
});*/