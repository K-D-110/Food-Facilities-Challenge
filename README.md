
## Overview

The goal of this project is to create an API and UI for searching mobile food facilities in San Francisco using a dataset from the city’s open data portal. The project includes the following features:

- **Search by Applicant Name**: Allow the user to search for mobile food facilities based on the name of the applicant. An optional filter can be applied to filter by "Status".
- **Search by Street Name**: Allow users to search food trucks based on partial street names. For example, searching "SAN" would return food trucks located on streets like "SANSOME ST".
- **Nearby Food Trucks by Latitude and Longitude**: Given a latitude and longitude, return the 5 nearest food trucks. By default, only food trucks with "APPROVED" status should be returned, but the user can override this filter to search for all statuses.
- **User Interface (UI)**: A simple and intuitive UI to interact with the API and search the mobile food facility data.
  
Additionally, the project should include a Dockerfile for running the application in a containerized environment and automated tests.

## Key Features Implemented

1. **Search by Applicant Name**:
    - Users can search for food trucks by entering part of the applicant's name.
    - An optional filter allows users to specify the status of the facility (e.g., Approved, Expired).

2. **Search by Partial Street Name**:
    - Users can enter partial street names to find food trucks. For example, entering "SAN" returns results like "SANSOME ST".

3. **Find Nearby Food Trucks**:
    - Using latitude and longitude, the API returns the 5 nearest approved food trucks.
    - Users can override the default filter to view all statuses.

4. **Frontend UI**:
    - A simple UI built using **React.js** (if bonus points are targeted) where users can interact with the API.
    - Includes a search bar for name and street search, and a form for inputting coordinates.

5. **Backend API**:
    - The backend API is built using **Node.js/Express** (or another appropriate framework/language) to handle the data processing and API requests.

6. **Dockerfile**:
    - A Dockerfile is included to build and run the application in a containerized environment.

7. **Automated Tests**:
    - Unit and integration tests are written to verify the functionality of the backend API and frontend.

---

## Technical Decisions

### Backend
- **Node.js/Express**: Chosen for its simplicity and performance in building REST APIs. Express simplifies routing and middleware management, which is well-suited for this challenge.
- **PostgreSQL (or MongoDB)**: A relational database (PostgreSQL) or a document-based database (MongoDB) is used to store the mobile food facility data. Data is loaded from the provided CSV (or JSON) file during setup.
- **Google Maps API**: Used to calculate the nearest food trucks based on latitude and longitude.

### Frontend
- **React.js**: React is used to build the user interface. It provides a fast and responsive way to build interactive applications.
- **Material UI**: A component library for consistent design and easy-to-use UI components.
- **Axios**: Used for making API requests from the frontend to the backend.

### Docker
- **Docker**: A Dockerfile is provided for containerization, allowing the application to be easily run on any system that supports Docker. The container includes all necessary dependencies, ensuring the app runs consistently across different environments.

### Testing
- **Jest**: Used for testing the backend API logic, ensuring correct functionality of the search by name, street, and location.
- **React Testing Library**: Used to test the frontend components and interactions with the API.

---

## How to Run the Application

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/food-facilities-challenge.git
cd food-facilities-challenge
```

### 2. Build and Start the Application with Docker
Ensure you have Docker installed on your system.

1. **Build the Docker image**:
    ```bash
    docker build -t food-facilities-app .
    ```

2. **Run the application in a container**:
    ```bash
    docker run -p 5000:5000 food-facilities-app
    ```

    The backend API will now be accessible at `http://localhost:5000`, and the frontend UI will be accessible at `http://localhost:3000`.

### 3. Running Backend and Frontend Separately (Optional)
If you wish to run the backend and frontend separately, you can follow these instructions:

#### Backend
1. Navigate to the `backend` directory and install dependencies:
    ```bash
    cd backend
    npm install
    ```

2. Start the backend server:
    ```bash
    npm start
    ```

#### Frontend
1. Navigate to the `frontend` directory and install dependencies:
    ```bash
    cd frontend
    npm install
    ```

2. Start the frontend server:
    ```bash
    npm start
    ```

    The frontend will now be accessible at `http://localhost:3000`, and the API at `http://localhost:5000`.

### 4. Running Tests

#### Backend Tests
To run backend tests using Jest:

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Run the tests:
    ```bash
    npm test
    ```

#### Frontend Tests
To run frontend tests using React Testing Library:

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2. Run the tests:
    ```bash
    npm test
    ```

---

## Critique Section

### What Would You Have Done Differently If You Had More Time?

If I had more time, I would focus on optimizing the search functionality for performance, especially when searching for nearby food trucks based on coordinates. The current approach may not scale efficiently when dealing with larger datasets. Implementing spatial indexing (e.g., using PostgreSQL's PostGIS extension) would improve query performance for the proximity search.

### What Are the Trade-offs You Might Have Made?

One trade-off made was choosing **React.js** and **Node.js** due to their simplicity and speed of development, but this may not be the most optimal stack for extremely large datasets or highly concurrent requests. In a production environment with more traffic, I would consider adding caching mechanisms (e.g., Redis) to reduce the load on the database.

### What Are the Things You Left Out?

Due to time constraints, I have left out advanced features such as:
- **User Authentication**: No login or user management functionality was implemented.
- **Advanced Search**: More complex search features like filtering by facility type or cuisine were not included.
- **Error Handling**: Although basic error handling is implemented, more robust error management (e.g., for API rate-limiting) is missing.

### Problems with Scaling the Application

If this application were to scale to a large number of users, several challenges would arise:
- **Database Performance**: Querying and filtering large datasets in real-time could become slow. Using a spatial index (PostGIS) or a dedicated geospatial service would help.
- **Caching**: Caching search results and frequently used data (e.g., street name lookups, nearby food trucks) would reduce the load on the server.
- **Load Balancing**: As traffic increases, we would need to implement load balancing and potentially split the backend into multiple services (e.g., microservices) to handle different aspects of the application.

---

## Conclusion

This project demonstrates the ability to build a functional web application with a frontend UI and backend API, leveraging modern web technologies such as React, Node.js, and Docker. While there are always optimizations that could be made, the current implementation fulfills the core requirements and provides a foundation for further development.







# Requirement 

Use this data set about Mobile Food Facilities in San Francisco (https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat/data), build an application (API and UI) with the following features:

- Search by name of applicant. Include optional filter on "Status" field.
- Search by street name. The user should be able to type just part of the address. Example: Searching for "SAN" should return food trucks on "SANSOME ST"
- Given a latitude and longitude, the API should return the 5 nearest food trucks. By default, this should only return food trucks with status "APPROVED", but the user should be able to override this and search for all statuses.
  - You can use any external services to help with this (e.g. Google Maps API).
- For the programming languages allowed we would prefer that you use the one that was discussed with the recruiter or the hiring manager. So make sure that this is clear before you start this challenge, please :) 
- You have creative freedom to design the UI however you would like.
- We write automated tests and we would like you to do so as well.

**Bonus points:**
- Use a frontend framework like React (for frontend focused candidates)
- Use an API documentation tool
- Provide a dockerfile with everything necessary to run your application (for backend focused candidates)

**Note**
If you are a backend focused candidate you will primarily be evaluated on your backend work. If you are a frontend focused candidate you will primarily be evaluated on your frontend work.

## README

Your code should include a README file including the following items:

- Description of the problem and solution;
- Reasoning behind your technical/architectural decisions
- Critique section:
  - What would you have done differently if you had spent more time on this?
  - What are the trade-offs you might have made?
  - What are the things you left out?
  - What are the problems with your implementation and how would you solve them if we had to scale the application to a large number of users?
- Please document any steps necessary to run your solution and your tests.

## How we review

We value quality over feature-completeness. It is fine to leave things aside provided you call them out in your project's README.
The aspects of your code we will assess include:

- Clarity: does the README clearly and concisely explains the problem and solution? Are technical tradeoffs explained?
- Correctness: does the application do what was asked? If there is anything missing, does the README explain why it is missing?
- Code quality: is the code simple, easy to understand, and maintainable? Are there any code smells or other red flags? Does object-oriented code follows principles such as the single responsibility principle? Is the coding style consistent with the language's guidelines? Is it consistent throughout the codebase?
- Security: are there any obvious vulnerabilities?
- Technical choices: do choices of libraries, databases, architecture etc. seem appropriate for the chosen application?

## What to send back to our team
Please send an email back to your point of contact with a link to your Github project repo when done.
