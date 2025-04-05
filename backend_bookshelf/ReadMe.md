# Backend Bookshelf Setup

This document explains how to set up the project locally and run it with the necessary environment variables.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
    ```
    git clone <REPOSITORY_URL>
    ```
2. Navigate to the project directory:
    ```
    cd backend_bookshelf
    ```
3. Install dependencies:
    ```
    npm install
    ```

## Environment Variables

Create a `.env` file in the root of the project. This file should contain the necessary environment variables to run the project. You might have an `.env.example` file provided with sample entries. Some common variables include:

```
PORT=4000
DB_HOST=localhost
DB_USER=username
DB_PASS=password
```

Make sure to replace these values with your actual configuration.

## Running the Project Locally

To start the server, run:
```
npm start
```
The application will run using the environment settings provided in the `.env` file.

## Additional Notes

- For development, you may use `npm run dev` if a watcher or live reload is configured.
- Ensure that your environment variables are set correctly to avoid issues with database connections or server configuration.

Happy coding!