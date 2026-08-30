# Student Course Management System

A web-based **Student Course Management System** that allows students and instructors to manage courses, user accounts, enrollment, and course-related information through an **Angular frontend** integrated with a backend API.

## 📌 Project Overview

The Student Course Management System is designed to simplify the process of managing educational courses online.

Students can create accounts, log in, browse available courses, enroll in courses, and manage their profiles. Instructors or administrators can manage courses and student-related information.

## 🚀 Features

* 🔐 User Registration & Login
* 👤 User Profile Management
* 📚 Browse Available Courses
* ➕ Course Enrollment
* 🎓 Manage My Courses
* 🔑 Authentication & Authorization
* 🛡️ Auth Guards for Protected Routes
* 🌐 REST API Integration
* 📱 Responsive User Interface
* 🔄 CRUD Operations for Courses and Users

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

### Development Tools

* Visual Studio Code
* Postman
* Git & GitHub

## 🏗️ Project Structure

```text
StudentCourseManagement/
│
├── Frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   └── ...
│   │   └── ...
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── index.js
│
└── README.md
```

## 🔑 Authentication

The application uses authentication to protect user information and restricted pages.

After login, the authentication token is stored on the client side and sent with API requests using the `Authorization` header.

```text
Authorization: Bearer <token>
```

Protected routes are handled using Angular Route Guards.

## 📚 Course Management

The system provides course management functionality including:

* Create courses
* View courses
* Update course information
* Delete courses
* View enrolled courses
* Enroll students in courses

## 🔌 API Integration

The Angular frontend communicates with the backend through RESTful API endpoints.

Example:

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
git clone https://github.com/IbrahimJamal1/StudentCourseManagement.git
```

### 2. Navigate to the Project

```bash
cd StudentCourseManagement
```

### 3. Install Frontend Dependencies

```bash
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

Navigate to the backend folder and install dependencies:

```bash
npm install
```

Then start the server:

```bash
npm start
```

or:

```bash
node index.js
```

## 🔒 Environment Variables

Create a `.env` or configuration file for sensitive information such as:

```text
PORT=5000
MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_secret_key
```

Do not upload real credentials or secret keys to GitHub.

## 👨‍💻 Author

**Ibrahim Gamal Ibrahim**

Computer Science Student
Faculty of Computers & Artificial Intelligence
Benha University

## 📄 License

This project was developed for educational and training purposes.
