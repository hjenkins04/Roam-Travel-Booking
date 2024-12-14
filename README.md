# Roam: Flight Booking App

<br/>
<p align="center">
  <a>
    <img src="./documentation/assets/logo.png" alt="Roam Logo" width="510" height="161">
  </a>
  <h3 align="center">Roam: Simplify Your Flight Booking Experience</h3>
  <p align="center">A modern web application for booking flights, choosing seats, and making secure payments.</p>
</p>

## Overview

Roam is a web-based flight ticket booking system designed to provide a seamless and enhanced user experience for travelers. With Roam, users can:

- Search and browse available flights.
- Select and reserve seats.
- Make secure payments.
- Perform end-to-end flight booking with ease.

Built with modular architecture, the application is divided into backend, frontend, and end-to-end testing components for optimal scalability and maintainability.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Running with Docker](#running-with-docker)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Testing](#testing)
  - [End-to-End Tests](#end-to-end-tests)
  - [Frontend Tests](#frontend-tests)
  - [Backend Tests](#backend-tests)
- [Acknowledgements](#acknowledgements)

---

## Features

- **Search Flights**: Browse flights by origin, destination, date, and time.
- **Seat Selection**: View seat maps and reserve your preferred seat.
- **Secure Payments**: Integrated payment gateway for fast and safe transactions.
- **End-to-End Testing**: Comprehensive testing suite for high reliability.
- **Modern User Experience**: Intuitive and responsive design for ease of use.

---

## Project Structure

The project follows a modular directory structure for efficient development and testing:

```plaintext
ROAM-TRAVEL-BOOKING/
├── documentation/           # Project documentation
├── roam-backend/            # Backend API (Flask)
├── roam-end2end-tests/      # End-to-End Testing Suite
├── roam-frontend/           # Frontend Application (React/Next.js)
└── docker-compose.yml       # Docker configuration
```
---

## Installation

### Running with Docker

1. **Install Docker**:
   - Follow the [official Docker installation guide](https://docs.docker.com/get-docker/).

2. **Build and Run Containers**:
   - Build the Docker images:
     ```bash
     docker compose build
     ```
   - Start the containers:
     ```bash
     docker compose up -d
     ```
   - Verify running containers:
     ```bash
     docker ps
     ```

3. **Access the App**:
   - Open your browser and navigate to `http://localhost:3000`.

---

### Frontend Setup

1. **Navigate to Frontend Directory**:
   ```bash
   cd roam-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Access the Frontend**:
   - Open your browser and go to `http://localhost:3000`.

---

### Backend Setup

1. **Navigate to Backend Directory**:
   ```bash
   cd roam-backend
   ```

2. **Set Up Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # macOS/Linux
   .\venv\Scripts\activate   # Windows
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Backend**:
   ```bash
   python run.py
   ```

5. **Access the Backend**:
   - By default, the backend will be available at `http://127.0.0.1:5000`.

---

## Testing

### End-to-End Tests

1. **Navigate to Test Suite Directory**:
   ```bash
   cd roam-end2end-tests
   ```

2. **Set Up Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # macOS/Linux
   .\venv\Scripts\activate   # Windows
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run Tests**:
   ```bash
   pytest -n auto -v tests
   ```

### Frontend Tests

1. **Navigate to Frontend Directory**:
   ```bash
   cd roam-frontend
   ```

2. **Run Tests**:
   ```bash
   npm test
   ```

3. **View Code Coverage**:
   ```bash
   npm run coverage
   ```

### Backend Tests

1. **Navigate to Backend Directory**:
   ```bash
   cd roam-backend
   ```

2. **Run Tests**:
   ```bash
   pytest
   ```

---

## Acknowledgements

- **Frameworks**: React, Flask, Docker
- **Contributors**: [Group 34 Team](https://github.com/ryanvandrunen/327-Group34-CH/graphs/contributors)
- **Course**: CISC 327 - Software Quality Assurance Fall 2024