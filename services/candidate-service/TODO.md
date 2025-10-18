# Candidate Service Implementation TODO

## Directory Structure Creation
- [x] Create candidate-service directory and subfolders (src/config, src/controllers, src/middleware, src/models, src/routes, src/utils)

## Package.json Setup
- [x] Create package.json with required dependencies (express, mongoose, cors, dotenv, multer, cloudinary, axios)

## Server Setup
- [x] Implement server.js with MongoDB connection, middleware setup, and route registration

## Models
- [x] Create Candidate.js model for user data and resumes
- [x] Create Resume.js model for parsed data and skills

## Controllers
- [x] Implement candidateController.js with functions: uploadResume, getMatches, getSkills, getDashboard, getNotifications

## Routes
- [x] Create candidateRoutes.js defining the endpoints (POST /upload-resume, GET /matches, GET /skills, GET /dashboard, GET /notifications)

## Utils
- [x] Create cloudinaryHelper.js for resume upload to Cloudinary
- [x] Create aiServiceHelper.js for calling Python AI service for parsing

## Middleware
- [x] Create authMiddleware.js (adapted from auth-service) for authentication
- [ ] Add file validation middleware if needed

## Configuration
- [x] Create .env file with Mongo URI, Cloudinary keys, AI service URL
- [x] Create db.js in src/config for MongoDB connection

## Installation and Testing
- [x] Run npm install to install dependencies
- [x] Set up .env variables
- [ ] Test endpoints locally
- [ ] Ensure AI service is accessible
- [ ] Verify Cloudinary integration

## Additional Features
- [x] Create Python AI service for resume parsing and job matching (port 6999)
- [x] Document API endpoints with Swagger/OpenAPI
- [ ] Add file validation middleware if needed
- [ ] Implement proper error responses and logging
- [ ] Add unit tests for controllers and utils
- [ ] Set up proper logging with Winston or similar
- [ ] Add rate limiting and security headers
