//jshint esversion:6

const { request, response } = require("express");
const express = require("express");

const app = express();

app.get( "/", function(request, response){
    response.send("<h1>Hello World</h1>");
});

app.get("/about", function(request,response){
    response.send("Hey! My name is Seif");
});

app.get("/hobbies", function(request,response){
    response.send("Soccer");
});

app.listen(3000, function(){
    console.log("Server has started pussy!");
});