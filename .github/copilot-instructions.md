# AI Marketplace - Copilot Instructions

## Project Overview
This is a React-based AI marketplace application that showcases AI tools, subscriptions, and offers. The project uses Create React App with a component-based architecture and React Router for navigation.

## Core Architecture

### Component Structure
- `src/App.js`: Main application component managing routing and authentication state
- `src/components/`: Contains all React components organized by feature
  - `auth/`: Authentication components (Login.jsx, Signup.jsx)
  - `Dashboard/`: Admin dashboard components
  - Feature components: AIToolsPage.jsx, SubscriptionsPage.jsx, etc.

### Key Patterns
1. **Authentication Flow**
   - Authentication state is managed in `App.js` using localStorage
   - Protected routes use `AuthWrapper.js` for access control
   - Example: `src/components/auth/Login.jsx` implements the login flow

2. **Component State Management**
   - Local state with useState for component-specific data
   - Props for component communication
   - Example pattern from `AIToolsPage.jsx`:
   ```jsx
   const [state] = useState(initialData);
   const items = state.map(item => (
     <ItemComponent key={item.id} {...item} />
   ));
   ```

3. **Styling**
   - Tailwind CSS for styling (see tailwind.config.js)
   - Component-specific CSS files when needed (e.g., Dashboard.css)

## Development Workflow

### Setup and Installation
```bash
npm install
npm start
```

### Available Scripts
- `npm start`: Development server on http://localhost:3000
- `npm test`: Run tests
- `npm run build`: Production build

### Git Workflow
- Currently has merge conflicts that need resolution in:
  - package.json (ant-design vs heroicons)
  - App.js components

## Common Tasks

### Adding a New Feature Page
1. Create component in `src/components/`
2. Add route in `App.js`
3. Update navigation in `Sidebar.jsx`

### Authentication Integration
- Use `isAuthenticated` state from App.js
- Protected routes should be wrapped with authentication check
- Store user data in localStorage with proper token handling

## Conventions
1. **File Naming**
   - React components: PascalCase with .jsx extension
   - Utility functions: camelCase with .js extension
   - CSS modules: ComponentName.css

2. **Component Structure**
   - Functional components with hooks
   - Props destructuring at the top
   - Local state initialization before effects
   - JSX with Tailwind classes

3. **Data Patterns**
   - Mock data defined at component level (see AIToolsPage.jsx)
   - Common data structures use consistent ID patterns
   - Nested component data passed via props

## Key Files for Reference
- `src/App.js`: Main routing and auth logic
- `src/components/AIToolsPage.jsx`: Example of component patterns
- `tailwind.config.js`: Styling configuration
- `package.json`: Project dependencies and scripts