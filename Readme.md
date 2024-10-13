# Basic Todo App

This is a basic Todo application built with **Next.js** for the client and **Laravel** for the server API. It uses service injection and resources in Laravel to handle the backend logic and write test cases.

The app provides basic CRUD functionality for managing todos and covers all fundamental use cases, making it a great starter project for building Todo applications.

## Features
- **Next.js (Frontend)**: A modern React framework for building the client side.
- **Laravel (Backend)**: A robust PHP framework used for the API, utilizing service injection and resources for a structured backend.
- **Todo CRUD**: Allows users to Create, Read, Update, and Delete todos.
- **Docker Support**: The app can be easily run in a Docker environment.

## Getting Started

To build and run the application, follow these steps:

### 1. Add api url in NEXT_PUBLIC_API
```bash
http://localhost:8001
```

### 2. Build Docker Image
```bash
docker-compose build --no-cache
```

### 3. Start Docker Container
```bash
docker-compose up -d
```
### 4. Start Using
```bash
http://localhost:3001
