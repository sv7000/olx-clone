# OLX Clone

This is a functional OLX clone built with the MERN stack: MongoDB, Express.js, React.js, and Node.js. The application allows users to register, log in, list items for sale, and view items listed by others.

## Features

- User authentication (registration and login)
- List items for sale
- View all unsold items
- View items uploaded by the logged-in user
- View all purchases by the logged-in user

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine
- MongoDB Atlas account for database hosting

## Installation

Follow these steps to set up and run the project on your local machine.

### Clone the Repository

```
git clone https://github.com/yourusername/olx-clone.git
cd olx-clone
```

## Backend Setup
Navigate to the backend directory:

```
cd olx-clone-backend
Install dependencies:
```

```
npm install
Set up environment variables:
```

### Create a .env file in the olx-clone-backend directory and add the following variables:


```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Start the backend server:

```
node server.js
```
The backend server will start on http://localhost:5000.

## Frontend Setup

Navigate to the frontend directory:
```
npm install
```

Start the server:

```
npm run dev
```

The frontend application will open in your default browser at http://localhost:5173.

Usage
Register a new account or log in with existing credentials.
List an item for sale by clicking the "Sell Item" button.
View all unsold items on the homepage.
Check your listed items and purchases through the user dashboard.
Contributing
To contribute to this project, follow these steps:

Fork the repository.
Create a new branch: git checkout -b feature/your-feature
Make your changes and commit them: git commit -m 'Add some feature'
Push to the branch: git push origin feature/your-feature
Create a pull request.
License
This project is open-source and available under the MIT License.

markdown


### Summary

- **Introduction:** A brief overview of the project.
- **Features:** List of implemented features.
- **Prerequisites:** Requirements for setup.
- **Installation:** Step-by-step guide for setting up the project.
- **Usage:** Instructions for using the application.
- **Contributing:** Guidelines for contributing to the project.
- **License:** Information about the project's license.
