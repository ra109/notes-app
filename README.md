# Notes App

A simple full-stack note-taking application. Users can sign up, log in, and create, view, edit and delete their own notes. Notes are private: each note belongs to the user who created it, and no one else can read or change it.

**Live demo:** https://notes-app-0viw.onrender.com
**Repository:** https://github.com/ra109/notes-app

> The demo runs on a free hosting plan. If it has been idle, the first load can take up to a minute.

## Tech stack

- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas, with Mongoose
- **Authentication:** JSON Web Tokens (JWT), passwords hashed with bcrypt
- **Frontend:** HTML, CSS and JavaScript (a single page served by Express)
- **Hosting:** Render (app) and MongoDB Atlas (database)

## Features

- Sign up and log in with email and password
- Notes are visible only to logged-in users
- Every note is linked to the user who created it
- Create, view, edit and delete your own notes
- Other users' notes cannot be read, edited or deleted
- Input validation and clear error messages on the API
- Simple, responsive interface

## Project structure

```
notes-app/
└── server/
    ├── index.js            # Express app and database connection
    ├── models/             # User and Note schemas
    ├── routes/             # auth and notes routes
    ├── middleware/         # JWT authentication check
    ├── public/index.html   # Frontend
    ├── .env.example        # Required environment variables
    └── package.json
```

## Setup instructions

**Requirements:** Node.js 18 or later, and a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

1. Clone the repository:
   ```bash
   git clone https://github.com/ra109/notes-app.git
   cd notes-app/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your environment file by copying the example:
   ```bash
   cp .env.example .env
   ```
   On Windows PowerShell use `copy .env.example .env`.
4. Open `.env` and fill in the values:
   ```
   PORT=5000
   MONGO_URI=your MongoDB Atlas connection string
   JWT_SECRET=any long random string
   ```
5. Start the server:
   ```bash
   npm run dev
   ```
   For production use `npm start`.
6. Open **http://localhost:5000** in your browser.

## API endpoints

All note routes require the header `Authorization: Bearer <token>`. The token is returned by signup and login.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/signup` | Create an account (`name`, `email`, `password`) |
| POST | `/api/auth/login` | Log in (`email`, `password`) and receive a token |
| GET | `/api/notes` | List the logged-in user's notes |
| POST | `/api/notes` | Create a note (`title`, `content`) |
| PUT | `/api/notes/:id` | Edit one of your notes |
| DELETE | `/api/notes/:id` | Delete one of your notes |

## How security works

- Passwords are hashed with bcrypt before they are stored. Plain passwords are never saved.
- Login returns a signed JWT. A middleware checks the token on every notes request and rejects requests without a valid one.
- Each note stores the id of its owner. Notes are always looked up by both the note id and the logged-in user's id, so one user cannot access another user's notes.
- Secrets such as the database connection string live in environment variables and are not committed to the repository.

## Author

Raghuvansh Pandey — [GitHub](https://github.com/ra109)
