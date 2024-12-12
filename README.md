# Express Quick Setup

A simple and quick setup for building RESTful APIs with Express.js. This package provides an easy way to scaffold an Express.js project with essential features like controllers, models, routes, middleware, and API documentation using Swagger.

## Features

- **Express.js setup** for rapid API development.
- **Pre-configured project structure** with `controllers`, `models`, `routes`, and `middleware` directories.
- **Example files** to get you started:
  - `userController.js` for handling user registration and login.
  - `userModel.js` for the User schema in MongoDB.
  - Swagger API documentation for easy testing and API exploration.
- **JWT authentication middleware** for protecting routes.
- **Swagger UI** integrated for interactive API documentation.
  
## Getting Started

### Installation

1. **Install the package globally** to use the project initializer anywhere:
   ```bash
   npm install -g express-quick-setup
```
2. **Initialize a new project:**

 ```bash
express-quick-setup <project-name>
```
This will create a new directory called <project-name> with a pre-configured Express project.

## Project Structure
After running the express-quick-setup, the project will be structured as follows:

``` bash

<project-name>/
│
├── controllers/
│   ├── userController.js         # Example controller for handling user-related routes.
│
├── models/
│   ├── userModel.js              # Mongoose model for the User schema.
│
├── routes/
│   ├── userRoutes.js             # Routes for user-related actions.
│
├── middleware/
│   ├── authMiddleware.js         # JWT authentication middleware.
│
├── .env                          # Environment variables (e.g., DB URI, JWT secret).
├── package.json                  # NPM dependencies and scripts.
├── server.js                     # Main server file, sets up API routes and Swagger UI.
└── api-docs/                     # Generated Swagger documentation (accessible via /api-docs).
```
## Configuration
Environment Variables:

Create a .env file with the following variables:
``` bash

PORT=3000
DB_URI=mongodb://localhost:27017/express-quick-setup
JWT_SECRET=your_jwt_secret
```
## Swagger API Documentation:

- The API documentation is automatically generated and accessible via http://localhost:3000/api-docs.
- Swagger will allow you to interact with the API and test the endpoints.

## Usage

1. **Start the Project:**

```bash
cd <project-name>
npm install
npm start
```
2. **Access the API Documentation:**

- Open http://localhost:3000/api-docs in your browser.
- You can test the POST /api/users/register and POST /api/users/login endpoints via the Swagger UI.

3. **Available Routes:**

- POST /api/users/register: Register a new user.
- POST /api/users/login: Login an existing user.
- POST /api/protected: A protected route that requires JWT authentication (e.g., access with Bearer <token>).

## Example Request
**Register a User**
**URL:** /api/users/register
**Method:** POST
**Request Body:**

```
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Login a User**
URL: /api/users/login
Method: POST
Request Body:

```
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Access a Protected Route**
**URL:** /api/protected
Method: POST
Headers:

```
{
  "Authorization": "Bearer <jwt-token>"
}
```

## API Documentation
- Swagger UI is integrated into the project. Once you run the project, you can access it at http://localhost:3000/api-docs to view and interact with the API documentation. Swagger will display - all available routes, request parameters, and responses.

## Dependencies
- express: Web framework for Node.js.
- mongoose: MongoDB object modeling for Node.js.
- dotenv: Load environment variables from .env.
- jsonwebtoken: JSON Web Token (JWT) for authentication.
- swagger-ui-express: Swagger UI for API documentation.
- swagger-jsdoc: Swagger JSDoc to generate API documentation from JSDoc comments.

## License
This project is licensed under the MIT License - see the LICENSE file for details.