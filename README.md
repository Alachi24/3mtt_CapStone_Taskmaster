# Task Management Application

## Overview

This is a **Task Management Application** designed to help users manage their daily tasks efficiently. It features user authentication, task creation, editing, and deletion, and a responsive UI for seamless user experience.

---

## Features

- **User Registration and Login**:
  - Secure authentication using JWT.
- **Task Management**:
  - Create, view, update, and delete tasks.
- **Responsive Design**:
  - Mobile-friendly layout with CSS transitions and animations.
- **Database**:
  - MongoDB with Mongoose for data handling.
- **Backend-Frontend Integration**:
  - Static files served using Express.

---

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

### Frontend

- HTML5, CSS3, JavaScript
- Responsive design with CSS media queries

---

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- MongoDB instance (local or cloud)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/3mtt_CapStone_TaskMaster.git
   ```

2. Navigate to the project directory:

   ```bash
    cd 3mtt_CapStone_TaskMaster
   ```

3. Create a .env file in the root directory with the following keys:

   ```env
    PORT=5000
    MONGO_URI=your-mongo-db-connection-string
    JWT_SECRET=your-jwt-secret

   ```
