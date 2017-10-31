// import request from 'supertest-as-promised';
// import Api from '../src/Api';

const request = require('../../node_modules/supertest-as-promised');
const login = require('../../controllers/login.js');

// const app = login;

describe('login controller', () => {
  it('should return 200', () => {
    return request(login).get('/')
    .expect(200);
  });
});

