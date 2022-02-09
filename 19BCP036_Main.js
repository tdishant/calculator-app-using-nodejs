var express = require('express');
var fs = require('fs');
var cp = require('cookie-parser');
var app = express();

var opck = new Array(5);
var count = 0;

app.use(cp());

app.get("/",function(req, res){
    res.setHeader("Content-Type", "text/html")
    fs.readFile("19BCP036_Menu.html",function(error, data){
        res.send("Welcome to calculator app\n"+data)
    })
})

app.get("/:calculator",function(req, res){
    res.setHeader("Content-Type", "text/html")
    var calcType = req.params.calculator
    if(calcType == 'exit'){
        fs.readFile("19BCP036_Menu.html",function(error, data){
            res.send("Welcome to calculator app\n"+data)
        })
    }else{
        res.write("YOU ARE USING "+ calcType)
        fs.readFile("19BCP036_Calculator.html",function(error, data){
            res.write(data)
            res.end()
        })
    }
})

app.get("/calculator/:operation",function(req,res){
    var operation = req.params.operation;
    var num1 = Number(req.query.num_1)
    var num2 = Number(req.query.num_2)

    var ans = 0
    if(operation == 'addition'){
        ans = num1+num2; 
    }else if(operation == 'subtraction'){
        ans = num1-num2;
    }else if(operation == 'division'){
        ans = num1/num2;
    }else if(operation == 'multiplication'){
        ans = num1*num2;
    }
        opck[count%5] = ans
        count += 1
        res.cookie("opck", opck)
        res.redirect("/19BCP036_Calculator.html")
    res.end()
})

app.get("/calculator/cookies/:cookies", function(req, res){
    var cookie_op = req.params.cookies;
    var opck = req.cookies.opck
    if(cookie_op =='show_cookies'){
        res.send(opck)
    }else if(cookie_op =='delete_cookies'){
        res.clearCookie("opck")
        res.end()
    }
})

app.get("/calculator/cookies/1/exit", function(req, res){
  res.send("Byeeee")  
})

app.listen(8080)