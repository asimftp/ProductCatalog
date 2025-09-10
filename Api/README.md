# **Product Catalog API**

A RESTful API built with **ASP.NET Core 8.0** for managing products and categories.
This project demonstrates clean architecture, **Entity Framework Core** integration, and **Azure Blob Storage** support for handling images.

## 🚀 **Features**

- **CRUD operations** for Products and Categories
- **Entity Framework Core** with SQL Server
- **Azure Blob Storage** integration for image upload/delete
- **DTOs** for secure data transfer
- **Dependency Injection** & Service Layer pattern
- **Environment-based configuration** (Development, Production)
- **Swagger/OpenAPI** for API documentation

## 📂 **Project Structure**
```
ProductCatalogApi/
├── Configurations/           # Options & settings (e.g., AzureStorageOptions)
├── Controllers/              # API endpoints (ProductController, CategoryController)
├── Data/                     # DbContext & Entity models
├── DTOs/                     # Data Transfer Objects
├── Services/                 # Business logic & Azure Blob integration
├── Properties/               # launchSettings.json
├── appsettings.*.json        # Environment configs
├── Program.cs                # Application entry point
├── ProductCatalogApi.csproj  # Project file
└── README.md                 # Project documentation
```

## ⚡ **Getting Started**

### 🔹 **Prerequisites**

- **.NET 8 SDK**
- **SQL Server** (Local or Azure SQL)
- **Azure Storage Account** (for image handling)

### 🔹 **Setup Steps**

**Clone the repository**

```powershell
git clone <your-repo-url>
cd ProductCatalogApi
```

**Configure Database**
Update `appsettings.Development.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=ProductCatalogDb;Trusted_Connection=True;MultipleActiveResultSets=true"
}
```

**Configure CORS**
Add CORS configuration for frontend integration:

```json
"AllowedOrigins": [ "http://localhost:3000" ]
```

**Configure Azure Storage**


```json
"AzureStorageOptions": {
  "ContainerName": "product-images",
  "ConnectionString": "your-connection-string"
}
```

**Apply EF Migrations**

```powershell
dotnet ef database update
```

**Run the API**

```powershell
dotnet run
```

✅ **API runs at:**

- https://localhost:5000
- http://localhost:5001

## 📡 **API Endpoints**

### **Products**

- `GET /api/products` → Get all products
- `GET /api/products/{id}` → Get product by ID
- `POST /api/products` → Create product (with image upload)
- `PUT /api/products/{id}` → Update product
- `DELETE /api/products/{id}` → Delete product

### **Categories**

- `GET /api/categories` → Get all categories
- `GET /api/categories/{id}` → Get category by ID
- `POST /api/categories` → Create category
- `PUT /api/categories/{id}` → Update category
- `DELETE /api/categories/{id}` → Delete category

### **Images (Azure Blob Storage)**

Upload, update & delete product images via **AzureService**.

## 📖 **API Documentation (Swagger)**

Swagger UI is enabled for exploring and testing API endpoints.
Once the project is running, open:

👉 https://localhost:5000/swagger

_Example Screenshot_

(You can replace this image with your own Swagger screenshot after running the API locally.)

## ⚙️ **Configuration**

- `appsettings.Development.json` → Local development
- `appsettings.Production.json` → Azure/Production deployment
- `AzureStorageOptions` → Blob storage configs

## 🛠️ **Technologies**

- **ASP.NET Core 8.0**
- **Entity Framework Core**
- **SQL Server**
- **Azure Blob Storage**
- **Swagger / OpenAPI**

## 🤝 **Contributing**

Contributions are welcome!

- Open an issue for discussion
- Submit a pull request with improvements

## 📄 **License**

Licensed under the **MIT License**.