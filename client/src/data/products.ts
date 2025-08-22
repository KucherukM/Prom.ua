import { getProductImage } from './images';

export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  discount: number;
  rating: number;
  reviews: number;
  seller: string;
  category: string;
  description?: string;
}

// Товари по категоріях
export const productsByCategory: Record<string, Product[]> = {
  'Техніка та електроніка': [
    {
      id: 1,
      title: 'iPhone 15 Pro 256GB',
      price: 45999,
      originalPrice: 49999,
      image: getProductImage('iPhone 15 Pro 256GB'),
      discount: 8,
      rating: 4.8,
      reviews: 124,
      seller: 'Apple Store',
      category: 'Техніка та електроніка'
    },
    {
      id: 2,
      title: 'Samsung Galaxy S24 Ultra',
      price: 32999,
      originalPrice: 36999,
      image: getProductImage('Samsung Galaxy S24 Ultra'),
      discount: 11,
      rating: 4.7,
      reviews: 89,
      seller: 'Samsung Shop',
      category: 'Техніка та електроніка'
    },
    {
      id: 3,
      title: 'MacBook Air M2 13"',
      price: 42999,
      originalPrice: 45999,
      image: getProductImage('MacBook Air M2 13"'),
      discount: 7,
      rating: 4.9,
      reviews: 156,
      seller: 'Apple Store',
      category: 'Техніка та електроніка'
    },
    {
      id: 4,
      title: 'Sony WH-1000XM5',
      price: 12999,
      originalPrice: 15999,
      image: getProductImage('Sony WH-1000XM5'),
      discount: 19,
      rating: 4.6,
      reviews: 203,
      seller: 'Audio Pro',
      category: 'Техніка та електроніка'
    },
    {
      id: 5,
      title: 'Canon EOS R6 Mark II',
      price: 89999,
      originalPrice: 99999,
      image: getProductImage('Canon EOS R6 Mark II'),
      discount: 10,
      rating: 4.8,
      reviews: 45,
      seller: 'Photo Pro',
      category: 'Техніка та електроніка'
    },
    {
      id: 6,
      title: 'Apple Watch Series 9',
      price: 15999,
      originalPrice: 17999,
      image: getProductImage('Apple Watch Series 9'),
      discount: 11,
      rating: 4.7,
      reviews: 89,
      seller: 'Apple Store',
      category: 'Техніка та електроніка'
    },
    {
      id: 7,
      title: 'Samsung 4K Smart TV',
      price: 25999,
      originalPrice: 29999,
      image: getProductImage('Samsung 4K Smart TV'),
      discount: 13,
      rating: 4.6,
      reviews: 156,
      seller: 'Samsung Shop',
      category: 'Техніка та електроніка'
    },
    {
      id: 8,
      title: 'Sony PlayStation 5',
      price: 19999,
      originalPrice: 22999,
      image: getProductImage('Sony PlayStation 5'),
      discount: 13,
      rating: 4.9,
      reviews: 445,
      seller: 'Game Store',
      category: 'Техніка та електроніка'
    },
    {
      id: 9,
      title: 'iPad Pro 12.9"',
      price: 35999,
      originalPrice: 39999,
      image: getProductImage('iPad Pro 12.9"'),
      discount: 10,
      rating: 4.7,
      reviews: 123,
      seller: 'Apple Store',
      category: 'Техніка та електроніка'
    },
    {
      id: 10,
      title: 'AirPods Pro 2',
      price: 8999,
      originalPrice: 10999,
      image: getProductImage('AirPods Pro 2'),
      discount: 18,
      rating: 4.5,
      reviews: 234,
      seller: 'Apple Store',
      category: 'Техніка та електроніка'
    }
  ],

  'Одяг та взуття': [
    {
      id: 11,
      title: 'Nike Air Max 270',
      price: 3999,
      originalPrice: 4999,
      image: getProductImage('Nike Air Max 270'),
      discount: 20,
      rating: 4.5,
      reviews: 67,
      seller: 'Sport Store',
      category: 'Одяг та взуття'
    },
    {
      id: 12,
      title: 'Nike ZoomX Vaporfly',
      price: 8999,
      originalPrice: 10999,
      image: getProductImage('Nike ZoomX Vaporfly'),
      discount: 18,
      rating: 4.5,
      reviews: 67,
      seller: 'Sport Store',
      category: 'Одяг та взуття'
    },
    {
      id: 13,
      title: 'Adidas Ultraboost 22',
      price: 5999,
      originalPrice: 6999,
      image: getProductImage('Adidas Ultraboost 22'),
      discount: 14,
      rating: 4.4,
      reviews: 89,
      seller: 'Sport Store',
      category: 'Одяг та взуття'
    },
    {
      id: 14,
      title: 'Nike Dri-FIT T-Shirt',
      price: 899,
      originalPrice: 1299,
      image: getProductImage('Nike Dri-FIT T-Shirt'),
      discount: 31,
      rating: 4.3,
      reviews: 156,
      seller: 'Sport Store',
      category: 'Одяг та взуття'
    },
    {
      id: 15,
      title: 'Adidas Track Jacket',
      price: 1499,
      originalPrice: 1999,
      image: getProductImage('Adidas Track Jacket'),
      discount: 25,
      rating: 4.2,
      reviews: 78,
      seller: 'Sport Store',
      category: 'Одяг та взуття'
    },
    {
      id: 16,
      title: 'Levi\'s 501 Jeans',
      price: 2499,
      originalPrice: 2999,
      image: getProductImage('Levi\'s 501 Jeans'),
      discount: 17,
      rating: 4.6,
      reviews: 234,
      seller: 'Fashion Store',
      category: 'Одяг та взуття'
    },
    {
      id: 17,
      title: 'Zara Blazer',
      price: 3999,
      originalPrice: 4999,
      image: getProductImage('Zara Blazer'),
      discount: 20,
      rating: 4.4,
      reviews: 89,
      seller: 'Fashion Store',
      category: 'Одяг та взуття'
    },
    {
      id: 18,
      title: 'H&M Summer Dress',
      price: 1299,
      originalPrice: 1799,
      image: getProductImage('H&M Summer Dress'),
      discount: 28,
      rating: 4.1,
      reviews: 67,
      seller: 'Fashion Store',
      category: 'Одяг та взуття'
    },
    {
      id: 19,
      title: 'Nike Air Jordan 1',
      price: 12999,
      originalPrice: 14999,
      image: getProductImage('Nike Air Jordan 1'),
      discount: 13,
      rating: 4.8,
      reviews: 445,
      seller: 'Sport Store',
      category: 'Одяг та взуття'
    },
    {
      id: 20,
      title: 'Adidas Stan Smith',
      price: 2999,
      originalPrice: 3999,
      image: getProductImage('Adidas Stan Smith'),
      discount: 25,
      rating: 4.5,
      reviews: 178,
      seller: 'Sport Store',
      category: 'Одяг та взуття'
    }
  ],

  'Побутова техніка': [
    {
      id: 21,
      title: 'Dyson V15 Detect',
      price: 18999,
      originalPrice: 21999,
      image: getProductImage('Dyson V15 Detect'),
      discount: 14,
      rating: 4.8,
      reviews: 234,
      seller: 'Home Pro',
      category: 'Побутова техніка'
    },
    {
      id: 22,
      title: 'Samsung Refrigerator',
      price: 45999,
      originalPrice: 52999,
      image: getProductImage('Samsung Refrigerator'),
      discount: 13,
      rating: 4.7,
      reviews: 89,
      seller: 'Home Pro',
      category: 'Побутова техніка'
    },
    {
      id: 23,
      title: 'LG Washing Machine',
      price: 25999,
      originalPrice: 29999,
      image: getProductImage('LG Washing Machine'),
      discount: 13,
      rating: 4.6,
      reviews: 156,
      seller: 'Home Pro',
      category: 'Побутова техніка'
    },
    {
      id: 24,
      title: 'Philips Air Fryer',
      price: 3999,
      originalPrice: 4999,
      image: getProductImage('Philips Air Fryer'),
      discount: 20,
      rating: 4.4,
      reviews: 234,
      seller: 'Home Pro',
      category: 'Побутова техніка'
    },
    {
      id: 25,
      title: 'Dyson Airwrap',
      price: 15999,
      originalPrice: 18999,
      image: getProductImage('Dyson Airwrap'),
      discount: 16,
      rating: 4.8,
      reviews: 445,
      seller: 'Beauty Pro',
      category: 'Побутова техніка'
    }
  ],

  'Спорт та відпочинок': [
    {
      id: 26,
      title: 'Yoga Mat Premium',
      price: 899,
      originalPrice: 1299,
      image: getProductImage('Yoga Mat Premium'),
      discount: 31,
      rating: 4.3,
      reviews: 156,
      seller: 'Sport Store',
      category: 'Спорт та відпочинок'
    },
    {
      id: 27,
      title: 'Dumbbells Set 20kg',
      price: 2999,
      originalPrice: 3999,
      image: getProductImage('Dumbbells Set 20kg'),
      discount: 25,
      rating: 4.5,
      reviews: 89,
      seller: 'Sport Store',
      category: 'Спорт та відпочинок'
    },
    {
      id: 28,
      title: 'Bicycle Mountain',
      price: 15999,
      originalPrice: 18999,
      image: getProductImage('Bicycle Mountain'),
      discount: 16,
      rating: 4.6,
      reviews: 67,
      seller: 'Sport Store',
      category: 'Спорт та відпочинок'
    },
    {
      id: 29,
      title: 'Tennis Racket Pro',
      price: 1999,
      originalPrice: 2499,
      image: getProductImage('Tennis Racket Pro'),
      discount: 20,
      rating: 4.4,
      reviews: 123,
      seller: 'Sport Store',
      category: 'Спорт та відпочинок'
    },
    {
      id: 30,
      title: 'Garmin Forerunner 945',
      price: 12999,
      originalPrice: 14999,
      image: getProductImage('Garmin Forerunner 945'),
      discount: 13,
      rating: 4.7,
      reviews: 234,
      seller: 'Sport Store',
      category: 'Спорт та відпочинок'
    }
  ],

  'Краса та здоров\'я': [
    {
      id: 31,
      title: 'MAC Lipstick Ruby Woo',
      price: 899,
      originalPrice: 1199,
      image: getProductImage('MAC Lipstick Ruby Woo'),
      discount: 25,
      rating: 4.6,
      reviews: 445,
      seller: 'Beauty Pro',
      category: 'Краса та здоров\'я'
    },
    {
      id: 32,
      title: 'L\'Oreal Foundation',
      price: 699,
      originalPrice: 999,
      image: getProductImage('L\'Oreal Foundation'),
      discount: 30,
      rating: 4.3,
      reviews: 234,
      seller: 'Beauty Pro',
      category: 'Краса та здоров\'я'
    },
    {
      id: 33,
      title: 'Nivea Face Cream',
      price: 299,
      originalPrice: 399,
      image: getProductImage('Nivea Face Cream'),
      discount: 25,
      rating: 4.2,
      reviews: 567,
      seller: 'Beauty Pro',
      category: 'Краса та здоров\'я'
    },
    {
      id: 34,
      title: 'Dove Shower Gel',
      price: 199,
      originalPrice: 299,
      image: getProductImage('Dove Shower Gel'),
      discount: 33,
      rating: 4.1,
      reviews: 789,
      seller: 'Beauty Pro',
      category: 'Краса та здоров\'я'
    },
    {
      id: 35,
      title: 'Chanel Perfume',
      price: 8999,
      originalPrice: 10999,
      image: getProductImage('Chanel Perfume'),
      discount: 18,
      rating: 4.8,
      reviews: 234,
      seller: 'Luxury Store',
      category: 'Краса та здоров\'я'
    }
  ],

  'Дім та сад': [
    {
      id: 36,
      title: 'Garden Hose 50m',
      price: 899,
      originalPrice: 1299,
      image: getProductImage('Garden Hose 50m'),
      discount: 31,
      rating: 4.2,
      reviews: 89,
      seller: 'Garden Store',
      category: 'Дім та сад'
    },
    {
      id: 37,
      title: 'Garden Tools Set',
      price: 1999,
      originalPrice: 2499,
      image: getProductImage('Garden Tools Set'),
      discount: 20,
      rating: 4.4,
      reviews: 156,
      seller: 'Garden Store',
      category: 'Дім та сад'
    },
    {
      id: 38,
      title: 'BBQ Grill Portable',
      price: 3999,
      originalPrice: 4999,
      image: getProductImage('BBQ Grill Portable'),
      discount: 20,
      rating: 4.5,
      reviews: 123,
      seller: 'Garden Store',
      category: 'Дім та сад'
    },
    {
      id: 39,
      title: 'Garden Chair Set',
      price: 2999,
      originalPrice: 3999,
      image: getProductImage('Garden Chair Set'),
      discount: 25,
      rating: 4.3,
      reviews: 78,
      seller: 'Garden Store',
      category: 'Дім та сад'
    },
    {
      id: 40,
      title: 'Lawn Mower Electric',
      price: 8999,
      originalPrice: 10999,
      image: getProductImage('Lawn Mower Electric'),
      discount: 18,
      rating: 4.6,
      reviews: 67,
      seller: 'Garden Store',
      category: 'Дім та сад'
    }
  ],

  'Товари для дітей': [
    {
      id: 41,
      title: 'Baby Stroller Premium',
      price: 8999,
      originalPrice: 10999,
      image: getProductImage('Baby Stroller Premium'),
      discount: 18,
      rating: 4.7,
      reviews: 234,
      seller: 'Baby Store',
      category: 'Товари для дітей'
    },
    {
      id: 42,
      title: 'Baby Car Seat',
      price: 3999,
      originalPrice: 4999,
      image: getProductImage('Baby Car Seat'),
      discount: 20,
      rating: 4.8,
      reviews: 445,
      seller: 'Baby Store',
      category: 'Товари для дітей'
    },
    {
      id: 43,
      title: 'Baby Crib',
      price: 15999,
      originalPrice: 18999,
      image: getProductImage('Baby Crib'),
      discount: 16,
      rating: 4.6,
      reviews: 123,
      seller: 'Baby Store',
      category: 'Товари для дітей'
    },
    {
      id: 44,
      title: 'Baby Monitor',
      price: 2999,
      originalPrice: 3999,
      image: getProductImage('Baby Monitor'),
      discount: 25,
      rating: 4.5,
      reviews: 178,
      seller: 'Baby Store',
      category: 'Товари для дітей'
    },
    {
      id: 45,
      title: 'Baby Toys Set',
      price: 899,
      originalPrice: 1299,
      image: getProductImage('Baby Toys Set'),
      discount: 31,
      rating: 4.3,
      reviews: 234,
      seller: 'Baby Store',
      category: 'Товари для дітей'
    }
  ],

  'Авто - мото': [
    {
      id: 46,
      title: 'Car GPS Navigator',
      price: 2999,
      originalPrice: 3999,
      image: getProductImage('Car GPS Navigator'),
      discount: 25,
      rating: 4.4,
      reviews: 156,
      seller: 'Auto Store',
      category: 'Авто - мото'
    },
    {
      id: 47,
      title: 'Car Phone Holder',
      price: 399,
      originalPrice: 599,
      image: getProductImage('Car Phone Holder'),
      discount: 33,
      rating: 4.2,
      reviews: 234,
      seller: 'Auto Store',
      category: 'Авто - мото'
    },
    {
      id: 48,
      title: 'Car Wash Kit',
      price: 899,
      originalPrice: 1299,
      image: getProductImage('Car Wash Kit'),
      discount: 31,
      rating: 4.3,
      reviews: 89,
      seller: 'Auto Store',
      category: 'Авто - мото'
    },
    {
      id: 49,
      title: 'Car Dash Cam',
      price: 1999,
      originalPrice: 2499,
      image: getProductImage('Car Dash Cam'),
      discount: 20,
      rating: 4.5,
      reviews: 123,
      seller: 'Auto Store',
      category: 'Авто - мото'
    },
    {
      id: 50,
      title: 'Car Jump Starter',
      price: 3999,
      originalPrice: 4999,
      image: getProductImage('Car Jump Starter'),
      discount: 20,
      rating: 4.6,
      reviews: 67,
      seller: 'Auto Store',
      category: 'Авто - мото'
    }
  ]
};

// Всі товари в одному масиві
export const allProducts: Product[] = Object.values(productsByCategory).flat();

// Функція для отримання товарів по категорії
export const getProductsByCategory = (category: string): Product[] => {
  return productsByCategory[category] || [];
};

// Функція для пошуку товарів
export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return allProducts.filter(product => 
    product.title.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.seller.toLowerCase().includes(lowercaseQuery)
  );
};
