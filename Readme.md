<h1>JWT Authentication</h1>

Welcome to the Node.js JWT Authentication Backend! This project provides a secure and scalable authentication system utilizing JSON Web Tokens (JWT). It features user registration, email verification, login, token validation, and profile retrieval functionalities. Whether you're building a new application or integrating authentication into an existing one, this solution offers robust security and a seamless user experience.

<h2>Features</h2>

- **User Signup**: Register users with a username, email, and password.<br>
- **Email Confirmation**: Send a verification email to users upon registration with a confirmation link.<br>
- **User Signin**: Authenticate users with email and password, issuing a JWT token upon successful login.<br>
- **Token Validation**: Verify the authenticity of user tokens with an isAuthenticated endpoint.<br>
- **Profile Retrieval**: Fetch user profiles by passing the user ID.<br>

<h2>Project Setup</h2>

- Clone the project on your local machine.<br>
- Run "npm install" in root directory of the project.<br>
- Create .env file in project root directory and add following environmental variable: PORT=6001<br>
- Create a connection with MongoDB using mongoose.<br>
- Run "tsc --init" in root directory of the project that will convert typescript code into javascript in a separate folder i.e dist.<br>
- Run "npm start" in root directory of the project to start the server.<br>

<h2>API Documentation</h2>

- **Postman**: https://documenter.getpostman.com/view/37707011/2sA3s9C7ke<br>
