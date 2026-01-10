<!-- This project is built using the following technologies:

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

Handles non-existing users properly -->



# 🚀 CRUD API Project

[![Node.js](https://img.shields.io/badge/Node.js-14.x-green?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?style=flat-square)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13.x-blue?style=flat-square)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

A **RESTful CRUD API** built with **Node.js, Express.js, TypeScript, and PostgreSQL** for managing users.

---

## 📖 Table of Contents
1. [Technologies Used](#-technologies-used)
2. [Project Features](#-project-features-crud)
   - [Create](#-create)
   - [Read](#-read)
   - [Update](#-update)
   - [Delete](#-delete)
3. [Installation](#-installation)
4. [Environment Variables](#-environment-variables)
5. [Running the Project](#-running-the-project)
6. [API Endpoints](#-api-endpoints)
7. [Notes](#-notes)
8. [License](#-license)

---

## 🛠️ Technologies Used
- **Node.js** – JavaScript runtime  
- **Express.js** – Backend web framework  
- **TypeScript** – Type-safe JavaScript  
- **PostgreSQL** – Relational database  
- **pg (node-postgres)** – PostgreSQL client for Node.js  
- **dotenv** – Environment variable management  
- **REST API architecture** – Follows REST principles  

---

## 📂 Project Features (CRUD)
This project demonstrates a complete **CRUD (Create, Read, Update, Delete)** implementation for **Users**.

### ✅ Create
- Create a new user using:
```http
POST /users
