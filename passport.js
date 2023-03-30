const express = require("express");
const app = express()
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const database = {username: 'Sarah', password:'123456'};
app.use(bodyParser.json());

app.post('/log-in', (req, res, next) => {
    const { username } = body;
    const { password } = body;
    if (username === database.username && password === database.password) {
      jwt.sign(
          { username }, (err, token) => {
          res.json({ username, password, message: 'You are successfully loged in!', token });
        }
      );
    }
    else{
        console.log('Sorry, you are failed.');
    }
})

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        res.sendStatus(403).json({ message: 'Invalid credentials' });
    }
}