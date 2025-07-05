// Strapi API Response Types
export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: {};
}

// Base Strapi Entity
export interface StrapiEntity {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Article Content Type
export interface Article extends StrapiEntity {
  attributes: {
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    author: string;
    featured: boolean;
    featuredImage?: {
      data: MediaFile | null;
    };
    provider: string;
    externalLink?: string;
  };
}

// Organization Content Type
export interface Organization extends StrapiEntity {
  attributes: {
    name: string;
    description: string;
    website: string;
    email?: string;
    phone?: string;
    logo: {
      data: MediaFile | null;
    };
    featured: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Page Content Type (for About, Story, etc.)
export interface Page extends StrapiEntity {
  attributes: {
    title: string;
    slug: string;
    content: string;
    metaTitle?: string;
    metaDescription?: string;
    featuredImage?: {
      data: MediaFile | null;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Media File Type
export interface MediaFile {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      thumbnail: MediaFormat;
      small?: MediaFormat;
      medium?: MediaFormat;
      large?: MediaFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface MediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: string;
  size: number;
  width: number;
  height: number;
}

// API Query Parameters
export interface StrapiQueryParams {
  populate?: string | string[] | object;
  filters?: object;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  fields?: string[];
  locale?: string;
  publicationState?: 'live' | 'preview';
}
