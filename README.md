# Next.js + Strapi Integration

This project demonstrates a complete integration between Next.js and Strapi CMS, providing a robust foundation for content-driven applications.

## 🚀 Features

- **TypeScript Support**: Fully typed API responses and content models
- **Content Types**: Pre-configured Articles, Organizations, and Pages
- **API Utilities**: Comprehensive API layer with error handling
- **Mock Data Fallback**: Development continues even when Strapi is offline
- **Responsive Demo**: Interactive demo showing API integration
- **Error Handling**: Graceful fallbacks and error states

## 📁 Project Structure

```
├── cms/                    # Strapi backend
│   ├── src/
│   │   ├── api/           # Content type definitions
│   │   └── config/        # Strapi configuration
│   └── package.json
├── src/                   # Next.js frontend
│   ├── app/              # App router pages
│   ├── lib/              # API utilities and helpers
│   │   ├── strapi.ts     # Strapi API client
│   │   └── mock-data.ts  # Development mock data
│   └── types/            # TypeScript definitions
│       └── strapi.ts     # Strapi content types
└── package.json
```

## 🛠️ Setup Instructions

### 1. Start the Development Servers

**Terminal 1 - Start Strapi:**
```bash
cd cms
npx strapi develop
```

**Terminal 2 - Start Next.js:**
```bash
npm run dev
```

### 2. Configure Strapi

1. Open http://localhost:1337/admin
2. Create an admin user account
3. The content types (Articles, Organizations, Pages) are pre-configured
4. Add sample content through the admin interface

### 3. View the Integration

- **Homepage**: http://localhost:3000 - Overview and getting started
- **Demo Page**: http://localhost:3000/demo - Live API integration demo
- **Strapi Admin**: http://localhost:1337/admin - Content management

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
