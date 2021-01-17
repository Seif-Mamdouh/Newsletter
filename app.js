//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");

const app = express();

app.use(express.static('public/retarted'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const first = req.body.fName;
    const last = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [ {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: first, 
                LNAME: last
            }

        }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/2d185b4c54";

    const options = {
        method: "POST",
        auth: "Seif-Mamdouh:6e93ca3ae841bf11704ca3d1b2cfe060-us7"
    };

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    if (res.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
    }

    request.write(jsonData);
    request.end();
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

app.post("/failure", function(request, response){
    response.redirect("/");
});

app.post("/success", function(request, response){
    response.redirect("/");
});

//API KEY
//6e93ca3ae841bf11704ca3d1b2cfe060-us7

//AudienceID
//2d185b4c54