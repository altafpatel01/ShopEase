ShopEase

ShopEase is a modern, minimalist, and feature-rich eCommerce platform designed to deliver an exceptional online shopping experience. It provides seamless navigation, advanced filtering options, secure payment processes, and robust cart and order management features.
🚀 Features
Customer Features

    🔐 Secure JWT-based Authentication (Signup, Login, Logout)
    🔍 Advanced Product Filtering by Categories and Prices
    🛒 Cart Management with LocalStorage Persistence
    📦 Step-by-Step Checkout with Shipping Details
    📑 Order Confirmation Page for Cart and Shipping Details

Admin Features

    🛠 Product Management (Add, Update, Remove Products)
    📋 Order Management
    📊 Dashboard Overview of Sales and Inventory

🛠 Tech Stack
Frontend

    ⚛️ React.js: Interactive user interface
    🧰 Redux Toolkit: State management
    🎨 Tailwind CSS: Modern and minimalist UI
    🚦 React Router v6: Efficient routing and navigation

Backend

    🟢 Node.js: Backend server
    📦 Express.js: RESTful API framework
    🗂 MongoDB: Database for data storage
    🍪 JWT & Cookies: Secure authentication

📑 Setup Instructions
Prerequisites

Ensure you have the following installed:

    Node.js
    MongoDB
    npm or yarn

Installation Steps

    Clone the repository:

git clone https://github.com/your-username/shopease.git

Navigate to the project directory:

cd shopease

Install dependencies for both frontend and backend:

cd backend && npm install
cd ../frontend && npm install

Create a .env file in the backend directory and add:

PORT=4000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
cloudnariy api
email host
email password 


Start the servers:

    Backend:

cd backend
npm run dev

Frontend:

        cd frontend
        npm start

🧩 Folder Structure

ShopEase/
├── frontend/  
│   ├── src/  
│   └── public/  
├── backend/  
│   ├── models/  
│   ├── routes/  
│   └── controllers/  
└── README.md

🎨 Design Features

    Minimalist & Modern UI
    Fully Responsive Layout
    Tailwind CSS for custom animations

⚠️ Known Issues

    Performance optimization for larger product catalogs is in progress.

👨‍💻 Author

    Altaf Patel
    Trainee Software Developer
