Project Name: Node.js Express App with Docker, Kubernetes, and GitHub Actions

Project Overview

This repository is a learning project focused on Docker, Kubernetes, and GitHub Actions. It serves as a consolidation of knowledge in structuring a template for ExpressJS applications and includes integration with Sentry for application monitoring.

Technologies Used
Node.js
ExpressJS
MongoDB
Docker
Kubernetes
GitHub Actions
Sentry
Running the Application

Ensure Docker and Kubernetes are installed on your system. Then, execute the following commands:

# Build the Docker image
docker build -t nodejs-glc-docker-kubernetes .

# Push the Docker image to a registry
docker push nodejs-glc-docker-kubernetes

# Create a Kubernetes cluster
kubectl create cluster

# Deploy the app to the Kubernetes cluster
kubectl apply -f deployment.yaml
Access the app at: http://localhost:8080

API Endpoints

GET /api/users: Get a list of all users
POST /api/users: Create a new user
PUT /api/users/:id: Update a user
DELETE /api/users/:id: Delete a user
User Interface

Access the UI at: http://localhost:8080/

The UI allows the creation, update, and deletion of users and displays a list of all users.

Additional Features

Kubernetes Configuration (K8s)
Kubernetes configurations are located in the k8s directory. Adjust deployment.yaml, service.yaml, and ingress.yaml as necessary.

Unit Testing
Unit tests are implemented using Jest and Supertest. Run tests with:

shell
Copy code
npm test
Email Integration with Mailgun
The project uses Mailgun for email services. Configure with:

MAILGUN_API_KEY: Your Mailgun API key.
MAILGUN_DOMAIN: Your registered Mailgun domain.
Emails are sent through mailer.js in the utils directory.

Centralized Logging Configuration
Sentry is used for monitoring. Set up by:

Obtaining a Sentry DSN (Data Source Name).
Updating the DSN in your environment config.
Sentry is recommended for tracking runtime errors and performance monitoring.

Contribution Guidelines

Contributions are welcome! Please read our Contribution Guidelines for more information on how to contribute.
