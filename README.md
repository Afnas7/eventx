# event-mgmt
# 🎉 EventX – Explore, Like & Experience Events

**EventX** is a MERN (MongoDB, Express, React, Node.js) web application where users can browse and interact with events. Users can sign up, log in, like events (only once per user), and comment on them.

> 🚀 A fully responsive platform with Light/Dark mode support, toast notifications, and route protection.

---

## 🔥 Features

- 🔐 User Authentication (Signup & Login)
- 🖼️ Event Cards with like & comment system
- 🔒 Protected routes (only logged-in users can like or view event details)
- 🌗 Toggle Light/Dark Mode
- 💬 Toast Notifications (Success/Error)
- 📱 Fully Responsive Design

---

## 🧰 Tech Stack

| Category    | Stack                    |
|-------------|---------------------------|
| Frontend    | React, React Router, Tailwind CSS |
| Backend     | Node.js, Express          |
| Database    | MongoDB (Atlas)           |
| Extras      | Axios, React Hook Form, React Hot Toast |

---

## 🛠️ Installation & Setup

### 📦 Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

### 🔧 Clone the Repo

```bash
git clone https://github.com/Afnas7/eventx.git
cd eventx-main
📁 Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file inside backend/ and add:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=4000
Run the backend server:

bash
Copy
Edit
npm run dev
💻 Frontend Setup
In a new terminal tab:

bash
Copy
Edit
cd Frontend
npm install
npm run dev
Frontend runs at: http://localhost:5173