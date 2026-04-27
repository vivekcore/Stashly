# Stashly

A full-stack collaborative note-taking and content creation platform with a rich text editor powered by Tiptap.

## 🎯 Project Overview

Stashly is a web application designed for users to create, edit, and collaborate on rich-text documents. The platform features a powerful editor with extensive formatting capabilities, user authentication, and real-time interactions.

### Key Features

- **Rich Text Editor** - Powered by Tiptap with support for:
  - Text formatting (bold, italic, underline, strikethrough)
  - Headers and block quotes
  - Code blocks and inline code
  - Lists (ordered, unordered, and todo lists)
  - Images and links
  - Text alignment and highlighting
  - Subscript and superscript
  - Horizontal rules

- **User Authentication** - Secure JWT-based authentication with bcrypt password hashing
- **Responsive Design** - Built with TailwindCSS for mobile and desktop
- **State Management** - Redux Toolkit for centralized state management
- **Database** - MongoDB for data persistence
- **API-driven** - RESTful backend API

## 🏗️ Project Structure

```
Stashly/
├── backend/                   # Express.js backend API server
│   ├── src/
│   │   ├── config.ts         # Configuration management
│   │   ├── index.ts         # Server entry point
│   │   ├── db/              # Database configuration
│   │   ├── routes/          # API route handlers
│   │   ├── middlewares/     # Express middlewares
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils.ts        # Utility functions
│   ├── .env.example        # Environment variables template
│   └── package.json
│
├── frontend/                 # React + Vite frontend application
│   ├── src/
│   │   ├── app/            # App components
│   │   ├── components/     # Reusable React components
│   │   │   ├── tiptap-*   # Tiptap editor related components
│   │   │   └── ui/        # UI components
│   │   ├── features/       # Redux slices (AlertSlice, FormSlice, UserSlice)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/          # Utility libraries
│   │   ├── Helper/       # Helper functions (embeddings, URL detection)
│   │   ├── pages/        # Page components
│   │   ├── icons/       # Icon components
│   │   ├── styles/     # Global styles
│   │   ├── assets/     # Static assets
│   │   ├── App.tsx     # Main app component
│   │   └── main.tsx    # React entry point
│   ├── tailwind.config.ts  # TailwindCSS configuration
│   └── package.json
│
├── README.md                 # This file
└── plan.md                  # Project plan
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/Stashly.git
   cd Stashly
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string and other credentials
   npm run dev
   ```

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Environment Variables

#### Backend (.env)

Create a `.env` file in `backend/` with:

```env
# MongoDB Connection String
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/stashly

# Server Port
PORT=3000

# JWT Secret Key (generate a strong random string)
USER_SECRET_KEY=your-secret-key-here

# Bcrypt Salt Rounds
SALTROUND=10
```

See [.env.example](./backend/.env.example) for reference.

## 📦 Tech Stack

### Frontend

- **React** 19 - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Tiptap** - Headless rich text editor
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend

- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** (jsonwebtoken) - Authentication
- **bcrypt** - Password hashing
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing

## 🛠️ Available Scripts

### Backend

```bash
# Development mode
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start
```

### Frontend

```bash
# Development server with HMR
npm run dev

# Production build
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Preview production build
npm run preview
```

## 📝 API Endpoints

### User Routes

- `POST /user/register` - User registration
- `POST /user/login` - User login
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

_(Add more endpoints as your API expands)_

## 🔐 Security Considerations

- Environment variables are stored in `.env` and excluded from version control
- Passwords are hashed using bcrypt before storage
- JWT tokens are used for stateless authentication
- CORS is configured to prevent unauthorized cross-origin requests
- Input validation using Zod schemas

## 📱 Responsive Design

The frontend is fully responsive and tested on:

- Mobile devices (< 640px)
- Tablets (640px - 1024px)
- Desktops (> 1024px)

## 🧪 Testing

_(Add testing setup details here once configured)_

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the individual package.json files for details.

## 👤 Author

**Vivek** - [GitHub](https://github.com/vivekinz)

## 🎓 Learning & References

- [Tiptap Documentation](https://tiptap.dev/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/)

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Last Updated:** March 2, 2026
