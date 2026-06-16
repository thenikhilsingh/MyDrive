# MyDrive

MyDrive is a cloud storage application inspired by Google Drive, built with the MERN stack. It provides users with a secure and organized way to manage their files through a folder-based system.

Users can create folders, upload files, view file information, and download stored content. Files are stored in cloud storage while metadata is maintained in MongoDB, allowing for efficient file management and scalability.

## Features

### Authentication

* Secure user registration and login
* Session-based authentication with Passport.js
* Protected routes for authenticated users

### Folder Management

* Create folders
* View all folders
* Rename folders
* Delete folders

### File Management

* Upload files to specific folders
* View file details such as name, size, and upload date
* Download uploaded files
* Organize files within folders

### Cloud Storage

* Cloudinary integration for file storage
* Secure file URL management
* Scalable cloud-based storage solution

### File Validation

* File type restrictions
* File size limits
* Upload validation and error handling

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* Passport.js
* Express Session
* Multer

### Database

* MongoDB
* Mongoose

### Cloud Storage

* Cloudinary

## Project Goal

The goal of MyDrive is to replicate the core functionality of a modern cloud storage platform by allowing users to securely store, organize, and access files from a centralized location. The project focuses on authentication, file management, cloud storage integration, and a clean user experience.

## Future Enhancements

* Share folders using public links
* Expiring shareable links
* Nested folder support
* Drag-and-drop uploads
* Multiple file uploads
* Search and filtering
* Storage usage analytics
