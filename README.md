This project is built using the following technologies:

Node.js – JavaScript runtime

Express.js – Backend web framework

TypeScript – Type-safe JavaScript

PostgreSQL – Relational database

pg (node-postgres) – PostgreSQL client for Node.js

dotenv – Environment variable management

REST API architecture

📂 Project Features (CRUD)

This project demonstrates a complete CRUD (Create, Read, Update, Delete) implementation for Users.

✅ Create

Create a new user using POST /users

Stores user data in PostgreSQL database

📖 Read

Get all users → GET /users

Get single user by ID → GET /users/:id

✏️ Update

Update user information → PUT /users/:id

Uses PostgreSQL RETURNING * to return updated data

❌ Delete

Delete a user by ID → DELETE /users/:id

Handles non-existing users properly