# Product Catalog – Frontend Application

A modern **React + TypeScript** application for managing product catalogs. It includes a clean UI, image uploads, category management, and responsive design.

## 🚀 Features

**CRUD Operations** – Create, read, update, and delete products

**Image Uploads** – Upload with preview and Azure Blob support

**Dynamic Categories** – Fetch and bind categories from API

**Responsive UI** – Bootstrap 5 for mobile-first design

**TypeScript** – Strongly typed, scalable codebase

**Validation** – Client-side form validation and error handling

**Modern UI** – Clean, professional, production-ready interface

## 🛠️ Tech Stack

**React 18** (Hooks & Components)

**TypeScript** (strict type safety)

**Vite** (fast build tool)

**React Router** (routing)

**Bootstrap 5** (UI styling)

**ESLint** (linting & formatting)

## 📂 Project Structure
```
ClientApp/
├── public/               # Static files
├── src/
│   ├── api/              # API services
│   ├── components/       # Reusable components
│   ├── models/           # TypeScript models
│   ├── pages/            # Page-level views
│   ├── types/            # Shared type definitions
│   ├── App.tsx           # Root app component
│   └── main.tsx          # Entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## ⚡ Quick Start

### Prerequisites

- **Node.js 18+**
- **npm** or **yarn**

### Installation
```bash
git clone <repository-url>
cd ClientApp
npm install
npm run dev
```

Runs on 👉 **http://localhost:3000**

### Scripts
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## ⚙️ Configuration

Create a **`.env`** file:

```env
VITE_API_BASE_URL=http://localhost:5001/api
VITE_APP_NAME=Product Catalog
```

## 🎨 Components & Pages

**ProductForm** – Add/Edit product form with validation & image upload

**ProductCard** – Display product details in a card layout

**CategoryDropdown** – Fetches & displays categories dynamically

**Navbar** – Responsive navigation

### Pages:

**Home** – Product listing & search

**AddProduct** – Create product

**EditProduct** – Update product

## 🚀 Deployment

After **`npm run build`**, deploy the **`dist/`** folder to:

- **Vercel**
- **Netlify**
- **Azure Static Web Apps**
- **AWS S3**

## 🔮 Future Enhancements

- **Advanced form validation** (React Hook Form / Formik)
- **Better image preview UX**
- **Search & filtering**
- **Pagination** for large datasets
- **Dark mode support**

## 📄 License

Licensed under the **MIT License**.

---

💡 **Built with React + TypeScript** for scalable, modern web applications.