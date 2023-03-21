# React Frontend Application
This project is the frontend for a fullstack application to manage people, addresses and cities. 
The backend is a REST API built with Spring Boot application, which can be found here: https://github.com/joshua-lehmann/PersonenVerwaltungREST

## Functionality
The application allows the user to create, read and delete people, addresses and cities. 

## Technologies
The frontend is built with React and uses the following libraries:
- [React Router](https://reactrouter.com/en/main) for client side routing
- [Axios](https://axios-http.com/docs/intro) for HTTP requests
- [Antd](https://ant.design/components/overview/) for UI components
- [Dayjs](https://day.js.org/) for date management and formatting

## Run the application
No matter how you run the application, it will fully work if you also have the backend installed and running locally. For instructions how to do that see here:https://github.com/joshua-lehmann/PersonenVerwaltungREST#readme
### Running and viewing the app with Docker
The easiest way to run the application is to use the provided docker-compose file. The only prerequisite is to have [Docker](https://docs.docker.com/get-docker/) installed.
You do not need any other programs or dependencies to run the app with docker.
The docker-compose file will build the application to a static site and creates a docker image which runs this site with nginx.
To start it run `docker-compose up` in the root directory of the project. After that you can view the app at http://localhost:8081.
### Running and developing the app locally
If you want to develop you need to run the app locally and install some prerequisites.
1. Install [Node.js](https://nodejs.org/en/download/) minimum version 16.0.0
2. Install all dependencies with `npm install`
3. Run the app with `npm run dev`
4. Now you can access the app at http://localhost:5173/