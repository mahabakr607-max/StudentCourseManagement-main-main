# Student Course Management System

A full-stack web application designed to simplify course management and student enrollment through a modern **Angular frontend** integrated with a **Node.js / Express.js backend** and **MongoDB** database.

## 📌 Project Overview

The Student Course Management System provides a centralized platform for managing courses, users, profiles, and enrollments.

Students can register, log in, browse available courses, enroll in courses, and manage their profiles and enrolled courses.

Administrators can manage courses and access student-related information through protected features.

## 🚀 Features

* 🔐 User Registration & Login
* 👤 User Profile Management
* 📚 Browse Available Courses
* ➕ Course Enrollment
* 🎓 My Courses
* 🔑 Authentication & Authorization
* 🛡️ Protected Routes
* 🌐 RESTful API Integration
* 📱 Responsive User Interface
* 🔄 CRUD Operations
* 👨‍💼 Admin Course Management

## 🛠️ Technologies Used

### Frontend

* Angular
* TypeScript
* HTML5
* CSS3
* Bootstrap

### Backend

* Node.js
* Express.js
* REST API
* MongoDB
* Mongoose

### Development Tools

* Visual Studio Code
* Postman
* Git
* GitHub

## 🏗️ Project Structure

```text
StudentCourseManagement/
│
├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── ...
│
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── pages/
│   │       ├── services/
│   │       ├── interceptors/
│   │       └── ...
│   ├── angular.json
│   └── package.json
│
├── .gitignore
├── README.md
└── package-lock.json
```

## 🔑 Authentication

The application uses authentication and authorization mechanisms to protect user accounts and restricted features.

Authentication tokens are sent with API requests using the `Authorization` header.

```text
Authorization: Bearer <token>
```

Protected frontend routes are handled through Angular route protection.

## 📚 Course Management

The system supports core course management operations, including:

* Create courses
* View available courses
* Update course information
* Delete courses
* Enroll students in courses
* View enrolled courses

## 🔌 API Integration

The Angular frontend communicates with the backend through RESTful API endpoints.

Example course endpoints:

```text
GET     /courses
GET     /courses/:id
POST    /courses
PUT     /courses/:id
DELETE  /courses/:id
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/mahabakr607-max/StudentCourseManagement-main-main.git
```

### 2. Navigate to the Project

```bash
cd StudentCourseManagement-main-main
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Run the Angular Application

```bash
ng serve
```

Then open:

```text
http://localhost:4200
```

### 5. Run the Backend

Open another terminal and navigate to the backend:

```bash
cd Backend
npm install
```

Then start the server:

```bash
node index.js
```

## 🔒 Environment Variables

Create a `.env` file inside the backend directory with your local configuration.

Example:

```text
PORT=5000
MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_secret_key
```

**Do not upload real credentials, passwords, connection strings, or secret keys to GitHub.**

## 👩‍💻 Author

**Maha Refaat Abdulaziz**

Management Information Systems (MIS) Student

## 📄 License

This project was developed for educational and training purposes.
