const express = require('express');
const request = require('supertest');
const quickSetup = require('../src');

test('quickSetup applies middlewares and error handler', async () => {
	const app = express();
	quickSetup(app);

	app.get('/', (req, res) => res.send('Hello World'));

	const response = await request(app).get('/');
	expect(response.statusCode).toBe(200);
	expect(response.text).toBe('Hello World');
});
