# 📦 Inventory Management System

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-2.0-764abc?style=for-the-badge&logo=redux" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Socket.io-4.7-010101?style=for-the-badge&logo=socket.io" alt="Socket.io" />
</div>

<div align="center">
  <h3>🚀 Modern Inventory Management System</h3>
  <p>A full-featured web application for managing orders, products, and product groups with real-time support</p>
  
  <h2>🌐 Live Demo</h2>
  <a href="https://sincere-magic-production-631e.up.railway.app/orders" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Railway-blueviolet?style=for-the-badge" alt="Live Demo" />
  </a>
  <br>
  <p><strong>Demo URL:</strong> <a href="https://dzentesttask-production.up.railway.app/orders](https://sincere-magic-production-631e.up.railway.app">Demo</a></p>
</div>

---

## ✨ Features

- 🎯 **Modern Tech Stack**: Next.js 14, TypeScript, Redux Toolkit
- 🔄 **Real-time Updates**: WebSocket integration for active sessions counter
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🎨 **Smooth Animations**: Framer Motion for transitions and interactions
- 🧩 **Component Architecture**: Reusable typed React components
- 📊 **State Management**: Centralized state with Redux Toolkit
- 🌐 **Routing**: Client-side routing with Next.js Router
- 📝 **Form Validation**: React Hook Form integration
- 📅 **Date Handling**: Comprehensive date formatting with date-fns
- 🌍 **Internationalization**: Support for Russian and English languages

---

## 📋 Functionality

### 📦 Orders Page (`/orders`)
- **Order List**: Display all orders with product counts, dates, and totals
- **Detail View**: Side panel with order details and associated products
- **Interactive Selection**: Click to select and view order details
- **Deletion**: Modal confirmation for order deletion
- **Real-time Calculations**: Automatic total calculations in multiple currencies

### 🛍️ Products Page (`/products`)
- **Comprehensive Table**: All products with detailed information
- **Advanced Filtering**: Filter by product type and specification
- **Status Indicators**: Visual status indicators (new/used, free/in repair)
- **Price Display**: Multi-currency price formatting
- **Guarantee Information**: Start and end dates with proper formatting
- **Order Association**: Link products to their source orders

### 📂 Additional Pages
- **Groups** (`/groups`): Product group management
- **Users** (`/users`): User management
- **Settings** (`/settings`): Application settings

---

## 🛠️ Technology Stack

### Core Technologies
- **Next.js 14**: React framework with SSR capabilities
- **TypeScript**: Type-safe JavaScript development
- **React 18**: Modern React with hooks and concurrent features
- **Redux Toolkit**: Simplified Redux state management

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth transitions
- **Animate.css**: Additional CSS animations
- **Responsive Design**: Mobile-first approach

### Development Tools
- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

### Real-time Features
- **Socket.io**: WebSocket communication
- **Active Sessions Counter**: Real-time display of active user count

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yaneznayou/Dzen_test_task.git

   cd Dzen-testTask
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development servers**
   ```bash
   # Start both servers (Next.js and WebSocket)
   npm run dev:all
   
   # Or start them separately:
   npm run dev      # Next.js development server (port 3000)
   npm run server   # WebSocket server (port 3001)
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

---

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Layout.tsx      # Main application layout
│   ├── TopMenu.tsx     # Header with search and time
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── OrdersList.tsx  # Orders list component
│   ├── OrderDetail.tsx # Order detail panel
│   ├── ProductsList.tsx# Products table component
│   └── DeleteModal.tsx # Confirmation modal
├── pages/              # Next.js pages (routing)
│   ├── _app.tsx        # App wrapper with Redux
│   ├── index.tsx       # Home page (redirects to orders)
│   ├── orders.tsx      # Orders page
│   ├── products.tsx    # Products page
│   ├── groups.tsx      # Groups page
│   ├── users.tsx       # Users page
│   └── settings.tsx    # Settings page
├── store/              # Redux store configuration
│   ├── store.ts        # Store setup
│   ├── hooks.ts        # Typed Redux hooks
│   └── slices/         # Redux slices
│       └── appSlice.ts # Main application state
├── types/              # TypeScript type definitions
│   └── index.ts        # Global types and interfaces
├── utils/              # Utility functions
│   └── helpers.ts      # Date formatting, calculations
├── data/               # Mock data
│   └── mockData.ts     # Sample orders and products
├── contexts/           # React contexts
│   └── LocaleContext.tsx # Localization context
├── hooks/              # Custom hooks
│   └── useTranslations.ts # Translation hook
└── styles/             # Global styles
    └── globals.css     # Tailwind CSS and custom styles
```

---

## 🎨 Design System

### Color Palette
- **Primary Green**: `#22c55e` - Main brand color
- **Gray Scale**: Various shades for backgrounds and text
- **Status Colors**: 
  - Green: Available/New items
  - Yellow: In repair/Used items
  - Red: Delete actions
  - Blue: Information states

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales appropriately across devices

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Consistent styling with hover states
- **Forms**: Clean inputs with focus states
- **Modals**: Centered overlays with backdrop blur

---

## 🔧 Development

### Available Scripts

```bash
npm run dev        # Start Next.js development server
npm run build      # Build production bundle
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # Run TypeScript compiler
npm run server     # Start WebSocket server
npm run dev:all    # Start both servers concurrently
```

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured with Next.js and TypeScript rules
- **Prettier**: Code formatting (recommended)
- **Git Hooks**: Pre-commit linting (recommended)

---

## 🌐 API Integration

### Current Implementation
- **Mock Data**: All data currently comes from `src/data/mockData.ts`
- **WebSocket**: Real-time active sessions counter
- **Future**: Ready for REST API integration

### Planned API Endpoints
```typescript
// Orders
GET    /api/orders          # Get all orders
POST   /api/orders          # Create new order
PUT    /api/orders/:id      # Update order
DELETE /api/orders/:id      # Delete order

// Products  
GET    /api/products        # Get all products
POST   /api/products        # Create new product
PUT    /api/products/:id   # Update product
DELETE /api/products/:id   # Delete product
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px - Single column layout
- **Tablet**: 768px - 1024px - Adjusted spacing
- **Desktop**: > 1024px - Full layout with sidebar

### Mobile Optimizations
- **Collapsible Sidebar**: Hidden on mobile, accessible via menu
- **Touch-friendly**: Larger touch targets
- **Optimized Tables**: Horizontal scroll for product table
- **Modal Adaptations**: Full-screen modals on mobile

---

## 🐳 Docker Deployment (Alternative)

The project supports Docker containerization with separate services for frontend and WebSocket server.

### Architecture
The project is split into two services:
- **Frontend** (Next.js) - port 3000
- **WebSocket Server** - port 3001

### Quick Start with Docker
```bash
# Build and run both services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

### Manual Docker Build
```bash
# Build frontend
docker build -f Dockerfile.frontend -t inventory-frontend .

# Build WebSocket server
docker build -f Dockerfile.websocket -t inventory-websocket .

# Run frontend
docker run -p 3000:3000 inventory-frontend

# Run WebSocket server (in another terminal)
docker run -p 3001:3001 inventory-websocket
```

### Access
- **Next.js Application**: http://localhost:3000
- **WebSocket Server**: ws://localhost:3001

### Stop Services
```bash
# Stop docker-compose
docker-compose down

# Stop individual containers
docker stop <container_id>
```

---

## 🚀 Traditional Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
Create `.env.local` for environment-specific configuration:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=http://localhost:3001
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---


<div align="center">
  <p><strong>Built with ❤️ using Next.js, TypeScript, and modern web technologies</strong></p>
</div>
