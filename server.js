const express = require('express');
const app = express();
const port = 3000;
const mongoDBClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

let BudgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    }
});

let Budget = mongoose.model('Budget', BudgetSchema);


app.use('/', express.static('public'));
app.use(express.json());

const budget = require('./budgetData.json')

let url = 'mongodb://localhost:27017/mongodb_demo';

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.post('/budget', (req, res) => {
    mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology: true}, (operationError, dbHandler)=>{
        if(operationError){
            console.log("An error has occured during the connection process");
        } else {
            console.log("Connected to the database");
            Budget.create(req.body).then((data) => {
                res.json(data);
                mongoose.connection.close();
            })
            .catch((connectionError) => {
                console.log(connectionError)
            });
        }
    })
    
});

app.get('/budget', (req, res) => {
    mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology: true}, (operationError, dbHandler)=>{
        if(operationError){
            console.log("An error has occured during the connection process");
        } else {
            console.log("Connected to the database");
            Budget.find({}).then((data) => {
                res.json(data);
                mongoose.connection.close();
            })
            .catch((connectionError) => {
                console.log(connectionError)
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

