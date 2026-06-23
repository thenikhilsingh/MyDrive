# MyDrive

MyDrive is a cloud storage web application built with React, Vite, Node.js, Express, and MongoDB. It lets authenticated users create folders, upload files, organize content, and share folders with expiring public links.

Files are stored on Cloudinary while metadata is managed in MongoDB. The frontend consumes a secure backend API to display folders, files, and shared folder details.

## Features

- User signup and login with JWT authentication
- Create, rename, and delete folders
- Upload files to folders
- View all uploaded files and folder-specific files
- Preview files in the browser and download files directly
- Delete files and folders
- Generate shareable folder links with expiration
- Access shared folder contents without authentication

## Implemented Functionality

- Backend API with authentication middleware
- Cloudinary file uploads and deletion
- Folder creation, rename, delete, and share link generation
- File list, file details, upload, and delete operations
- React app with protected dashboard routes
- File upload UI with folder selection
- Shared folder view with link expiration handling

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- lucide-react icons

### Backend

- Node.js
- Express
- JSON Web Tokens (JWT)
- Multer for multipart file uploads
- Cloudinary for file storage
- MongoDB with Mongoose

## Repository Structure

- `backend/` - Express API server
  - `server.js` - backend entry point
  - `config/db.js` - MongoDB connection
  - `controllers/` - route handler logic
  - `models/` - Mongoose schemas
  - `routes/` - API route definitions
  - `utils/cloudinary.js` - Cloudinary upload helpers

- `frontend/` - React application
  - `src/` - React source files
  - `components/` - reusable UI components
  - `pages/` - route-level pages
  - `hooks/` - custom hooks

## Environment Variables

### Backend

Create a `.env` file inside `backend/` with:

```env
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET_KEY=<your-jwt-secret>
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_API_SECRET=<cloudinary-api-secret>
```

### Frontend

Create a `.env` file inside `frontend/` with:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Setup Instructions

### Backend

1. Open a terminal in `backend/`
2. Run `npm install`
3. Start the server with `node server.js`
4. The backend listens on the `PORT` defined in `.env`

### Frontend

1. Open a terminal in `frontend/`
2. Run `npm install`
3. Start the frontend with `npm run dev`
4. Open the app in the browser using the Vite URL

## Notes

- File uploads are validated on the server. Supported file types include PDF, JPG, JPEG, and PNG.
- The backend enforces a 5 MB upload limit.
- Shared folder links expire after the duration specified when generating the link.

## Running the App

- Launch the backend first
- Launch the frontend second
- Register a new user, sign in, create folders, upload files, and share folders

## Future Improvements

- Add nested folder support
- Add drag-and-drop uploads
- Add search and filtering
- Add storage usage analytics
