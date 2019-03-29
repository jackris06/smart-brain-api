const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

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

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user =>{
		if(user.id === id){
			found = true;
			return res.json(user);
		}
	})
	if(!found){
		res.status(404).json('user not found');
	} 
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id){
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if(!found){
		res.status(400).json('User not found');
	}
})


app.post('/signin', (req, res) => {
/*	bcrypt.compare("cookies", '$2a$10$HYnXfeXXBSzRh3qXGDUP4O3IEjRPSQK3KRRFC5IpqhsNMr58oRAXO', function(err, res) {
	    console.log('first guess', res);
	});
	bcrypt.compare("veggies", '$2a$10$HYnXfeXXBSzRh3qXGDUP4O3IEjRPSQK3KRRFC5IpqhsNMr58oRAXO', function(err, res) {
	    console.log('second guess', res);
	});	*/
	if(req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password){
		res.json(database.users[0]);
	}
	else{
		res.status(400).json('Error loggin in');
	}
})

app.post('/register', (req, res) =>{
	const { email, password, name } = req.body;
/*	bcrypt.hash(password, null, null, function(err, hash) {
    	console.log(hash);
	});*/
	database.users.push({
			id : '125',
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()		
	})
	res.json(database.users[database.users.length-1]);
})


app.listen(3000, () =>{
	console.log('app is running on port 3000.');
})

/*

// Load hash from your password DB.
*/


/*
/ ---> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user 
*/

//$2a$10$WM//6okdPRXedI6lYvX7/OoSNg9hi7qF2L1vTrAp3/ojiSk.aD9n6