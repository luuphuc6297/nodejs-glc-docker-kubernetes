
This repository is a learning project for me to learn about Docker, Kubernetes, and GitHub Actions. It also consolidates my knowledge to structure a template for ExpressJS, and the project has integration with Sentry to monitor the app.

The project uses the following technologies:

Node.js
ExpressJS
MongoDB
Docker
Kubernetes
GitHub Actions
Sentry
To run the app, you need to have Docker and Kubernetes installed. Then, you can run the following commands to build and deploy the app:

# Build the Docker image
docker build -t nodejs-glc-docker-kubernetes .

# Push the Docker image to a registry
docker push nodejs-glc-docker-kubernetes

# Create a Kubernetes cluster
kubectl create cluster

# Deploy the app to the Kubernetes cluster
kubectl apply -f deployment.yaml
Once the app is deployed, you can access it at the following URL:

http://localhost:8080
Additional information:

The app has a simple API with the following endpoints:

GET /users: Get a list of all users
POST /users: Create a new user
PUT /users/:id: Update a user
DELETE /users/:id: Delete a user
The app also has a simple UI that you can access at the following URL:

http://localhost:8080/ui
The UI allows you to create, update, and delete users. It also displays a list of all users.
