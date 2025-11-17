# OUR PROJECTS WORKS ENQUIRY

## PROJECT TITLE
Our Enquiry App - A Comprehensive Project Management and Collaboration Platform

## OVERVIEW
Our Enquiry App is a modern web application designed to streamline project management, team collaboration, and client interactions. This platform provides an intuitive interface for managing projects, tracking progress, and facilitating communication between team members and clients.

## STACK
- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend**: Node.js API routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **State Management**: React Context API
- **Deployment**: Vercel

## PURPOSE
The purpose of this application is to:
- Simplify project inquiry and management processes
- Enable seamless collaboration between team members
- Provide clients with real-time project updates
- Streamline communication workflows
- Track project progress and milestones
- Facilitate efficient task allocation and monitoring

## PAID COLLABORATION
This project represents a collaborative effort between professional developers and serves as a commercial product offering. All intellectual property rights are jointly held by the contributing team members. Commercial licensing options are available for organizations interested in deploying this solution.

## GIT COMMANDS
Basic Git commands for working with this repository:

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

## GIT NEW BRANCH CREATING COMMANDS
Creating and managing branches for feature development:

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

## HOW TO RUN
Follow these steps to run the application locally:

```bash
# 1. Clone the repository
git clone https://github.com/suragms/Our-enquiry-app.git

# 2. Navigate to project directory
cd Our-enquiry-app

# 3. Install dependencies
npm install

# 4. Set up environment variables
# Copy .env.example to .env and update values

# 5. Run database migrations
npx prisma migrate dev

# 6. Start the development server
npm run dev

# 7. Open browser to
http://localhost:3000
```

For production build:
```bash
# Build the application
npm run build

# Start production server
npm start
```

## STRUCTURE OF THE PROJECT
```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes for backend functionality
│   ├── feedback/          # Feedback collection pages
│   └── ...                # Other page components
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui component library
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
│   ├── auth.ts           # Authentication utilities
│   ├── db.ts             # Database connection and queries
│   └── utils.ts          # General utility functions
└── ...                   # Additional source files

public/                   # Static assets
prisma/                   # Prisma schema and migrations
```

## STACK EXPLANATION

### Frontend Technologies
- **Next.js 15**: React framework with App Router for optimal performance and SEO
- **TypeScript**: Provides type safety and improved developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Accessible and customizable component library

### Backend Technologies
- **Next.js API Routes**: Serverless functions for backend logic
- **Prisma**: Modern ORM for database operations with type safety
- **SQLite**: Lightweight database solution for development
- **NextAuth.js**: Authentication library for secure user management

### Development Tools
- **ESLint**: Code quality and consistency enforcement
- **Prettier**: Automated code formatting
- **Jest**: Testing framework for unit and integration tests

## CONCLUSION
Our Enquiry App demonstrates the power of modern web technologies combined with thoughtful design to create a robust solution for project management and collaboration. The application showcases best practices in full-stack development while providing a solid foundation for future enhancements.

## THANK YOU ALL
We extend our gratitude to everyone who contributed to making this project a reality. Special thanks to our core team members who dedicated countless hours to bring this vision to life.

### TEAM MEMBERS
- **Anandu** - Lead Developer & Architect
- **Surag** - ME - Full Stack Developer & Project Manager

### COLLABORATIVE WORK
This project represents months of dedicated collaborative effort, combining diverse skills and perspectives to create a comprehensive solution that addresses real-world project management challenges.

### CONTACT US
For inquiries, collaborations, or support:
📧 officialsurag@gmail.com

---
*Built with passion and dedication for excellence in software development*