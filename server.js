const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrpyt = require('bcryptjs')
const register = require("./controllers/register")
const signin = require("./controllers/signin")
const image = require("./controllers/image")
const profile = require("./controllers/profile")

// const { response } = require('express');
const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '12345',
      database : 'facerecognition'
    }
});

// db.select('*').from('users');

// const database = {
//     users: [{
//         id: '123',
//         name: '',
//         email: ''
//     }
//     ]
// }

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.get('/', (req,res) => {
    console.log('this is working')
    res.json(database.users)
});
app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrpyt)})
app.post('/register', (req,res) => {register.handleRegister(req,res, db, bcrpyt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res,)})

app.listen(3000, ()=> {
    console.log('app is working')
});