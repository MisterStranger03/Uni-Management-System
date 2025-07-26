# Uni-Management - Full-Stack University Management System

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

A secure, modern, full-stack application designed to serve as a robust management system for a university. It features a role-based architecture, secure authentication with JWT and OTP verification, and a responsive user interface built with Angular Material.

## Key Features

-   **Secure Authentication**: Full JWT (JSON Web Token) authentication flow.
-   **OTP Verification**: Two-factor account verification during signup for enhanced security.
-   **Role-Based Access Control**: Differentiated dashboards and capabilities for 'Student' and 'Professor' roles.
-   **Reactive Frontend**: Built with Angular and RxJS for a responsive and dynamic user experience.
-   **Modern UI**: Clean and professional user interface using Angular Material components.
-   **RESTful API**: A well-structured backend built with Express.js and Node.js.
-   **Scalable Database**: Uses MongoDB with Mongoose for flexible and powerful data modeling.
-   **Protected Routes**: Angular Route Guards prevent unauthorized access to application sections.

## Technology Stack

### Frontend (`uni-management`)

-   **Framework**: [Angular](https://angular.io/)
-   **UI Components**: [Angular Material](https://material.angular.io/)
-   **State Management/Reactivity**: [RxJS](https://rxjs.dev/)
-   **Forms**: Angular Reactive Forms
-   **HTTP Client**: Angular HttpClient
-   **Language**: TypeScript

### Backend (`uni-management-backend`)

-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) with [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
-   **ODM**: [Mongoose](https://mongoosejs.com/)
-   **Authentication**: [JSON Web Token (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken), [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
-   **Middleware**: CORS

## Project Structure

The project is organized into two main folders, one for the frontend and one for the backend.

```
/uni-management-system/
├── 📂 uni-management/            # Angular Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── authentication/   # Login, Signup, OTP components & routing
│   │   │   ├── guards/           # auth.guard, no-auth.guard
│   │   │   ├── home/             # Dashboard component & routing
│   │   │   ├── models/           # Data models (interfaces)
│   │   │   └── services/         # auth.service, profile.service
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   └── ...
└── 📂 uni-management-backend/     # Express.js Backend API
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── auth.controller.js
    ├── models/
    │   └── user.model.js
    ├── routes/
    │   └── auth.routes.js
    ├── .env
    └── server.js
```

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js and npm](https://nodejs.org/en/) (LTS version recommended)
-   [Angular CLI](https://angular.io/cli): `npm install -g @angular/cli`
-   A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account (for the free tier database)

## Installation & Setup

Follow these steps to get your development environment set up.

### 1. Backend Setup

First, set up the server which will connect to the database.

```bash
# 1. Navigate to the backend directory
cd uni-management-backend

# 2. Install dependencies
npm install

# 3. Create a .env file in the root of the backend folder.
#    Copy the contents of .env.example (or the block below) into it.
touch .env
```

**Fill in your `.env` file with the following variables:**

```env
# Your MongoDB Atlas connection string.
# IMPORTANT: Replace <password> with your actual database user password.
MONGO_URI=mongodb+srv://<username>:<password>@<your-cluster-url>/uni_management_db?retryWrites=true&w=majority

# A long, random, secret string for signing JWTs.
JWT_SECRET=your-own-very-secret-random-string-12345

# The port the backend server will run on.
PORT=3000
```

> **IMPORTANT**: Do NOT commit your `.env` file to Git. It is included in the `.gitignore`.

### 2. Frontend Setup

Now, set up the Angular client application.

```bash
# 1. Navigate to the frontend directory from the root
cd ../uni-management

# 2. Install dependencies
npm install

# 3. The frontend is pre-configured to connect to the backend at http://localhost:3000.
#    No further configuration is needed.
```

## Running the Application

You must have both the backend and frontend servers running simultaneously in separate terminal windows.

**1. Run the Backend Server:**

```bash
# In the /uni-management-backend directory
npm start
```

> You should see the output:
> `Backend server is running on http://localhost:3000`
> `Successfully connected to MongoDB Atlas!`

**2. Run the Frontend Server:**

```bash
# In the /uni-management directory
ng serve
```

> Open your browser and navigate to **[http://localhost:4200](http://localhost:4200)**. The application should now be running.

## API Endpoints

The backend exposes the following authentication endpoints under the base path `/api/auth`.

| Method | Endpoint         | Description                                        | Access |
| :----- | :--------------- | :------------------------------------------------- | :----- |
| `POST` | `/register`      | Creates a new user and triggers OTP generation.    | Public |
| `POST` | `/verify-otp`    | Verifies the OTP to activate a user's account.     | Public |
| `POST` | `/login`         | Authenticates a user and returns a JWT.            | Public |

## Future Improvements

-   **Email Service**: Integrate a service like Nodemailer or SendGrid to send actual OTP emails instead of logging to the console.
-   **Expanded Roles**: Add an 'Admin' role with a separate dashboard for managing users and courses.
-   **Profile Management**: Allow users to view and edit their profiles.
-   **Course & Grade Modules**: Build out the core features for managing courses, enrollment, and grades.
-   **Unit & E2E Tests**: Add comprehensive test coverage for both frontend and backend.
