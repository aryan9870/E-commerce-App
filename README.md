# ZEN VY — Full-Stack E-Commerce Platform

> A modern fashion e-commerce web app built with the **MERN stack** — product browsing, cart, Razorpay checkout, order tracking, and a role-based admin dashboard.

[Live Demo](https://e-commerce-app-beta-inky.vercel.app) · [GitHub Repository](https://github.com/aryan9870/E-commerce-App)

---

## Overview

**ZEN VY** is an end-to-end e-commerce platform for fashion and apparel. It demonstrates a full development lifecycle: REST API design, MongoDB modeling, JWT authentication, Razorpay payments, Cloudinary media storage, and a component-driven React frontend.

---

## Features

- **Storefront** — home page, product collection with filters (category, type, price, size), sorting, pagination, and debounced search
- **Product pages** — image gallery, size/color selection, quantity controls, similar-product recommendations, star ratings
- **Authentication** — JWT in HTTP-only cookies, bcrypt hashing, persistent auth check, role-based routing
- **Cart** — server-persisted cart with smart merging (product + size + color)
- **Checkout** — delivery address form, order summary, Razorpay payment with server-side signature verification
- **Orders** — order history with status tracking
- **Admin dashboard** — add/list/delete products (multi-image Cloudinary upload) and manage orders
- **Security** — Joi validation, Multer upload limits, centralized error handling, CORS with credentials

---

## Tech Stack

**Frontend:** React 19, Vite 7, Tailwind CSS 4, React Router 7, Zustand, Axios

**Backend:** Node.js, Express 5, Mongoose 9, JWT, bcrypt, Joi, Multer, Cloudinary, Razorpay

**Database:** MongoDB

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account
- Razorpay test account

### Installation

```bash
git clone https://github.com/aryan9870/E-commerce-App.git
cd E-commerce-App

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### Environment Variables

Copy the example files and fill in your values:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

| Variable                 | Description                          |
| ------------------------ | ------------------------------------ |
| `MONGO_URI`              | MongoDB connection string            |
| `JWT_SECRET`             | Secret key for JWT signing           |
| `CLOUDINARY_*`           | Cloudinary credentials for images    |
| `RAZORPAY_KEY_ID`        | Razorpay key ID                      |
| `RAZORPAY_KEY_SECRET`    | Razorpay key secret                  |
| `VITE_API_URL`           | Backend API base URL                 |
| `VITE_RAZORPAY_KEY_ID`   | Razorpay key ID for the client       |

### Run

```bash
# Terminal 1 — Backend
cd server
npm run dev            # http://localhost:5000

# Terminal 2 — Frontend
cd client
npm run dev            # http://localhost:5173
```

### Create an Admin User

Register a user, then update their role in MongoDB:

```js
db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } })
```

---

## API Endpoints

Base URL: `http://localhost:5000/api/v1`

| Method   | Endpoint                         | Auth       | Description                              |
| -------- | -------------------------------- | ---------- | ---------------------------------------- |
| `POST`   | `/users/register`                | Public     | Register a new user                      |
| `POST`   | `/users/login`                   | Public     | Log in and receive a JWT cookie          |
| `GET`    | `/users/logout`                  | User       | Log out and clear the cookie             |
| `GET`    | `/users/is-auth`                 | User       | Check the current session                |
| `GET`    | `/products`                      | Public     | Get all products (`?q=` for search)      |
| `GET`    | `/products/:id`                  | Public     | Get a single product                     |
| `POST`   | `/products`                      | Admin      | Create a product (multipart images)      |
| `DELETE` | `/products/:id`                  | Admin      | Delete a product                         |
| `GET`    | `/products/:id/similar`          | Public     | Get similar products                     |
| `GET`    | `/carts`                         | User       | Get the user's cart                      |
| `POST`   | `/carts`                         | User       | Add an item to the cart                  |
| `PUT`    | `/carts/:productId`              | User       | Update quantity                          |
| `DELETE` | `/carts/:productId`              | User       | Remove an item from the cart             |
| `DELETE` | `/carts`                         | User       | Clear the cart                           |
| `POST`   | `/orders`                        | User       | Create a Razorpay order                  |
| `POST`   | `/orders/verify`                 | User       | Verify payment and save the order        |
| `GET`    | `/orders/my-orders`              | User       | Get the user's orders                    |
| `GET`    | `/orders`                        | Admin      | Get all orders                           |
| `PUT`    | `/orders/:id`                    | Admin      | Update order status                      |

---

## Author

**Aryan** — BCA Student & Full-Stack Developer

- GitHub: [@aryan9870](https://github.com/aryan9870)
- Email: [aryan7017n@gmail.com](mailto:aryan7017n@gmail.com)

---

Built with React, Express, MongoDB, Cloudinary, and Razorpay · © 2026 ZEN VY
