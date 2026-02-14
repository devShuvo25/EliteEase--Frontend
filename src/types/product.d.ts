// Unified Product types used across the app

export interface Product {
  id: string | number;

  // Labels
  title?: string;
  name?: string;

  // Description
  description?: string;

  // Images
  image?: string;
  images?: { id?: string; url: string; isMain?: boolean }[];

  // Pricing (components use different names)
  currentPrice?: number;
  basePrice?: number;
  originalPrice?: number;
  discountAmount?: number;
  compareAtPrice?: number | null;

  // Inventory and identifiers
  sku?: string;
  stock?: number;

  // Ratings & reviews
  rating?: number;
  avgRating?: number;
  reviewsCount?: number;
  reviewCount?: number;

  // Product specifications (optional)
  specifications?: Specification[];

  // Optional blog/excerpt related to product
  blogPost?: {
    title: string;
    excerpt: string;
    content: string;
    author: string;
    publishedDate: string;
    coverImage: string;
  } | null;

  // Classification
  /** category can be string or object depending on API shape; make optional for flexibility */
  category?: Category | string;
  categoryId?: string;
  brand?: string | null;
  warranty?: string;
  // Timestamps
  createdAt?: string | Date;
  updatedAt?: string | Date;
  // Allow extra properties for backwards compatibility
  [key: string]: unknown;
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductImage {
  id: string;
  url: string;
  isMain?: boolean;
  productId?: string;
}

export interface Specification {
  id: string;
  key: string;
  value: string;
  isFilterable?: boolean;
  productId?: string;
}

export interface Category {
  id: string | number;
  name?: string;
  parentId?: string | null;
  children?: Category[];
  products?: Product[];
}
