# To-Do List App

A simple task manager built with HTML, Express.js, and MongoDB.

## Project Structure

```
todo-app/
├── server.js     # Express server + MongoDB models + API routes
├── index.html    # Frontend (HTML + inline CSS + vanilla JS)
└── README.md
```

## Setup & Run

**1. Install dependencies**
```bash
npm init -y
npm install express mongoose
```

**2. Make sure MongoDB is running**
```bash
mongod
```

**3. Start the server**
```bash
node server.js
```

**4. Open in browser**
```
http://localhost:3000
```

---

## Features

- Add tasks with title, description, category, and due date
- View all tasks (filter: All / Active / Completed)
- Mark tasks as completed (can't re-complete an already done task)
- Edit task details inline
- Delete tasks
- Validation: title is required, empty titles are rejected

## API Endpoints

| Method | Route        | Description       |
|--------|-------------|-------------------|
| GET    | /tasks       | Get all tasks     |
| POST   | /tasks       | Create a task     |
| PUT    | /tasks/:id   | Update a task     |
| DELETE | /tasks/:id   | Delete a task     |

## Key Decisions

- **Two files only**: `server.js` handles all backend logic; `index.html` handles all frontend with inline CSS and vanilla JS — no build tools needed.
- **Mongoose** is used for schema validation so errors bubble up cleanly as JSON responses.
- **No page reloads**: JS fetches data from the API and re-renders the list in place.
- **Inline edit form** per task keeps the UI simple without a separate page.