const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'smart-brain'
  }
});


const app = express();


app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id : '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id : '124',
			name: 'Sally',
			password: 'bananas',
			email: 'sally@gmail.com',
			entries: 0,
			joined: new Date()
		},
	],
	logins: [
		{
			id: '987',
			hash: '',
			email: 'john@gmail.com'
		}
	]
}


app.get('/', (req, res) =>{
	res.send(database.users);
})

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.hadleImage(req, res, db)})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

 
app.listen(3000, () =>{
	console.log('app is running on port 3000.');
})