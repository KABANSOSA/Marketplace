'use client';

import { useState } from 'react';
import SearchAndFilter from '@/components/SearchAndFilter';
import PartCard from '@/components/PartCard';

interface Part {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  specifications: {
    width?: number;
    height?: number;
    depth?: number;
    weight?: number;
    material?: string;
    color?: string;
    [key: string]: any;
  };
  manufacturer: string;
  inStock: boolean;
}

// Временные данные для демонстрации
const initialParts: Part[] = [
  {
    id: 1,
    name: 'Гидроцилиндр экскаватора',
    category: 'Гидравлика',
    price: 45000,
    image: '/images/hydraulic-cylinder.jpg',
    specifications: {
      diameter: '100 мм',
      stroke: '500 мм',
      pressure: '20 МПа'
    },
    manufacturer: 'Komatsu',
    inStock: true
  },
  {
    id: 2,
    name: 'Гусеничная цепь',
    category: 'Ходовая часть',
    price: 120000,
    image: '/images/track-chain.jpg',
    specifications: {
      width: 600,
      pitch: '203 мм',
      links: 45
    },
    manufacturer: 'Caterpillar',
    inStock: true
  }
];

export default function CategoryPage({
  params
}: {
  params: { slug: string };
}) {
  const [parts, setParts] = useState<Part[]>(initialParts);
  const [cart, setCart] = useState<Part[]>([]);

  const handleSearch = (query: string) => {
    // Здесь будет логика поиска
    console.log('Search query:', query);
  };

  const handleFilter = (filters: any) => {
    // Здесь будет логика фильтрации
    console.log('Filters:', filters);
  };

  const handleAddToCart = (part: Part) => {
    setCart(prev => [...prev, part]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Категория: {params.slug}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Боковая панель с поиском и фильтрами */}
          <div className="lg:col-span-1">
            <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
          </div>

          {/* Сетка товаров */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parts.map(part => (
                <PartCard
                  key={part.id}
                  {...part}
                  onAddToCart={() => handleAddToCart(part)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 