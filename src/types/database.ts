export type User = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
  last_login_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  website_url: string;
  category: string;
  created_at: string;
  created_by: string;
};

export type Review = {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  status: 'published' | 'pending' | 'deleted';
};

export type Database = {
  users: User[];
  products: Product[];
  reviews: Review[];
}; 