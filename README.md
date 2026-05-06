<div align="center">

# ✍️ Let's Blog

### *A Dynamic Blog Platform — Read, Write & Connect*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-4F46E5?style=for-the-badge)](https://blog-app-d54d1.web.app)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)

</div>

---

## 📸 Preview

| Homepage | Blog Details | Featured Blogs | Wishlist |
|:--------:|:------------:|:--------------:|:--------:|
| ![Home](./screenshots/1.png) | ![Details](./screenshots/2.png) | ![Featured](./screenshots/4.png) | ![Wishlist](./screenshots/5.png) |

---

## 📌 Overview

**Let's Blog** is a full-stack blogging platform where users can explore, write, and engage with blog posts. It features a rich commenting system, personal wishlists, category filtering, and secure authentication — all wrapped in a smooth, fully responsive UI.

> 🔗 **Live Site:** [https://blog-app-d54d1.web.app](https://blog-app-d54d1.web.app)

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Email/password + Google, Facebook & GitHub via Firebase |
| 📝 **Blog Management** | Create, update, and delete your own blog posts |
| 🔖 **Wishlist** | Save and manage favourite blogs (authenticated users only) |
| 💬 **Comments** | Comment on any blog; owners cannot comment on their own |
| 🏆 **Featured Blogs** | Top blogs ranked by description length |
| 🔍 **Search & Filter** | Search by title, filter by category |
| 📧 **Newsletter** | Subscribe with toast confirmation |
| 🔒 **Private Routes** | Protected pages for authenticated users |
| 🚫 **Custom 404** | Friendly error page for invalid routes |

---

## 🖥️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase_Auth-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Material UI](https://img.shields.io/badge/Material_UI-007FFF?style=flat-square&logo=mui&logoColor=white)
![React Bootstrap](https://img.shields.io/badge/React_Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON-web-tokens&logoColor=white)
![Firebase Admin](https://img.shields.io/badge/Firebase_Admin-FFCA28?style=flat-square&logo=firebase&logoColor=black)

### Deployment
![Firebase Hosting](https://img.shields.io/badge/Firebase_Hosting-FFCA28?style=flat-square&logo=firebase&logoColor=black)

---

## 📁 Project Structure

```
lets-blog/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Home, BlogDetails, Wishlist, Login, 404
│   │   ├── context/            # Auth & global state (Context API)
│   │   ├── hooks/              # Custom React hooks
│   │   └── routes/             # Protected & public routes
│   └── package.json
│
└── server/                     # Express backend
    ├── routes/                 # API route definitions
    ├── controllers/            # Business logic
    ├── models/                 # Mongoose schemas (Blog, User, Comment)
    ├── middleware/             # JWT auth, error handling
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js `v18+`
- MongoDB (local or Atlas)
- Firebase project with Authentication enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/DKAbir111/Let-s-Blog-Client.git
cd Let-s-Blog-Client

# Install client dependencies
npm install

# Clone and set up the server
git clone <server-repo-url>
cd server && npm install
```

### Running the App

```bash
# Start the backend server
cd server
npm start

# Start the frontend
cd client
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the **server** directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Create a `.env` file in the **client** directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

---

## 🚀 Roadmap

- [ ] Rich text editor for writing blogs (e.g., TipTap or Quill)
- [ ] Blog tags and advanced filtering
- [ ] Like / reaction system on posts
- [ ] User profile pages with published blog history
- [ ] Admin panel for content moderation

---

## 👤 Author

**Darun Karas Abir**

[![GitHub](https://img.shields.io/badge/GitHub-DKAbir111-181717?style=for-the-badge&logo=github)](https://github.com/DKAbir111)

---

<div align="center">

⭐ **If you like this project, give it a star!** ⭐

*Built with ❤️ — Keep Writing, Keep Growing!*

</div>
