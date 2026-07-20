# ResumeLens

ResumeLens is a full-stack web application that helps users prepare for interviews by combining a target job description, a resume PDF, and a short self-summary to generate an AI-powered interview report. The app includes authentication, saved interview reports, technical and behavioral question suggestions, skill-gap analysis, a preparation roadmap, and downloadable resume PDFs tailored to the selected role.

## Features

- AI-generated interview reports based on a resume, self-description, and job description
- Technical interview question generation with model answers and interviewer intent
- Behavioral interview question generation with sample answers
- Match score calculation for a target role
- Skill gap analysis with severity tags
- Day-wise interview preparation roadmap
- Saved interview report history per user
- Resume PDF upload and resume text extraction
- AI-generated downloadable resume PDF tailored to the role
- Cookie-based authentication with protected routes
- Responsive React frontend with loading skeletons

## Tech Stack

### Frontend

- React 19
- React Router 7
- Vite
- Axios
- SCSS / Sass

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cookie-parser
- cors
- multer
- pdf-parse
- Puppeteer
- Google GenAI SDK (`@google/genai`)
- Zod

## Project Structure

```text
ResumeLens/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── config/
│       ├── controller/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── utils/
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── app.routes.jsx
│       ├── services/
│       └── features/
│           ├── auth/
│           └── interview/
└── README.md
```

### Directory Overview

- `frontend/`: React client application, routes, auth UI, interview UI, and API calls
- `backend/`: Express API, MongoDB models, auth middleware, AI integration, and PDF generation logic
- `backend/src/controller/`: Request handlers for auth and interview features
- `backend/src/routes/`: Auth and interview API route definitions
- `backend/src/models/`: Mongoose schemas for users, interview reports, and blacklisted tokens
- `backend/src/services/`: AI report generation and resume PDF generation
- `backend/src/middleware/`: JWT auth middleware and file upload middleware

## Prerequisites

Before running the project locally, make sure you have:

- Node.js installed
  - Recommended: a current LTS release
- npm installed
- MongoDB running locally or a MongoDB connection string available
- Git installed

You will also need:

- A Google AI API key for the interview-report and resume-generation features

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd ResumeLens
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

Open a second terminal, or return to the project root first:

```bash
cd frontend
npm install
```

## Environment Variables

Do not copy secret values into source control. Create your own local environment files and provide values yourself.

### Backend environment variables

The backend code references these variables:

| Variable | Used For |
|---|---|
| `MONGODB_URI` | MongoDB connection string used by Mongoose in `backend/src/config/database.js`. |
| `JWT_SECRET` | Secret used to sign and verify authentication tokens. |
| `TOKEN_EXPIRY` | JWT expiration value passed to `jsonwebtoken` when creating auth cookies. |
| `ApiKey` | Google GenAI API key used by `backend/src/services/ai.service.js`. |
| `NODE_ENV` | Optional. Used to control whether stack traces are included in backend error responses. |

### Frontend environment variables

The frontend code references these variables:

| Variable | Used For |
|---|---|
| `VITE_API_BASE_URL` | Base URL for Axios requests from the frontend. Falls back to `http://localhost:3000` if omitted. |

### Notes

- The backend currently listens on port `3000` directly in `backend/server.js`.
- The backend CORS configuration currently allows requests from `http://localhost:5173`.
- If you run the frontend on a different port, you will also need to update the CORS origin in `backend/src/app.js`.

## Running the Project

You need to run the backend and frontend at the same time in separate terminals.

### Start the backend

From the `backend` directory:

```bash
npm run dev
```

This starts the Express server with `nodemon` and loads environment variables through `dotenv`.

Backend default URL:

```text
http://localhost:3000
```

### Start the frontend

From the `frontend` directory:

```bash
npm run dev
```

Frontend default URL:

```text
http://localhost:5173
```

### Local startup summary

1. Start MongoDB.
2. Start the backend on `http://localhost:3000`.
3. Start the frontend on `http://localhost:5173`.
4. Open the frontend in your browser.
5. Register or log in.
6. Upload a resume PDF, add a job description and self-description, then generate an interview report.

## Build

The frontend includes a production build script.

From `frontend/`:

```bash
npm run build
```

To preview the built frontend locally:

```bash
npm run preview
```

There is no dedicated production build script defined in `backend/package.json` at the moment. The backend currently provides a development script only.

## API Overview

This project exposes two main API groups:

### Authentication API

- User registration
- User login
- Current-user lookup
- Logout with token blacklisting

### Interview API

- Generate a new AI-powered interview report
- Fetch a report by ID
- Fetch all saved reports for the authenticated user
- Generate and download a tailored resume PDF for a saved interview report

### Upload / PDF Flow

- Resume uploads are handled with `multer`
- Uploaded PDFs are stored in memory, not on disk
- Resume text is extracted with `pdf-parse`
- Generated resume output is rendered to PDF with Puppeteer

## Authentication

Authentication is implemented with JWT and HTTP-only cookies.

### How it works

- On register/login, the backend signs a JWT using `JWT_SECRET`
- The JWT is stored in a `token` cookie
- Protected backend routes use `verifyJWT`
- The frontend sends credentials automatically through Axios using `withCredentials: true`
- Protected frontend pages are wrapped by `ProtectedRoutes`
- Logout clears the cookie and stores the token in a blacklist collection

### Protected frontend routes

- `/`
- `/interview/:interviewId`

### Public frontend routes

- `/login`
- `/register`

## Database

The project uses MongoDB with Mongoose.

### Main collections

- `User`
  - Stores username, email, and hashed password
- `InterviewReport`
  - Stores job description, parsed resume text, self-description, match score, generated questions, skill gaps, preparation plan, and report title
- `BlacklistToken`
  - Stores invalidated JWTs after logout

### Database setup

- Make sure MongoDB is running before starting the backend
- Provide a valid `MONGODB_URI`
- The app connects automatically on backend startup

## How the Application Works

1. A user registers or logs in.
2. The frontend checks the current session using the `current-user` endpoint.
3. The user enters a job description.
4. The user uploads a resume PDF.
5. The user adds a short self-description.
6. The backend extracts resume text from the uploaded PDF.
7. The backend sends the combined information to Google GenAI.
8. The generated interview report is saved in MongoDB.
9. The user is redirected to the interview report page.
10. The user can later reopen saved reports from the home screen.
11. The user can generate and download a role-tailored resume PDF from a saved report.

## Troubleshooting

### Backend fails to start

- Confirm all required backend environment variables are set
- Confirm MongoDB is running and `MONGODB_URI` is valid
- Make sure port `3000` is available

### Frontend cannot reach the backend

- Confirm the backend is running on `http://localhost:3000`
- Confirm `VITE_API_BASE_URL` matches the backend URL if you override it
- If the frontend is not running on `http://localhost:5173`, update the CORS origin in `backend/src/app.js`

### Authentication is not working

- Make sure cookies are enabled in your browser
- Confirm the frontend is using `withCredentials: true` requests
- Confirm `JWT_SECRET` and `TOKEN_EXPIRY` are set

### Resume upload fails

- The current upload limit is `1MB`
- Only PDF files should be uploaded
- The backend uses in-memory uploads, so very large files are rejected

### AI report generation fails

- Confirm `ApiKey` is set correctly
- Confirm your Google AI key has access to the required model
- Check backend logs for validation or API errors

### Resume PDF generation fails

- Puppeteer downloads and runs Chromium, so install issues can block PDF generation
- On Linux or CI environments, missing Chromium/system dependencies may cause launch failures
- If installation was interrupted, reinstall backend dependencies

### Saved reports are empty

- Make sure you are logged in
- Generate at least one report successfully
- Confirm the database connection is working and writes are succeeding

## Development Notes

- Backend development script: `npm run dev`
- Frontend development script: `npm run dev`
- Frontend lint script: `npm run lint`
- Frontend build script: `npm run build`


