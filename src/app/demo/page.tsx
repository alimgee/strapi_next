'use client';

import { useState, useEffect } from 'react';
import { articlesAPI, organizationsAPI, pagesAPI } from '@/lib/strapi';
import { mockStrapiAPI } from '@/lib/mock-data';
import { Article, Organization, Page } from '@/types/strapi';

export default function DemoPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Try to fetch data from Strapi first
        const [articlesRes, organizationsRes, pagesRes] = await Promise.allSettled([
          articlesAPI.getAll(),
          organizationsAPI.getAll(),
          pagesAPI.getAll(),
        ]);

        if (articlesRes.status === 'fulfilled') {
          setArticles(articlesRes.value.data);
        }
        if (organizationsRes.status === 'fulfilled') {
          setOrganizations(organizationsRes.value.data);
        }
        if (pagesRes.status === 'fulfilled') {
          setPages(pagesRes.value.data);
        }
      } catch (err) {
        // Fall back to mock data if Strapi is not available
        console.log('Strapi not available, using mock data');
        setUseMockData(true);
        
        const mockArticlesRes = await mockStrapiAPI.articles.getAll();
        const mockOrganizationsRes = await mockStrapiAPI.organizations.getAll();
        const mockPagesRes = await mockStrapiAPI.pages.getAll();
        
        setArticles(mockArticlesRes.data);
        setOrganizations(mockOrganizationsRes.data);
        setPages(mockPagesRes.data);
        
        setError('Strapi CMS not available - showing mock data. Start Strapi to see live data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Strapi CMS Integration Demo</h1>
      
      <div className="grid gap-8">
        {/* Connection Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Connection Status</h2>
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span>Connecting to Strapi...</span>
            </div>
          ) : error ? (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              <p>{error}</p>
              {useMockData && (
                <p className="text-sm mt-2">
                  ✅ Using mock data for demonstration. To use real data, start Strapi: 
                  <code className="bg-yellow-200 px-2 py-1 rounded ml-1">cd cms && npx strapi develop</code>
                </p>
              )}
            </div>
          ) : (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ Successfully connected to Strapi CMS
            </div>
          )}
        </div>

        {/* Articles Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Articles ({articles.length})</h2>
          {articles.length > 0 ? (
            <div className="grid gap-4">
              {articles.slice(0, 3).map((article) => (
                <div key={article.id} className="border border-gray-200 rounded p-4">
                  <h3 className="font-semibold">{article.attributes.title}</h3>
                  <p className="text-gray-600 text-sm">{article.attributes.excerpt}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    By {article.attributes.author} • {new Date(article.attributes.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">
              <p>No articles found.</p>
              <p className="text-sm mt-2">Create articles in Strapi admin at <a href="http://localhost:1337/admin" className="text-blue-600 hover:underline">localhost:1337/admin</a></p>
            </div>
          )}
        </div>

        {/* Organizations Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Organizations ({organizations.length})</h2>
          {organizations.length > 0 ? (
            <div className="grid gap-4">
              {organizations.slice(0, 3).map((org) => (
                <div key={org.id} className="border border-gray-200 rounded p-4">
                  <h3 className="font-semibold">{org.attributes.name}</h3>
                  <p className="text-gray-600 text-sm">{org.attributes.description?.slice(0, 100)}...</p>
                  <a href={org.attributes.website} className="text-blue-600 hover:underline text-sm">
                    {org.attributes.website}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">
              <p>No organizations found.</p>
              <p className="text-sm mt-2">Create organizations in Strapi admin</p>
            </div>
          )}
        </div>

        {/* Pages Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Pages ({pages.length})</h2>
          {pages.length > 0 ? (
            <div className="grid gap-4">
              {pages.slice(0, 3).map((page) => (
                <div key={page.id} className="border border-gray-200 rounded p-4">
                  <h3 className="font-semibold">{page.attributes.title}</h3>
                  <p className="text-gray-600 text-sm">Slug: /{page.attributes.slug}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Updated: {new Date(page.attributes.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">
              <p>No pages found.</p>
              <p className="text-sm mt-2">Create pages in Strapi admin</p>
            </div>
          )}
        </div>

        {/* API Documentation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">API Usage Examples</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Fetching Articles</h3>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
{`import { articlesAPI } from '@/lib/strapi';

// Get all articles
const articles = await articlesAPI.getAll();

// Get featured articles
const featured = await articlesAPI.getFeatured(3);

// Get article by slug
const article = await articlesAPI.getBySlug('example-slug');`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">Fetching Organizations</h3>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
{`import { organizationsAPI } from '@/lib/strapi';

// Get all organizations
const organizations = await organizationsAPI.getAll();

// Get featured organizations
const featured = await organizationsAPI.getFeatured();`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
