import { 
  StrapiResponse, 
  StrapiSingleResponse, 
  StrapiQueryParams,
  Article,
  Organization,
  Page
} from '@/types/strapi';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Base API client
class StrapiAPI {
  private baseURL: string;
  private token?: string;

  constructor(baseURL: string, token?: string) {
    this.baseURL = baseURL;
    this.token = token;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {},
    params?: StrapiQueryParams
  ): Promise<T> {
    const url = new URL(`${this.baseURL}/api${endpoint}`);
    
    // Add query parameters
    if (params) {
      if (params.populate) {
        if (typeof params.populate === 'string') {
          url.searchParams.append('populate', params.populate);
        } else if (Array.isArray(params.populate)) {
          url.searchParams.append('populate', params.populate.join(','));
        } else {
          url.searchParams.append('populate', JSON.stringify(params.populate));
        }
      }
      
      if (params.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          url.searchParams.append(`filters[${key}]`, String(value));
        });
      }
      
      if (params.sort) {
        const sortParam = Array.isArray(params.sort) ? params.sort.join(',') : params.sort;
        url.searchParams.append('sort', sortParam);
      }
      
      if (params.pagination) {
        Object.entries(params.pagination).forEach(([key, value]) => {
          url.searchParams.append(`pagination[${key}]`, String(value));
        });
      }
      
      if (params.fields) {
        url.searchParams.append('fields', params.fields.join(','));
      }
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url.toString(), {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Generic methods
  async find<T>(endpoint: string, params?: StrapiQueryParams): Promise<StrapiResponse<T>> {
    return this.request<StrapiResponse<T>>(endpoint, {}, params);
  }

  async findOne<T>(endpoint: string, id: number | string, params?: StrapiQueryParams): Promise<StrapiSingleResponse<T>> {
    return this.request<StrapiSingleResponse<T>>(`${endpoint}/${id}`, {}, params);
  }

  async create<T>(endpoint: string, data: any): Promise<StrapiSingleResponse<T>> {
    return this.request<StrapiSingleResponse<T>>(endpoint, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }

  async update<T>(endpoint: string, id: number | string, data: any): Promise<StrapiSingleResponse<T>> {
    return this.request<StrapiSingleResponse<T>>(`${endpoint}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });
  }

  async delete(endpoint: string, id: number | string): Promise<void> {
    await this.request(`${endpoint}/${id}`, {
      method: 'DELETE',
    });
  }
}

// Initialize API client
export const strapiAPI = new StrapiAPI(STRAPI_URL, API_TOKEN);

// Content-specific API functions
export const articlesAPI = {
  getAll: (params?: StrapiQueryParams) => 
    strapiAPI.find<Article>('/articles', {
      populate: ['featuredImage'],
      sort: ['publishedAt:desc'],
      ...params,
    }),
  
  getById: (id: number | string) => 
    strapiAPI.findOne<Article>('/articles', id, {
      populate: ['featuredImage'],
    }),
  
  getBySlug: async (slug: string) => {
    const response = await strapiAPI.find<Article>('/articles', {
      filters: { slug: { $eq: slug } },
      populate: ['featuredImage'],
    });
    return response.data[0] || null;
  },

  getFeatured: (limit = 3) =>
    strapiAPI.find<Article>('/articles', {
      filters: { featured: { $eq: true } },
      populate: ['featuredImage'],
      sort: ['publishedAt:desc'],
      pagination: { limit },
    }),

  create: (data: Partial<Article['attributes']>) =>
    strapiAPI.create<Article>('/articles', data),

  update: (id: number | string, data: Partial<Article['attributes']>) =>
    strapiAPI.update<Article>('/articles', id, data),

  delete: (id: number | string) =>
    strapiAPI.delete('/articles', id),
};

export const organizationsAPI = {
  getAll: (params?: StrapiQueryParams) =>
    strapiAPI.find<Organization>('/organizations', {
      populate: ['logo'],
      sort: ['name:asc'],
      ...params,
    }),

  getById: (id: number | string) =>
    strapiAPI.findOne<Organization>('/organizations', id, {
      populate: ['logo'],
    }),

  getFeatured: () =>
    strapiAPI.find<Organization>('/organizations', {
      filters: { featured: { $eq: true } },
      populate: ['logo'],
      sort: ['name:asc'],
    }),

  create: (data: Partial<Organization['attributes']>) =>
    strapiAPI.create<Organization>('/organizations', data),

  update: (id: number | string, data: Partial<Organization['attributes']>) =>
    strapiAPI.update<Organization>('/organizations', id, data),

  delete: (id: number | string) =>
    strapiAPI.delete('/organizations', id),
};

export const pagesAPI = {
  getAll: () =>
    strapiAPI.find<Page>('/pages', {
      populate: ['featuredImage'],
    }),

  getBySlug: async (slug: string) => {
    const response = await strapiAPI.find<Page>('/pages', {
      filters: { slug: { $eq: slug } },
      populate: ['featuredImage'],
    });
    return response.data[0] || null;
  },

  create: (data: Partial<Page['attributes']>) =>
    strapiAPI.create<Page>('/pages', data),

  update: (id: number | string, data: Partial<Page['attributes']>) =>
    strapiAPI.update<Page>('/pages', id, data),

  delete: (id: number | string) =>
    strapiAPI.delete('/pages', id),
};

// Utility functions
export const getStrapiMediaUrl = (url: string): string => {
  if (url.startsWith('http')) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
};

export const formatStrapiDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
