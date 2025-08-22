// User types
export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  createdAt: string;
  lastLoginAt?: string;
  isActive: boolean;
}

export interface UserRegistration {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

// Product types
export interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  stockQuantity: number;
  imageUrl?: string;
  brand?: string;
  model?: string;
  createdAt: string;
  updatedAt?: string;
  isActive: boolean;
  categoryId: number;
  sellerId: number;
  category: Category;
  seller: User;
  images: ProductImage[];
  reviews: Review[];
}

export interface ProductImage {
  id: number;
  imageUrl: string;
  altText?: string;
  isPrimary: boolean;
  displayOrder: number;
  productId: number;
}

// Category types
export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  parentCategoryId?: number;
  isActive: boolean;
  displayOrder: number;
  parentCategory?: Category;
  subCategories: Category[];
  products: Product[];
}

// Order types
export interface Order {
  id: number;
  orderNumber: string;
  orderDate: string;
  shippedDate?: string;
  deliveredDate?: string;
  totalAmount: number;
  shippingCost: number;
  taxAmount: number;
  status: string;
  shippingAddress?: string;
  billingAddress?: string;
  notes?: string;
  userId: number;
  user: User;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  orderId: number;
  productId: number;
  order: Order;
  product: Product;
}

// Review types
export interface Review {
  id: number;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt?: string;
  isVerified: boolean;
  productId: number;
  userId: number;
  product: Product;
  user: User;
}

// Cart types
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

// Filter types
export interface ProductFilters {
  search?: string;
  categoryIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  pageNumber?: number;
  pageSize?: number;
}

// Form types
export interface FormErrors {
  [key: string]: string;
} 