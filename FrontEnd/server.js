const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('signup')
  res.send('Hey!');
});

app.post('/signup', (req, res) => {
  console.log('signup')
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let role = req.body.email;
  console.log(username, password, email, role);
  res.send(`Username: ${username} Password: ${password}`);
  res.send(`User with username : ${username} has been registered`)
});

app.post('/login', (req, res) => {
  console.log('login')
  let email = req.body.email;
  let password = req.body.password;
  console.log(password, email);
  if(email === 'anuj@gmail.com' & password === 'Anuj@1998'){
    res.send('valid');
  }else{
    res.send('invalid');
  }
  
});

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});