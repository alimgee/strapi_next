// Mock data for development when Strapi is not available
import { Article, Organization, Page } from '@/types/strapi';

export const mockArticles: Article[] = [
  {
    id: 1,
    attributes: {
      title: "Understanding Childhood Cancer",
      content: "<p>This is a comprehensive guide to understanding childhood cancer...</p>",
      excerpt: "A comprehensive guide covering the basics of childhood cancer, treatment options, and support resources.",
      slug: "understanding-childhood-cancer",
      publishedAt: "2024-12-01T00:00:00.000Z",
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      author: "Dr. Sarah Johnson",
      featured: true,
      provider: "Internal",
      featuredImage: {
        data: null
      }
    }
  },
  {
    id: 2,
    attributes: {
      title: "Latest Research Developments",
      content: "<p>Recent breakthroughs in childhood cancer research...</p>",
      excerpt: "Discover the latest research developments and breakthrough treatments in pediatric oncology.",
      slug: "latest-research-developments",
      publishedAt: "2024-11-28T00:00:00.000Z",
      createdAt: "2024-11-28T00:00:00.000Z",
      updatedAt: "2024-11-28T00:00:00.000Z",
      author: "Research Team",
      featured: false,
      provider: "External",
      externalLink: "https://example.com/research",
      featuredImage: {
        data: null
      }
    }
  }
];

export const mockOrganizations: Organization[] = [
  {
    id: 1,
    attributes: {
      name: "Children's Cancer Foundation",
      description: "<p>A leading organization dedicated to supporting children with cancer and their families.</p>",
      website: "https://childrenscancer.org",
      email: "info@childrenscancer.org",
      phone: "+1-800-123-4567",
      featured: true,
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      publishedAt: "2024-12-01T00:00:00.000Z",
      logo: {
        data: null
      }
    }
  },
  {
    id: 2,
    attributes: {
      name: "Pediatric Oncology Support Group",
      description: "<p>Providing emotional support and resources for families affected by childhood cancer.</p>",
      website: "https://pediatricsupport.org",
      email: "support@pediatricsupport.org",
      featured: false,
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      publishedAt: "2024-12-01T00:00:00.000Z",
      logo: {
        data: null
      }
    }
  }
];

export const mockPages: Page[] = [
  {
    id: 1,
    attributes: {
      title: "About Us",
      slug: "about",
      content: "<p>We are dedicated to supporting children with cancer and their families...</p>",
      metaTitle: "About Us - Childhood Cancer Support",
      metaDescription: "Learn about our mission to support children with cancer and their families.",
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      publishedAt: "2024-12-01T00:00:00.000Z",
      featuredImage: {
        data: null
      }
    }
  },
  {
    id: 2,
    attributes: {
      title: "Our Story",
      slug: "story",
      content: "<p>Our journey began when...</p>",
      metaTitle: "Our Story - How We Started",
      metaDescription: "Discover the story behind our organization and our mission.",
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      publishedAt: "2024-12-01T00:00:00.000Z",
      featuredImage: {
        data: null
      }
    }
  }
];

// Mock API functions that mimic Strapi responses
export const mockStrapiAPI = {
  articles: {
    getAll: () => Promise.resolve({ data: mockArticles, meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: mockArticles.length } } }),
    getFeatured: (limit: number = 3) => Promise.resolve({ data: mockArticles.filter(a => a.attributes.featured).slice(0, limit), meta: { pagination: { page: 1, pageSize: limit, pageCount: 1, total: 1 } } }),
    getBySlug: (slug: string) => Promise.resolve(mockArticles.find(a => a.attributes.slug === slug) || null),
  },
  organizations: {
    getAll: () => Promise.resolve({ data: mockOrganizations, meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: mockOrganizations.length } } }),
    getFeatured: () => Promise.resolve({ data: mockOrganizations.filter(o => o.attributes.featured), meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } } }),
  },
  pages: {
    getAll: () => Promise.resolve({ data: mockPages, meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: mockPages.length } } }),
    getBySlug: (slug: string) => Promise.resolve(mockPages.find(p => p.attributes.slug === slug) || null),
  }
};
