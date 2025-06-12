// frontend/src/app/catalog/page.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Filter, ChevronDown, Star, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
}

// Временные данные для демонстрации
const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 14 Pro',
    price: 89990,
    oldPrice: 99990,
    image: 'https://via.placeholder.com/400x300?text=iPhone+14+Pro',
    category: 'Электроника',
    rating: 4.8,
    reviews: 12,
    isNew: true,
    discount: 10,
    inStock: true
  },
  {
    id: 2,
    name: 'MacBook Pro M2',
    price: 149990,
    image: 'https://via.placeholder.com/400x300?text=MacBook+Pro',
    category: 'Компьютеры',
    rating: 4.9,
    reviews: 8,
    inStock: true
  },
  {
    id: 3,
    name: 'Samsung Galaxy S23',
    price: 69990,
    oldPrice: 79990,
    image: 'https://via.placeholder.com/400x300?text=Samsung+S23',
    category: 'Электроника',
    rating: 4.5,
    reviews: 15,
    discount: 15,
    inStock: true
  },
  {
    id: 4,
    name: 'AirPods Pro 2',
    price: 24990,
    image: 'https://via.placeholder.com/400x300?text=AirPods+Pro',
    category: 'Аксессуары',
    rating: 4.7,
    reviews: 20,
    isNew: true,
    inStock: true
  },
  {
    id: 5,
    name: 'Samsung 4K Smart TV',
    price: 79990,
    oldPrice: 89990,
    image: 'https://via.placeholder.com/400x300?text=Samsung+TV',
    category: 'Бытовая техника',
    rating: 4.6,
    reviews: 10,
    discount: 12,
    inStock: true
  },
  {
    id: 6,
    name: 'Gaming PC RTX 4080',
    price: 199990,
    image: 'https://via.placeholder.com/400x300?text=Gaming+PC',
    category: 'Компьютеры',
    rating: 4.9,
    reviews: 5,
    isNew: true,
    inStock: true
  }
];

const categories = [
  { id: 1, name: 'Электроника' },
  { id: 2, name: 'Аксессуары' },
  { id: 3, name: 'Компьютеры' },
  { id: 4, name: 'Бытовая техника' }
];

const sortOptions = [
  { id: 'popular', name: 'По популярности' },
  { id: 'price-asc', name: 'По возрастанию цены' },
  { id: 'price-desc', name: 'По убыванию цены' },
  { id: 'new', name: 'По новизне' }
];

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory) {
        const category = categories.find((c) => c.id === selectedCategory);
        return product.category === category?.name;
      }
      return true;
    })
    .filter((product) => {
      return product.price >= priceRange.min && product.price <= priceRange.max;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'new':
          return a.isNew ? -1 : b.isNew ? 1 : 0;
        default:
          return b.rating - a.rating;
      }
    });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Фильтры */}
        <div className="w-full md:w-64">
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm"
            >
              <span className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Фильтры
              </span>
              <ChevronDown
                className={`w-5 h-5 transform transition-transform ${
                  showFilters ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          <div
            className={`${
              showFilters ? 'block' : 'hidden'
            } md:block bg-white rounded-lg shadow-sm p-4`}
          >
            <h2 className="font-semibold mb-4">Категории</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category.id}
                    onChange={() => setSelectedCategory(category.id)}
                    className="text-blue-600"
                  />
                  <span>{category.name}</span>
                </label>
              ))}
            </div>

            <div className="mt-6">
              <h2 className="font-semibold mb-4">Цена</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: Number(e.target.value) })
                    }
                    className="w-full px-2 py-1 border rounded"
                    placeholder="От"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: Number(e.target.value) })
                    }
                    className="w-full px-2 py-1 border rounded"
                    placeholder="До"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Список товаров */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Каталог товаров</h1>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <Link href={`/catalog/product/${product.id}`}>
                  <div className="relative h-48">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isNew && (
                      <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                        Новинка
                      </span>
                    )}
                    {product.discount && (
                      <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <Link
                    href={`/catalog/product/${product.id}`}
                    className="block"
                  >
                    <h3 className="text-lg font-semibold mb-2 hover:text-blue-600">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-600">
                      {product.rating} ({product.reviews} отзывов)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      {product.oldPrice && (
                        <span className="ml-2 text-gray-500 line-through">
                          {product.oldPrice.toLocaleString('ru-RU')} ₽
                        </span>
                      )}
                    </div>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <ShoppingCart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}