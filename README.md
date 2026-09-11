# ZEN VY — Full-Stack E-Commerce Platform

> A modern fashion e-commerce web application built with the **MERN stack**. It delivers a complete shopping experience — product discovery, filtering, cart management, Razorpay checkout, order tracking — along with a role-based admin dashboard for managing catalog inventory.

[Live Demo](https://e-commerce-app-beta-inky.vercel.app) · [GitHub Repository](https://github.com/aryan9870/E-commerce-App)

---

## Overview

**ZEN VY** is an end-to-end e-commerce platform for fashion and apparel retail, built as a full-stack project to demonstrate production-grade web development skills. The project covers the entire development lifecycle: REST API design, MongoDB data modeling, secure authentication, third-party payment and media integrations, and a component-driven React frontend.

**What the project demonstrates:**

- Secure user authentication with **JWT (HTTP-only cookies)** and **bcrypt** password hashing
- **Role-based access control** separating regular shoppers from administrators
- Server-persisted **shopping cart** with intelligent item merging
- **Razorpay payment gateway** integration with server-side signature verification
- **Cloudinary** cloud image storage for product media
- **Joi** request validation and centralized error handling on the backend
- Client-side **filtering, sorting, search, and pagination** on the frontend

---

## Features

### Storefront & Shopping
- Responsive **home page** with hero banner, brand marquee, and curated product sections (*New Arrivals* & *Top Selling*)
- **Collection page** with filters for category (Men/Women/Kids), type, price range (slider), and size
- **Sorting** by newest, highest rated, and price (low-to-high / high-to-low)
- **Pagination** (9 products per page) on the product grid
- **Debounced search** across product name, category, sub-category, and brand
- **Product detail pages** with image gallery, size/color selection, quantity controls, and similar-product recommendations
- Star **rating display** on product cards and detail views

### Authentication & User Account
- User **registration** and **login** with bcrypt password hashing
- **JWT session** stored in secure HTTP-only cookies (7-day expiry)
- **Persistent auth check** on app load via `/users/is-auth`
- **Logout** with cookie clearing and cart state reset
- **Role-based routing** — admin users access the dashboard; regular users see the cart

### Cart & Checkout
- **Server-persisted cart** tied to the authenticated user
- Add items with product ID, quantity, size, and color
- **Smart merging** — same product + size + color increments quantity instead of duplicating
- Update quantity, remove items, and clear cart
- **Checkout flow** with delivery address form and order summary (subtotal, discount, shipping)
- **Razorpay** payment with server-side **HMAC-SHA256 signature verification**
- **Order history** page showing status, date, and item summaries

### Admin Dashboard
- **Admin-only routes** protected by `role: "admin"`
- **Add products** with multi-image upload (up to 3 images), sizes, pricing, stock, and featured flag
- **List and delete products** from inventory
- **Order management** — fetch all orders and update order status

### Backend & Security
- **Joi validation** on all request bodies (users, products, cart, orders, reviews)
- **Multer** in-memory image upload with type and 2 MB size limits
- **Cloudinary** integration for product image storage
- **Centralized error handling** middleware with consistent JSON responses
- **CORS** configured for the client origin with credentials support

---

## Tech Stack

| Layer      | Technology                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------- |
| Frontend   | React 19, Vite 7, Tailwind CSS 4, React Router 7, Zustand, Axios, React Hot Toast, React Icons, rc-slider |
| Backend    | Node.js, Express 5, Mongoose 9, JWT, bcrypt, Joi, Multer, Cloudinary, Razorpay, cookie-parser, CORS |
| Database   | MongoDB                                                                                           |
| Payments   | Razorpay (client SDK + server verification)                                                       |
| Media      | Cloudinary (cloud image storage)                                                                  |

---

## Architecture

This is a **monorepo** with separate `client/` and `server/` directories communicating over a REST API.

```
E-commerce-App/
├── client/                          # React frontend (Vite)
│   └── src/
│       ├── components/              # Reusable UI (Navbar, Hero, Filter, ProductCard, PaymentButton, ...)
│       ├── pages/                   # Route-level components (Home, Collection, Product, Cart, CheckOut, Dashboard, ...)
│       ├── store/                   # Zustand stores (auth, cart, products, UI)
│       ├── App.jsx                  # Root router & layout
│       └── main.jsx                 # Entry point
│
└── server/                          # Express backend
    ├── config/                      # MongoDB, Cloudinary, Razorpay setup
    ├── controllers/                 # Route handlers (user, product, cart, order)
    ├── middlewares/                 # Auth guards, Joi validation, Multer upload
    ├── models/                      # Mongoose schemas (User, Product, Cart, Order)
    ├── routes/                      # Express routers
    ├── validations/                 # Joi schemas
    ├── utils/                       # Custom error handler
    └── server.js                    # App entry point
```

### Data Flow

```
┌─────────────┐     HTTP + Cookies      ┌─────────────┐     Mongoose     ┌─────────────┐
│   React     │ ◄──────────────────────► │   Express   │ ◄──────────────► │   MongoDB   │
│   Client    │     /api/v1/*           │   Server    │                  │             │
└─────────────┘                         └──────┬──────┘                  └─────────────┘
                                               │
                                    ┌──────────┴──────────┐
                                    │                     │
                              ┌─────▼─────┐        ┌──────▼──────┐
                              │ Cloudinary │        │  Razorpay   │
                              │  (Images)  │        │ (Payments)  │
                              └───────────┘        └─────────────┘
```

---

## Key Implementation Highlights

These are the technical decisions and challenges solved in the project:

| Area                    | Implementation                                                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------------------------------- |
| Secure authentication   | JWT stored in **HTTP-only cookies** with `secure` and `sameSite` flags set per environment                     |
| Payment security        | Razorpay order created on the **server**; HMAC-SHA256 signature verified before persisting the order            |
| Image upload pipeline   | Multer **memory storage** → Cloudinary upload stream → URL saved to MongoDB (no local disk dependency)          |
| Cart deduplication      | Server-side matching of **product + size + color** before creating duplicate line items                          |
| Role-based access       | `isLoggedIn` and `isAdmin` middleware guards protect routes; frontend conditionally renders admin routes         |
| Input validation        | Centralized **Joi** validation middleware for consistent request validation across all endpoints                |
| Cross-origin auth       | CORS with `credentials: true` and explicit client origin whitelist                                             |
| Responsive UX           | Mobile filter modal, collapsible navbar menu, and Tailwind responsive breakpoints throughout                     |

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- [Cloudinary](https://cloudinary.com/) account
- [Razorpay](https://razorpay.com/) test account

### 1. Clone the repository

```bash
git clone https://github.com/aryan9870/E-commerce-App.git
cd E-commerce-App
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Install frontend dependencies

```bash
cd ../client
npm install
```

### 4. Configure environment variables

Create a `.env` file in the `server/` directory and a `.env` file in the `client/` directory (see [Environment Variables](#environment-variables) below).

### 5. Start the development servers

**Terminal 1 — Backend:**

```bash
cd server
npm run dev
```

The API runs at `http://localhost:5000`.

**Terminal 2 — Frontend:**

```bash
cd client
npm run dev
```

The app runs at `http://localhost:5173`.

### 6. Create an admin user (optional)

Register a user through the app, then update their role in MongoDB:

```js
db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } })
```

---

## Environment Variables

### Server (`server/.env`)

```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
MONGO_URI=mongodb://127.0.0.1:27017/zen-vy-ecommerce

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay (Payments)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
```

> **Note:** Never commit `.env` files to version control — they are already excluded by `.gitignore`.

---

## API Endpoints

Base URL: `http://localhost:5000/api/v1`

| Method   | Endpoint                         | Auth       | Description                                               |
| -------- | -------------------------------- | ---------- | --------------------------------------------------------- |
| `POST`   | `/users/register`                | Public     | Register a new user                                       |
| `POST`   | `/users/login`                   | Public     | Log in and receive a JWT cookie                            |
| `GET`    | `/users/logout`                  | User       | Log out and clear the cookie                               |
| `GET`    | `/users/is-auth`                 | User       | Check the current authenticated session                    |
| `GET`    | `/products`                      | Public     | Get all products (`?q=` for search)                        |
| `GET`    | `/products/:id`                  | Public     | Get a single product by ID                                 |
| `POST`   | `/products`                      | Admin      | Create a product (multipart/form-data with images)         |
| `DELETE` | `/products/:id`                  | Admin      | Delete a product                                           |
| `POST`   | `/products/:id/review`           | User       | Add a review to a product                                  |
| `DELETE` | `/products/:id/review/:reviewId` | User/Admin | Delete a review                                            |
| `GET`    | `/products/:id/similar`          | Public     | Get similar products by sub-category                       |
| `GET`    | `/carts`                         | User       | Get the user's cart (populated with products)              |
| `POST`   | `/carts`                         | User       | Add an item to the cart                                    |
| `PUT`    | `/carts/:productId`              | User       | Update quantity (`increment` / `decrement`)                |
| `DELETE` | `/carts/:productId`              | User       | Remove an item from the cart                               |
| `DELETE` | `/carts`                         | User       | Clear the entire cart                                      |
| `POST`   | `/orders`                        | User       | Create a Razorpay order                                    |
| `POST`   | `/orders/verify`                 | User       | Verify payment and save the order                          |
| `GET`    | `/orders/my-orders`              | User       | Get the logged-in user's orders                            |
| `GET`    | `/orders/:id`                    | User       | Get a single order by ID                                   |
| `GET`    | `/orders`                        | Admin      | Get all orders                                             |
| `PUT`    | `/orders/:id`                    | Admin      | Update order status (`pending` / `shipped` / `delivered`)  |

---

## Usage

### For Shoppers
1. Browse the home page or open **Collection** to explore all products.
2. Use **filters** and **sort options** to narrow results, or the **search bar** to find products.
3. Open a product to view details — select **color**, **size**, and **quantity**, then **Add to Cart**.
4. **Sign up / log in** to persist your cart on the server.
5. Open the **cart**, review items, and proceed to **Checkout**.
6. Fill in the **delivery address**, select **Razorpay**, and click **Proceed To Buy**.
7. Complete the payment in the Razorpay modal — view your order under **Orders**.

### For Admins
1. Log in with an account that has `role: "admin"`.
2. Click **Dashboard** in the navbar.
3. **Add Items** — upload product images, fill details, select sizes, and submit.
4. **List Items** — view and delete products from inventory.
5. **Orders** — manage order fulfillment.

### Build for Production

```bash
# Frontend
cd client
npm run build        # Output in client/dist/
npm run preview      # Preview the production build locally

# Backend
cd server
npm start            # Runs server.js (ensure NODE_ENV=production)
```

---

## Roadmap / Future Improvements

- [ ] Complete the **admin Orders UI** (backend API is ready)
- [ ] Add a **product review UI** on the frontend (API endpoints already exist)
- [ ] Implement **Cash on Delivery (COD)** flow
- [ ] Add **protected route wrappers** for checkout, cart, and order pages
- [ ] Server-side **pagination and filtering** for large product catalogs
- [ ] **Email notifications** for order confirmation and status updates
- [ ] **Wishlist** functionality
- [ ] **Inventory sync** — decrement stock on successful order placement
- [ ] **Unit and integration tests** for API routes and critical user flows

---

## Author

**Aryan** — BCA Student & Full-Stack Developer

- GitHub: [@aryan9870](https://github.com/aryan9870)
- Email: [aryan7017n@gmail.com](mailto:aryan7017n@gmail.com)
- Repository: [E-commerce-App](https://github.com/aryan9870/E-commerce-App)

---

Built with React, Express, MongoDB, Cloudinary, and Razorpay · © 2026 ZEN VY
