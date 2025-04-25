# Web Board Application

A modern web board application built with Next.js and NestJS.

## Technologies Used

### Frontend
- **Next.js 15.3.0** - React framework for server-side rendering
- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Heroicons** - Icon library

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeORM** - Object-Relational Mapping (ORM)
- **PostgreSQL** - Relational database
- **JWT Authentication** - For secure user authentication
- **Swagger** - API documentation
- **Jest** - Testing framework

## Project Structure

```
web-board/
├── frontend/           # Next.js frontend application
│   ├── src/           # Source code
│   ├── public/        # Static files
│   └── package.json   # Frontend dependencies
│
└── backend/           # NestJS backend application
    ├── src/          # Source code
    ├── test/         # Test files
    └── package.json  # Backend dependencies
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd backend
npm install
```

4. Set up environment variables
- Create `.env` files in both frontend and backend directories
- Configure database connection and other necessary variables

### Running the Application

1. Start the backend server
```bash
cd backend
npm run start:dev
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

## Features
- User authentication and authorization
- Post creation and management
- Comment system
- Modern and responsive UI
- RESTful API architecture

## หมายเหตุ
- อย่างแรกต้องขออภัยพี่ HR ด้วยครับที่ผมคิดว่าผมได้ทำการส่ง Test interview ไปแล้วแต่จริงๆเป็นผมเองที่ยังไม่ได้กดส่ง
- สำหรับผมในระยะเวลา ไม่เกิน 2 ชม นั้นไม่สามารถทำทั้งหมดได้ทันครับ (ตัว nest ใช้เวลาดูพอสมควรเพราะไม่เคยทำมาก่อน)
- อาจจะทำได้ไม่ดีมากตามเวลาที่ตั้งไว้
- user สำหรับเข้า bossmiiz
