# 🚀 HexaStack AI Solutions | Web & AI Systems for Real Businesses

## 🌟 PROJECT TITLE
**HexaStack AI Solutions** - *Web & AI Systems for Real Businesses*

---

## 📖 OVERVIEW
**Our Enquiry App** is a cutting-edge web application crafted to revolutionize project management, team collaboration, and client interactions. With an intuitive interface and robust features, it streamlines workflows, tracks progress in real-time, and bridges the communication gap between team members and clients.

---

## 🛠️ STACK
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 🎯 PURPOSE
The core mission of this application is to:
*   ✨ **Simplify** project inquiry and management processes.
*   🤝 **Enable** seamless collaboration between team members.
*   📊 **Provide** clients with real-time project updates.
*   💬 **Streamline** communication workflows.
*   📈 **Track** project progress and milestones effectively.
*   ✅ **Facilitate** efficient task allocation and monitoring.

---

## 💼 PAID COLLABORATION
> *This project represents a collaborative effort between professional developers and serves as a commercial product offering. All intellectual property rights are jointly held by the contributing team members. Commercial licensing options are available for organizations interested in deploying this solution.*

---

## 💻 GIT COMMANDS
Essential Git commands to navigate and manage the repository:

```bash
# Clone the repository
git clone https://github.com/suragms/Our-enquiry-app.git

# Pull latest changes
git pull origin main

# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your descriptive commit message"

# Push changes
git push origin main
```

---

## 🌿 GIT NEW BRANCH CREATING COMMANDS
Manage your feature branches with ease:

```bash
# Create and switch to a new branch
git checkout -b feature/new-feature-name

# List all branches
git branch -a

# Switch to an existing branch
git checkout branch-name

# Push new branch to remote
git push -u origin feature/new-feature-name

# Merge branch into main
git checkout main
git merge feature/new-feature-name

# Delete local branch
git branch -d feature/new-feature-name

# Delete remote branch
git push origin --delete feature/new-feature-name
```

---

## 🚀 HOW TO RUN
Get the project up and running on your local machine:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/suragms/Our-enquiry-app.git
    ```

2.  **Navigate to project directory**
    ```bash
    cd Our-enquiry-app
    ```

3.  **Install dependencies**
    ```bash
    npm install
    ```

4.  **Set up environment variables**
    *   Copy `.env.example` to `.env` and update with your MongoDB connection string.
    *   Or use the existing `.env` file (already configured for the team).

5.  **Initialize Database**
    ```bash
    npx prisma generate
    npm run db:push
    ```

6.  **Seed the database with admin user**
    ```bash
    npm run db:seed
    ```

7.  **Verify setup**
    ```bash
    npm run verify
    ```

8.  **Start the development server**
    This command starts both the Express backend and Vite frontend concurrently.
    ```bash
    npm run dev
    ```

9.  **Open your browser**
    *   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)
    *   Backend API runs on [http://localhost:3000](http://localhost:3000) (or configured port)
    *   Default Admin Credentials: `admin@example.com` / `admin123`

---

## 📂 STRUCTURE OF THE PROJECT
A quick look at the project's architecture:

```
Our-enquiry-app/
├── 📂 server/                  # Backend (Node.js/Express)
│   ├── 📂 routes/              # API endpoints
│   ├── 📂 utils/               # Backend helper functions
│   ├── db.ts                   # Database connection setup
│   ├── index.ts                # Server entry point
│   ├── seed.ts                 # Database seeding script
│   └── verify-setup.ts         # Setup verification script
├── 📂 src/                     # Frontend (React + Vite)
│   ├── 📂 components/          # Reusable UI components
│   │   └── 📂 ui/              # shadcn/ui component library
│   ├── 📂 contexts/            # Global state (Auth, Theme)
│   ├── 📂 hooks/               # Custom React hooks
│   ├── 📂 lib/                 # Frontend utilities
│   ├── 📂 pages/               # Application Routes/Pages
│   │   ├── Admin.tsx           # Admin Dashboard
│   │   ├── Contact.tsx         # Contact/Enquiry Page
│   │   ├── Home.tsx            # Landing Page
│   │   └── Work.tsx            # Project Showcase Page
│   ├── App.tsx                 # Main Component with Routing
│   ├── globals.css             # Global Styles & Tailwind
│   └── main.tsx                # React Entry Point
├── 📂 prisma/                  # Database Schema & Migrations
├── 📂 public/                  # Static Assets (Images, Icons)
├── 📂 netlify/                 # Netlify Serverless Functions
└── 📄 vite.config.ts           # Vite Configuration
```

---

## 🧠 STACK EXPLANATION

### **Frontend Technologies**
*   **React 19**: The latest version of the popular library for building user interfaces.
*   **Vite**: Next-generation frontend tooling for lightning-fast development servers and builds.
*   **TypeScript**: Ensures type safety and enhances the developer experience with robust tooling.
*   **Tailwind CSS (v4)**: A utility-first CSS framework for rapid and responsive UI development.
*   **shadcn/ui**: Beautifully designed, accessible, and customizable components.

### **Backend Technologies**
*   **Node.js/Express**: Robust backend API handling business logic and request processing.
*   **Prisma**: A modern ORM for type-safe database access and schema management.
*   **MongoDB**: Flexible, robust NoSQL database for scalable data storage.
*   **JWT Authentication**: Secure stateless authentication mechanism.

### **Development Tools**
*   **ESLint**: Enforces code quality and consistency.
*   **Prettier**: Automates code formatting for a clean codebase.
*   **Concurrently**: Runs client and server processes simultaneously for a seamless dev experience.

---

## 🚀 DEPLOYMENT

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Quick Deployment Checklist:
1. ✅ Ensure MongoDB Atlas cluster is running.
2. ✅ Run `npm run verify` to check local setup.
3. ✅ Set environment variables in your hosting provider (Netlify/Vercel/Render):
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. ✅ Build for production:
   ```bash
   npm run build
   ```

**Helpful Commands:**
```bash
# Verify database and setup
npm run verify

# Seed admin user
npm run db:seed
```

For troubleshooting, see [FIXES_SUMMARY.md](./FIXES_SUMMARY.md)

---

## 🏁 CONCLUSION
**Our Enquiry App** demonstrates the power of modern web technologies combined with thoughtful design to create a robust solution for project management and collaboration. The application showcases best practices in full-stack development using React, Vite, and Node.js.

---

## 🙏 THANK YOU ALL
We extend our deepest gratitude to everyone who contributed to making this project a reality. Special thanks to our core team members who dedicated countless hours to bring this vision to life.

### **'OUR PROJECTS WORKS ENQUIRY' APPROVAL**
*This project is approved by the team members.*

### 👥 TEAM MEMBERS
*   **👨‍💻 ANANDU** - *Lead Developer & Architect*
*   **👨‍💻 SURAG** - *Full Stack Developer & Project Manager*

### 🤝 COLLABORATIVE WORK
This project represents months of dedicated collaborative effort, combining diverse skills and perspectives to create a comprehensive solution that addresses real-world project management challenges.

---

## 📞 CONTACT US
For inquiries, collaborations, or support, please reach out:

📧 **officialsurag@gmail.com**

---
*Built with ❤️ and passion for excellence in software development.*