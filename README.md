# Next.js + Strapi CMS Integration

A modern full-stack application demonstrating the integration between Next.js frontend and Strapi headless CMS for dynamic content management.

## 🚀 Live Demo

- **Frontend**: http://localhost:3000
- **Demo Page**: http://localhost:3000/demo  
- **Strapi Admin**: http://localhost:1337/admin

## 🏗️ Architecture

```
Frontend (Next.js)     ←→     Backend (Strapi CMS)
├── TypeScript                ├── Content Types
├── Tailwind CSS              ├── API Routes  
├── App Router                ├── Admin Panel
└── Dynamic Components        └── Rich Text Editor
```

## ✨ Features

### Frontend (Next.js)
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling
- ✅ **App Router** (Next.js 15)
- ✅ **Dynamic Components** with real-time content
- ✅ **Error Handling** and loading states
- ✅ **Responsive Design** 
- ✅ **Mock Data Fallback** for development

### Backend (Strapi CMS)
- ✅ **Content Types**: Articles, Organizations, Pages, Cards
- ✅ **Rich Text Editor** for content creation
- ✅ **API Permissions** management
- ✅ **Admin Panel** for content management
- ✅ **RESTful API** endpoints

### Integration
- ✅ **Type-Safe API** calls with TypeScript
- ✅ **Automatic Content Updates** when CMS changes
- ✅ **Error Boundaries** for graceful failures
- ✅ **Loading States** for better UX

## 🛠️ Tech Stack

| Frontend | Backend | Development |
|----------|---------|-------------|
| Next.js 15 | Strapi v5 | TypeScript |
| React 19 | SQLite | ESLint |
| Tailwind CSS | Node.js | Git |
| Axios | RESTful API | VS Code |

## 📁 Project Structure

```
strappi_next/
├── cms/                    # Strapi Backend
│   ├── src/
│   │   ├── api/           # API routes
│   │   └── content-types/ # Content type definitions
│   ├── config/            # Strapi configuration
│   └── package.json
├── src/                   # Next.js Frontend
│   ├── app/              # App Router pages
│   │   ├── demo/         # API integration demo
│   │   └── page.tsx      # Home page with Cards
│   ├── components/       # React components
│   │   └── Cards.tsx     # Dynamic Cards component
│   ├── lib/              # Utilities and API
│   │   ├── strapi.ts     # Strapi API client
│   │   └── mock-data.ts  # Development mock data
│   └── types/            # TypeScript definitions
│       └── strapi.ts     # Strapi response types
├── README.md
└── package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/alimgee/strapi_next.git
cd strapi_next
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install Strapi dependencies  
cd cms
npm install
cd ..
```

### 3. Start Development Servers

**Terminal 1 - Start Strapi CMS:**
```bash
cd cms
npx strapi develop
```

**Terminal 2 - Start Next.js Frontend:**
```bash
npm run dev
```

### 4. Initial Setup
1. **Create Strapi Admin User**:
   - Visit http://localhost:1337/admin
   - Create your first admin account

2. **Set API Permissions**:
   - Go to Settings → Users & Permissions Plugin → Roles → Public
   - Enable `find` and `findOne` for all content types

3. **Add Sample Content**:
   - Create articles, organizations, pages, and cards
   - Publish your content

4. **View Integration**:
   - Visit http://localhost:3000 for the main site
   - Visit http://localhost:3000/demo for API testing

## 📝 Content Types

### Articles
- Title, Content (Rich Text), Author, Provider
- Excerpt, Slug, Featured Image
- Featured flag, Publication date

### Organizations  
- Name, Description (Rich Text), Website
- Email, Phone, Logo
- Featured flag

### Pages
- Title, Slug, Content (Rich Text)
- Meta Title, Meta Description
- Featured Image

### Cards
- Title, Content (Rich Text), Icon
- Background Color, Text Color
- Button Text, Button Link
- Featured flag

## 🔌 API Integration

### Strapi API Endpoints
```
GET /api/articles          # Get all articles
GET /api/articles/:id      # Get single article
GET /api/organizations     # Get all organizations  
GET /api/organizations/:id # Get single organization
GET /api/pages            # Get all pages
GET /api/pages/:id        # Get single page
GET /api/cards            # Get all cards
GET /api/cards/:id        # Get single card
```

### Frontend API Client
```typescript
// Usage example
import { articlesAPI } from '@/lib/strapi';

const articles = await articlesAPI.getAll();
const article = await articlesAPI.getById(1);
```

## 🎨 Component Migration Example

The Cards component demonstrates how to migrate from static content to dynamic CMS content:

**Before (Static):**
```tsx
const cards = [
  { title: "News", content: "Static content..." }
];
```

**After (Dynamic):**
```tsx
const { cards, loading, error } = useCards();
// Content loaded from Strapi CMS
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel
```

### Backend (Railway/DigitalOcean)
```bash
cd cms
npm run build
# Deploy Strapi to your hosting provider
```

## 🔧 Configuration

### Environment Variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Backend (cms/.env)
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
```

## 📊 Features Showcase

- **Dynamic Content**: All content managed through Strapi admin
- **Type Safety**: Full TypeScript integration
- **Real-time Updates**: Changes appear immediately  
- **Error Handling**: Graceful fallbacks for CMS unavailability
- **Responsive Design**: Works on all device sizes
- **Rich Text**: Support for complex content editing


## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Strapi](https://strapi.io/) - Headless CMS
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety


**Built with ❤️ using Next.js + Strapi**