# 🛠️ Multi Tenant Project Management – Backend

This is the **backend API** for the **Multi-Tenant Project Management** platform. It is built with **TypeScript**, **Express.js**, and **Sequelize**, following scalable and maintainable architecture principles.

The backend handles:

- Multi-tenant user and project management
- File uploads
- Validation using Yup at the controller level
- Centralized exception handling
- RESTful API design with modular routing

---

## 🧱 Tech Stack

| Tool/Library           | Purpose                                      |
|------------------------|----------------------------------------------|
| [Express.js](https://expressjs.com/)       | Web server framework                        |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript                     |
| [Sequelize](https://sequelize.org/)        | ORM for SQL databases                       |
| [Yup](https://github.com/jquense/yup)      | Request validation                          |
| [Multer](https://github.com/expressjs/multer) | File upload middleware                   |
| [dotenv](https://www.npmjs.com/package/dotenv) | Environment variable loader             |

---

## 📁 Features

- 🔐 Multi-tenant support (project separation by tenant)
- 📁 File upload and management via Multer
- 🔄 RESTful API routes
- ✅ Controller-level validation with Yup
- 🧰 Centralized error/exception handling
- 📦 Scalable project structure with modules
- 🛡️ Request sanitization and data validation

---

## 📦 Installation

Make sure you have **Node.js (v16+)** and **npm** or **yarn** installed.

```bash
# Go to project root
cd multi-tenant-project-management-backend

# Install dependencies
npm install
# or
yarn install
````

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the project:

```env
PORT=4000
NODE_ENV=development
DATABASE_URL=postgres://username:password@localhost:5432/your_db
JWT_SECRET=your_secret_key
```

> You can also use individual DB credentials if not using `DATABASE_URL`.

---

## 🧪 Running the Server

### Start in development mode with auto-reload:

```bash
npm run dev
# or
yarn dev
```

### Build and start in production:

```bash
npm run build
npm run start
```

---

## 🧾 API Documentation

Coming soon via Swagger/OpenAPI!

---

## 🏗️ Project Structure

```
src/
├── controllers/       # Request handlers
├── middlewares/       # Error handling, auth, file upload
├── models/            # Sequelize models
├── routes/            # API route definitions
├── utils/             # Utility functions (e.g. file, logger)
├── services/          # Business logic layer (optional)
├── config/            # DB and app configuration
├── types/             # Custom TypeScript types
└── index.ts           # Entry point
```

---

## 📁 File Uploads

File uploads are handled via [Multer](https://github.com/expressjs/multer) and stored locally or via a cloud provider (e.g., S3) based on configuration.

Endpoints accept files as `multipart/form-data` with proper validation and error handling.

---

## ✅ Request Validation with Yup

All incoming requests are validated using Yup schemas inside the `validations/` folder. Middleware intercepts and validates request bodies, query params, or files before hitting the controller.

---

## ❌ Error Handling

Centralized error handling using:

* Custom `Exception` class that supports variety of error types
* Express middleware to catch and respond with uniform error objects
* Automatically handles async errors with `express-async-errors`

---

## 🔐 Authentication (Optional)

If your app uses authentication, you can implement:

* JWT-based middleware
* Role-based access control
* Tenant-aware request context

(Include as per your implementation)

---

## 🧰 Scripts

```bash
npm run dev        # Start dev server with auto-reload
npm run build      # Compile TypeScript
npm run start      # Start compiled app
npm run lint       # Run linter
```

---

## ✅ Sequelize Setup

You can configure your database in `.env`

> Sequelize models are located in `src/models/`, using class-based definitions.

---

## 🧪 Testing (Optional Setup)

This backend can be tested using tools like:

* [Jest](https://jestjs.io/)

Add test setup in a `tests/` directory.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgements

* [Express.js](https://expressjs.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Sequelize](https://sequelize.org/)
* [Yup](https://github.com/jquense/yup)
* [Multer](https://github.com/expressjs/multer)

---

> Built with scalable patterns and modern backend tooling.
