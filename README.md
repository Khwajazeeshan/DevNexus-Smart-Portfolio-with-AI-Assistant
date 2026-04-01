# ✨ DevNexus — Smart Portfolio with AI Assistant

A professional, high-performance personal portfolio built with cutting-edge web technologies. This project features a stunning, interactive public view and a comprehensive, fully-responsive management dashboard.

![Portfolio Banner](https://img.shields.io/badge/Powered%20By-Next.js%2016-black?style=for-the-badge&logo=next.js)
![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind 4](https://img.shields.io/badge/Tailwind-CSS%204-06B6D4?style=for-the-badge&logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)

---

## 🚀 Core Features

### 💎 Public Portfolio Experience
- **Interactive UI**: A sleek, dark-themed interface with glassmorphism, vibrant gradients, and smooth micro-animations.
- **Smart Loading Screen**: A premium splash screen with real-time content readiness detection ensures the site only appears once all initial data is fully loaded.
- **Sequential Animations**: Sections (About, Resume, Projects, Contact) load sequentially for a cinematic scrolling experience.
- **AI Chatbot Assistant**: Built-in intelligent chatbot tailored to answer questions about Zeeshan's professional journey.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.

### 🔐 Multi-Modular Admin Dashboard
A centralized management console accessible to the user for real-time portfolio updates:
- **Profile & Identity**: Manage bio, professional summary, and profile images via Cloudinary.
- **Experience Stack**: Full CRUD operations for education and career timelines.
- **Project Showcase**: Add and manage featured works with drag-and-drop reordering functionality.
- **Digital Reach**: Update contact information and synchronized social media links instantly.
- **CV Management**: Upload and manage downloadable professional PDF resumes.

---

## 🛠️ Technical Architecture

### **Frontend**
- **Next.js 16 (App Router)**: Utilizing high-performance server components and client-side transitions.
- **React 19**: Leveraging the latest React features for efficient state management.
- **Tailwind CSS 4**: A modern utility-first styling approach for a truly responsive design.
- **React Icons & FontAwesome**: A rich set of iconography for intuitive navigation.
- **React Hot Toast**: Real-time feedback for administrative actions.

### **Backend & Database**
- **Next.js API Routes**: Serverless execution for handling portfolio data.
- **Mongoose / MongoDB**: Robust JSON-based storage for all dynamic portfolio content.
- **Cloudinary API**: Secure and optimized image storage and delivery.
- **JWT (JSON Web Tokens)**: Secure authentication protocols.

---

## 📦 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Khwajazeeshan/DevNexus-Smart-Portfolio-with-AI-Assistant
cd DevNexus-Smart-Portfolio-with-AI-Assistant
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory and add your credentials:
```env
NEXT_PUBLIC_SERVER=/
DOMAIN=localhost:3000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GROQ_API_KEY=your_groq_key_for_chatbot
JWT_SECRET=your_secret_key
Refresh_Key=your_Refresh_Key
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the portfolio live.

---

## 📂 Project Structure
```text
src/
├── app/
│   ├── Home/               # Public portfolio sections
│   ├── admindashboard/      # Full Admin Dashboard logic & UI
│   ├── api/                 # Portfolio backend logic
│   ├── chatbot/             # AI integration
│   └── globals.css          # Design system & Tailwind config
├── components/              # Shared UI components
├── config/                  # Database connections
└── models/                  # Mongoose data schemas
```

---

## 🎨 Design Philosophy
The project follows a **"Premium-First"** design philosophy, emphasizing high contrast, deep shadows, and cinematic transitions to create a memorable impression on every visitor. The admin dashboard matches this aesthetic while prioritizing utility and data accuracy.

---

Built with ❤️ by **Khawaja Zeeshan**