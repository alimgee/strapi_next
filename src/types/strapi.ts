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

// Base Strapi Entity (Strapi v5 structure)
export interface StrapiEntity {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Article Content Type (Strapi v5 structure)
export interface Article extends StrapiEntity {
  title: string;
  content: any; // Rich text blocks
  excerpt?: string;
  slug: string;
  author: string;
  featured?: boolean;
  featuredImage?: any;
  provider: string;
  externalLink?: string;
}

// Organization Content Type (Strapi v5 structure)
export interface Organization extends StrapiEntity {
  name: string;
  description: any; // Rich text blocks  
  website: string;
  email?: string;
  phone?: string;
  logo?: any;
  featured?: boolean;
}

// Page Content Type (Strapi v5 structure)
export interface Page extends StrapiEntity {
  title: string;
  slug: string;
  content: any; // Rich text blocks
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: any;
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

export interface Card {
  id: number;
  title: string;
  content: any;
  icon?: string;
  bgColor?: string;
  textColor?: string;
  buttonText?: string;
  buttonLink?: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
