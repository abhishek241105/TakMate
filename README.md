# TaskMate – Todo List Application

TaskMate is a full-stack Todo List application that helps users manage their daily tasks efficiently. Users can add, view, edit, delete, and mark tasks as completed.

## Features

- Add new tasks
- View all existing tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed or pending
- Strike-through effect for completed tasks
- MongoDB database integration
- Responsive design for mobile and desktop

## Technologies Used

**Frontend:**
- HTML
- CSS
- JavaScript

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB
- Mongoose

## Project Structure

```text
TaskMate/
├── config/
│   └── db.js
├── models/
│   └── Todo.js
├── routes/
│   └── todoRoutes.js
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Installation and Setup

1. Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

2. Navigate to the project folder:

```bash
cd TaskMate
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root folder:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/taskmate
```

5. Start MongoDB on your system.

6. Start the application:

```bash
node server.js
```

7. Open