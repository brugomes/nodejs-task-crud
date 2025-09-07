# Node.js Task CRUD

A simple RESTful API for managing tasks, built with Node.js and no external frameworks. This project demonstrates the fundamentals of building a CRUD (Create, Read, Update, Delete) API using only Node.js core modules.

## Features

- Create a new task
- List all tasks (with optional search)
- Update a task (title or description)
- Delete a task
- Mark a task as complete

## Endpoints

| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| GET    | `/task`              | List all tasks (search optional) |
| POST   | `/task`              | Create a new task                |
| PUT    | `/task/:id`          | Update a task                    |
| DELETE | `/task/:id`          | Delete a task                    |
| PATCH  | `/task/:id/complete` | Toggle task completion           |

## Getting Started

Make sure you have [Node.js](https://nodejs.org/) installed.

```bash
npm run dev
```

The server will run on `http://localhost:3333`.

## Project Structure

- `src/server.js`: Entry point, HTTP server setup.
- `src/routes.js`: API route definitions and handlers.
- `src/database.js`: Simple in-memory database logic.
- `src/middlewares/json.js`: Middleware for parsing JSON bodies.
- `src/utils/`: Utility functions.

## Database

This project uses a simple in-memory database (with optional persistence to `db.json`). No external database is required.

## Importing tasks via CSV

You can bulk upload tasks using the `listTasks.csv` file, which already exists in the src/ directory. This file should contain the columns `title` and `description` for each task you want to import.

To import the tasks, run:

```bash
node src/import-csv.js
```

Each row in the CSV will be added as a new task to the local database.

## License

MIT
