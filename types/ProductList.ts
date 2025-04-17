export interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

export interface Product {
  id: number;
  product_type: string;
  title: string;
  thumbnail_url: string;
  slug: string;
  rating_average: string;
  reviews_count: number;
  participants_count: number;
  authors_info: AuthorInfo[];
}

export interface AuthorInfo {
  // Define aquí las propiedades correspondientes cuando estén disponibles.
}

export interface TaxonomyResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Taxonomy[];
}

export interface Taxonomy {
  id: number;
  name: string;
  slug: string;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}