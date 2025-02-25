Introduction

This full-stack application allows users to register, log in, and track exercises with various functionalities. It provides authentication with JWT tokens, CRUD operations, sorting, pagination, and the ability to add new activities, store them in MongoDB, and manage favorite exercises.

Features

User authentication and authorization (JWT-based)
Secure password storage using bcrypt
CRUD operations for exercises and activities
Sorting and pagination for better data management
Add and remove exercises from favorites
RESTful API with well-structured routes
Deployment-ready with MongoDB integration

Tech Stack
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT, bcrypt
State Management: Context API
Cors: Cross-Origin Resource Sharing.

Setup and Installation

Clone the repository:

git clone <repository-url>
cd your-reposetory

Install dependencies:

npm install

Set up environment variables in a .env file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the backend server:
cd node-runtime
npm start

Start the frontend:
cd react-app
npm start



API Documentation

The API includes common authentication routes as well as four different models, each following RESTful conventions.

Authentication

POST /api/auth/register - Register a new user
POST /api/auth/login - Log in and receive JWT token
POST /api/auth/logout - Log out and clear JWT