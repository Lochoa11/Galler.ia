
const request = require('../../node_modules/supertest-as-promised');


// home GET test
describe('home page', () => {
  it('GET test', () => {
    return request('http://localhost:8000').get('/')
    	.expect(200);
  });
});

// login page GET test
describe('login page', () => {
	it('GET test', () => {
		return request('http://localhost:8000').get('/login')
		.expect(200);
	});
});

// login page POST test
describe('login page', () => {
	let exampleUser = {
		firstName: 'asdf',
		lastName: 'asdf',
		email: 'asdf@asdf.com',
		password: 'asdf'
	};
	it('POST test', () => {
		return request('http://localhost:8000').post('/login')
		.send(exampleUser)
		.expect(302);
	});
});

// logout page GET test
describe('logout', () =>{
	it('GET test', () => {
		return request('http://localhost:8000').get('/logout')
		.expect(302);
	});
});

// signup page GET test
describe('signup page', () =>{
	it('GET test', () => {
		return request('http://localhost:8000').get('/signup')
		.expect(200);
	});
});

// signup page POST test
describe('signup page', () =>{
	let newUser = {
		firstName: 'first',
		lastName: 'last',
		email: 'email@email.com',
		password: 'password'
	};
	it('POST test', () => {
		return request('http://localhost:8000').post('/signup')
		.send(newUser)
		.expect(302);
	});
});

// signup page GET test
describe('profile page', () =>{
	let exampleUser = {
		firstName: 'first',
		lastName: 'last',
		email: 'email@email.com',
		password: 'password'
	}
	it('GET test', () => {
		return request('http://localhost:8000').post('/login')
			.send(exampleUser)
			.then((res) => {
				request('http://localhost:8000').get('/profile')
				.expect(200)				
			});
	});
});
