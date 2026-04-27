# BrainOut Frontend

React-based frontend for the BrainOut note-taking and content creation platform.

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+
- **npm** or **yarn**

### Installation

```bash
npm install
npm run dev
```

The development server will start at `http://localhost:5173`

## 📦 Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Preview production build locally
npm run preview
```

## 🛠️ Technology Stack

- **React** 19 - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Tiptap** - Rich text editor library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **Lucide React** - Icon library

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── tiptap-*        # Rich text editor components
│   ├── tiptap-icons/   # Editor toolbar icons
│   ├── tiptap-ui/      # Editor UI components
│   └── ui/             # General UI components
├── features/           # Redux slices
│   ├── AlertSlice.tsx
│   ├── FormSlice.tsx
│   └── UserSlice.tsx
├── hooks/              # Custom React hooks
│   ├── use-tiptap-editor.ts
│   └── ...
├── lib/                # Utility libraries
├── Helper/             # Helper functions and utilities
├── styles/             # Global styles and SCSS variables
├── app/                # Redux store configuration
├── App.tsx             # Root component
└── main.tsx            # Entry point
```

## 🎨 Styling

This project uses **TailwindCSS** with custom configurations:

- Custom color variables in `_variables.scss`
- Keyframe animations in `_keyframe-animations.scss`
- Global styles in `index.css`

## 🔌 API Integration

The frontend communicates with the backend API using Axios. Update the API base URL in your configuration files as needed.

```typescript
// Example API call
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Backend URL
});
```

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles where appropriate
- Keyboard navigation support via `react-hotkeys-hook`
- Proper contrast ratios for readability

## 📱 Responsive Design

Breakpoints (TailwindCSS):

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🧪 Code Quality

- **ESLint** - Code linting and formatting
- **TypeScript** - Type safety and development experience

Run linting:

```bash
npm run lint
```

## 🚢 Production Build

```bash
npm run build
```

Builds the app for production in the `dist/` folder. It's ready to be deployed!

## 📖 Related Documentation

- [Tiptap Editor Guide](./src/components/tiptap-ui/)
- [Redux Store Setup](./src/app/store.tsx)
- [Custom Hooks](./src/hooks/)

## 🤝 Contributing

When contributing to the frontend:

1. Follow the existing code structure and naming conventions
2. Use TypeScript for type safety
3. Create reusable components in `src/components/`
4. Add custom hooks to `src/hooks/` if needed
5. Keep component files focused and single-responsibility

## 📝 Notes

- Hot Module Replacement (HMR) is enabled for fast development experience
- All dependencies are in the root `package.json`
- Use `npm run type-check` for TypeScript compilation without Vite

---

**Part of the BrainOut project** | [View Main README](../README.md)
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
