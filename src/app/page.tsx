import Image from "next/image";
import Link from "next/link";
import Cards from "@/components/Cards";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold mb-4">Next.js + Strapi Integration</h1>
          <p className="text-gray-600 mb-6">
            This project demonstrates the integration between Next.js and Strapi CMS.
          </p>
          
          <div className="flex gap-4 justify-center sm:justify-start">
            <Link 
              href="/demo" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Demo
            </Link>
            <a 
              href="http://localhost:1337/admin" 
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Strapi Admin
            </a>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg max-w-2xl">
          <h2 className="text-lg font-semibold mb-3">What's included:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>TypeScript types for Strapi content</li>
            <li>API utilities with error handling</li>
            <li>Content types: Articles, Organizations, Pages</li>
            <li>Mock data fallback for development</li>
            <li>Responsive demo interface</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg max-w-2xl">
          <h2 className="text-lg font-semibold mb-3">Getting Started:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>Start Strapi: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">cd cms && npx strapi develop</code></li>
            <li>Create an admin user at <a href="http://localhost:1337/admin" className="text-blue-600 hover:underline">localhost:1337/admin</a></li>
            <li>Add content through the admin panel</li>
            <li>View the integration in the <Link href="/demo" className="text-blue-600 hover:underline">demo page</Link></li>
          </ol>
        </div>

          <div className="w-full max-w-2xl">
          <h2 className="text-lg font-semibold mb-3">Cards from Strapi:</h2>
          <Cards />
        </div>
      </main>
    </div>
  );
}
