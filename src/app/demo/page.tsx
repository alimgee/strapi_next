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
  const [mounted, setMounted] = useState(false);

  // Helper function to extract text from Strapi rich text blocks
  const extractTextFromBlocks = (blocks: any): string => {
    if (!blocks || typeof blocks === 'string') return blocks || '';
    if (Array.isArray(blocks)) {
      return blocks.map(block => {
        if (block.children) {
          return block.children.map((child: any) => child.text || '').join('');
        }
        return '';
      }).join(' ');
    }
    return '';
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

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
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    );
  }

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
                  <h3 className="font-semibold">{article.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {article.excerpt || extractTextFromBlocks(article.content)?.slice(0, 100) || 'No excerpt available'}
                    {(article.excerpt || extractTextFromBlocks(article.content))?.length > 100 && '...'}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    By {article.author} • {article.publishedAt?.split('T')[0]}
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
                  <h3 className="font-semibold">{org.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {extractTextFromBlocks(org.description)?.slice(0, 100) || 'No description available'}
                    {extractTextFromBlocks(org.description)?.length > 100 && '...'}
                  </p>
                  <a href={org.website} className="text-blue-600 hover:underline text-sm">
                    {org.website}
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
                  <h3 className="font-semibold">{page.title}</h3>
                  <p className="text-gray-600 text-sm">Slug: /{page.slug || 'no-slug'}</p>
                  <p className="text-gray-600 text-sm mb-2">
                    {extractTextFromBlocks(page.content)?.slice(0, 80) || 'No content preview'}
                    {extractTextFromBlocks(page.content)?.length > 80 && '...'}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Updated: {page.updatedAt?.split('T')[0]}
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
      </div>
    </div>
  );
}