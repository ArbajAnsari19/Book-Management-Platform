# Book Management App - Full Stack

This document outlines the steps to set up and run the complete Book Management application, including both the frontend and backend components.

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (LTS version recommended)
-   npm (Node Package Manager, comes with Node.js)
-   [MongoDB](https://www.mongodb.com/) (if you plan to run the database locally)

## Project Structure

The project is structured into two main directories:

-   `frontend_bookshelf`: Contains the React-based frontend application.
-   `backend_bookshelf`: Contains the Node.js/Express backend application.

## Setup Instructions

Follow these steps to get the application running:

### 1. Clone the Repository

Clone the project repository to your local machine:

```bash
git clone <REPOSITORY_URL>
cd Bookshelf # Or whatever you named the directory
```

### 2. Backend Setup

1.  Navigate to the backend directory:

    ```bash
    cd backend_bookshelf
    ```
2.  Install backend dependencies:

    ```bash
    npm install
    ```
3.  Create a `.env` file in the root of the `backend_bookshelf` directory.  Use the `.env.example` file as a template and configure the following environment variables:

    ```
    PORT=3000
    MONGODB_URI=<YOUR_MONGODB_CONNECTION_STRING>
    # Other environment variables as needed
    ```

    Replace `<YOUR_MONGODB_CONNECTION_STRING>` with your actual MongoDB connection string.
4.  Start the backend server:

    ```bash
    npm start
    ```

    The backend server will run on port 3000 (or the port specified in your `.env` file).  You may also use `npm run dev` if you have nodemon configured for automatic restarts on code changes.

### 3. Frontend Setup

1.  Open a new terminal window.
2.  Navigate to the frontend directory:

    ```bash
    cd ../frontend_bookshelf
    ```
3.  Install frontend dependencies:

    ```bash
    npm install
    ```

4.  Start the frontend development server:

    ```bash
    npm run dev
    ```

    The frontend application will typically be served on [http://localhost:8080](http://localhost:8080).

## Accessing the Application

Once both the frontend and backend servers are running, you can access the application in your web browser at [http://localhost:8080](http://localhost:8080).

## Additional Notes

-   Make sure your MongoDB database is running before starting the backend server.
-   Refer to the individual `README.md` files in the `frontend_bookshelf` and `backend_bookshelf` directories for more detailed information about each project.
-   If you encounter any issues, check the console output in both terminal windows for error messages.
