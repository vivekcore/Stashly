# BrainOut Backend

Express.js REST API server for the BrainOut note-taking and content creation platform.

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+
- **npm** or **yarn**
- **MongoDB** (local or Atlas cloud)

### Installation

```bash
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and other configuration
npm run dev
```

The server will start at `http://localhost:3000` by default.

## 📦 Scripts

```bash
# Development mode (builds and runs with auto-reload on changes)
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

## 🛠️ Technology Stack

- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM and schema validation
- **JWT** (jsonwebtoken) - Stateless authentication
- **bcrypt** - Password hashing and comparison
- **Zod** - Runtime schema validation
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

## 🔑 Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```env
# MongoDB Connection String
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/brainout

# Server Port (default: 3000)
PORT=3000

# JWT Secret Key for token signing (generate a strong random string)
USER_SECRET_KEY=your-secret-key-here

# Bcrypt salt rounds (10-12 recommended for security/performance balance)
SALTROUND=10
```

See [.env.example](./.env.example) for detailed documentation on each variable.

## 📁 Project Structure

```
src/
├── index.ts              # Server entry point and Express setup
├── config.ts             # Configuration management (loads env variables)
├── utils.ts              # Utility functions
├── db/
│   └── db.ts             # MongoDB connection setup
├── routes/
│   └── userRouter.ts     # User-related API routes
├── middlewares/
│   └── userMiddleware.ts # Authentication and request middlewares
├── types/
│   └── types.ts          # TypeScript type definitions
└── scss.d.ts             # SCSS module declarations
```

## 🔌 API Endpoints

### User Routes (`/user`)

| Method | Endpoint         | Description                 | Auth |
| ------ | ---------------- | --------------------------- | ---- |
| POST   | `/user/register` | Register a new user account | ❌   |
| POST   | `/user/login`    | Login and receive JWT token | ❌   |
| GET    | `/user/profile`  | Fetch current user profile  | ✅   |
| PUT    | `/user/profile`  | Update user profile         | ✅   |

_Note: Add endpoint documentation here as your API grows_

### Request/Response Examples

#### Register User

```bash
POST /user/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}

Response:
{
  "success": true,
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login

```bash
POST /user/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}

Response:
{
  "success": true,
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

## 🔐 Security Features

### Authentication

- **JWT-based** authentication with secure token generation
- Stateless authentication (no server-side sessions required)
- Token validation on protected routes via middleware

### Password Security

- **bcrypt** hashing with configurable salt rounds
- Passwords never stored in plain text
- Secure password comparison to prevent timing attacks

### API Security

- **CORS** configured to allow cross-origin requests
- Input validation using **Zod** schemas
- Environment variables for sensitive configuration

### Best Practices

- Never commit `.env` files (use `.gitignore`)
- Use `.env.example` as template for required variables
- Implement rate limiting (recommended for production)
- Use HTTPS in production environments

## 📊 Database Schema

Uses MongoDB with Mongoose schemas. Check individual model files for schema definitions.

### Collections

- **users** - User accounts and authentication
- _(Add more collections as your API expands)_

## 🧪 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Run Production Server

```bash
npm start
```

### Environment Setup

Ensure all environment variables are properly set on your production server:

- Use a production MongoDB instance
- Use strong, unique secrets for `USER_SECRET_KEY`
- Set `PORT` to your deployment port (usually 80, 443, or 3000)

### Recommended Hosting Options

- **Heroku** - Easy deployment with built-in MongoDB support
- **Railway** - Modern cloud platform with automatic deployments
- **Render** - Simple Node.js deployment
- **AWS EC2** - Full control and scalability
- **DigitalOcean** - Affordable and straightforward

## 📚 MongoDB Connection

### Local MongoDB

```
DATABASE_URL=mongodb://localhost:27017/brainout
```

### MongoDB Atlas (Cloud)

1. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/brainout`

## 🔄 CORS Configuration

Currently configured to accept requests from any origin. In production, update to:

```typescript
const corsOptions = {
  origin: ["https://your-frontend-domain.com"],
  credentials: true,
};
app.use(cors(corsOptions));
```

## 🧩 Middleware

### Authentication Middleware

- Validates JWT tokens
- Extracts user information from tokens
- Protects routes that require authentication

## 🤝 Contributing

When contributing to the backend:

1. Follow TypeScript best practices
2. Add proper error handling
3. Validate all inputs using Zod
4. Write meaningful commit messages
5. Test API endpoints before submitting PRs

## 📖 Related Documentation

- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Verify `DATABASE_URL` in `.env` is correct
- Check MongoDB Atlas whitelist (IP access)
- Ensure database name in URL matches your MongoDB instance

### Port Already in Use

```bash
# Change PORT in .env to an available port (e.g., 3001)
# Or kill the process using the port:
# macOS/Linux: lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill
# Windows: netstat -ano | findstr :3000
```

### JWT Token Issues

- Ensure `USER_SECRET_KEY` matches between token generation and validation
- Check token expiration time
- Verify token format in Authorization header: `Bearer <token>`

---

**Part of the BrainOut project** | [View Main README](../README.md)
