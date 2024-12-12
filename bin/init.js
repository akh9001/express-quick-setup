#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const createDirIfNotExists = (dirPath) => {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
};

const copyTemplateFiles = (projectDir) => {
	// Creating base directories
	createDirIfNotExists(path.join(projectDir, 'controllers'));
	createDirIfNotExists(path.join(projectDir, 'models'));
	createDirIfNotExists(path.join(projectDir, 'routes'));
	createDirIfNotExists(path.join(projectDir, 'middleware'));

	// Add example controller file
	const userControllerContent = `
const User = require('../models/userModel');

// Register user
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Error registering user
 */
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login user
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Error logging in
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = { registerUser, loginUser };
    `;
	fs.writeFileSync(path.join(projectDir, 'controllers', 'userController.js'), userControllerContent);

	// Add example routes file
	const userRoutesContent = `
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
    `;
	fs.writeFileSync(path.join(projectDir, 'routes', 'userRoutes.js'), userRoutesContent);

	// Add example middleware file
	const authMiddlewareContent = `
const jwt = require('jsonwebtoken');

// Verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
    `;
	fs.writeFileSync(path.join(projectDir, 'middleware', 'authMiddleware.js'), authMiddlewareContent);

	// Add example model file
	const userModelContent = `
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
    `;
	fs.writeFileSync(path.join(projectDir, 'models', 'userModel.js'), userModelContent);

	// Add example .env file
	const envContent = `
PORT=3000
DB_URI=mongodb://localhost:27017/express-quick-setup
JWT_SECRET=your_jwt_secret
    `;
	fs.writeFileSync(path.join(projectDir, '.env'), envContent);

	// Add example package.json file
	const packageJsonContent = JSON.stringify({
		name: 'express-quick-setup',
		version: '1.0.0',
		main: 'server.js',
		dependencies: {
			express: '^4.17.1',
			mongoose: '^5.10.9',
			dotenv: '^8.2.0',
			'jsonwebtoken': '^9.0.2',
			'swagger-ui-express': '^4.1.6',
			'swagger-jsdoc': '^6.0.0'
		},
		scripts: {
			start: 'node server.js'
		},
		author: '',
		license: 'ISC'
	}, null, 2);
	fs.writeFileSync(path.join(projectDir, 'package.json'), packageJsonContent);

	// Add example server.js file
	const serverJsContent = `
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

dotenv.config();

const app = express();
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API',
      version: '1.0.0',
      description: 'A simple Express API for user registration and login',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./controllers/*.js', './routes/*.js'], // Path to your API docs
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Database connection error:', err));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRoutes);
app.use('/api/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'You are authorized to access this route!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(\`Server is running on port \${PORT}\`);
});
    `;
	fs.writeFileSync(path.join(projectDir, 'server.js'), serverJsContent);
};

// Main function to initiate project
const initiateProject = (projectDir) => {
	console.log(`Initializing project in ${projectDir}...`);
	createDirIfNotExists(projectDir);
	copyTemplateFiles(projectDir);
	console.log('Project setup complete!');
};

// Run the initialization
const projectDir = process.argv[2] || '.';
initiateProject(projectDir);
