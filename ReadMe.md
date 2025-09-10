# Product Catalog (ASP.NET Core + React + Azure)



A full-stack product catalog application built with:

- ASP.NET Core Web API (CRUD + Azure Blob integration)

- React (TypeScript + React Router)

- SQL Server (EF Core for migrations)

- Azure Blob Storage for image upload



## Features

- Product CRUD with image upload

- Categories dropdown

- Azure Blob storage integration

- Error handling \& logging

- Uniform API response format



## Project Structure

- /Api -> ASP.NET Core API

- /ClientApp -> React frontend

- /DbScripts -> EF migrations \& SQL scripts



## Run locally

1. Setup database using EF Core migrations.

2. Start API: dotnet run from /Api

3. Start frontend: npm install \&\& npm start from /ClientApp



## Deployment

- API -> Azure App Service

- Frontend -> Azure Static Web Apps

- DB -> Azure SQL Database

\- Images -> Azure Blob Storage

