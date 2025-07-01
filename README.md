# 📝 Task Manager App

A simple and efficient **Task Management Application** designed to help users organize and track their daily tasks. This MVP version provides core features for creating, updating, viewing, and deleting tasks perfect or individuals aiming to boost productivity.

---

## 🚀 Features

- **User Authentication**
  - User Registration with hashed password
  - User Login with secure JWT-based authentication
  - Protected routes to restrict access to logged-in users only
  - Token expiration and secure middleware for verification
  - Proper error handling and input validation

- 🗂️ **Task CRUD**
  - Create new tasks with title, description, and due date
  - Read/view all tasks or individual task details
  - Update task information (status, priority, etc.)
  - Delete tasks when completed or no longer needed


- 🔍 **Filtering**
  - View tasks by status, due date, priority

---

## 🛠️ Tech Stack

| Tech        | Description               |
|-------------|---------------------------|
| **Backend** | Node.js, Express.js       |
| **Database**| MongoDB / PostgreSQL      |
| **Auth**    | JWT      |
| **Frontend**| React |

---

## 📁 Project Structure (Example)
```
task-manager/
├── controllers/
├── db/
├── middlewares/
├── model/
├── routes/
├── utils/
├── .env
├── app.js
└── README.md
```

## Installation

1. **Clone the Repository**

```bash
git clone https://github.com/tolulope23-ops/taskManager-API.git
cd task-manager

npm install
