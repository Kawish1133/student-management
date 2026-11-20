
# Student Management System

A beginner-friendly Student Management System built using HTML, CSS,
JavaScript, Docker, and Nginx.

## Features

- Add new students
- View student records
- Search students
- Edit student information
- Delete student records
- Dashboard statistics
- Save records using browser Local Storage
- Responsive user interface
- Docker containerization
- Docker Compose support

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Docker
- Docker Compose
- Nginx

## Project Structure

```text
student-management/
├── index.html
├── style.css
├── script.js
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Requirements

- Docker
- Docker Compose

## Run the Project

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Open project directory:

```bash
cd student-management
```

Build and start:

```bash
docker compose up -d --build
```

Open in browser:

http://localhost:8080

## Docker Commands

Check running containers:

```bash
docker ps
```

View logs:

```bash
docker compose logs
```

Stop application:

```bash
docker compose down
```

Rebuild application:

```bash
docker compose up -d --build
```

## Data Storage

Student records are stored in browser Local Storage.
This beginner version does not use a backend or database.

## Author

Kawish Iqbal

## Project Purpose

This project was created to practice Docker,
containerization, web application deployment,
and basic CRUD operations.

