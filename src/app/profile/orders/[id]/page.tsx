'use client';

import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  specifications: Record<string, string>;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: OrderItem[];
  delivery: {
    method: string;
    address: string;
    city: string;
    postalCode: string;
  };
  payment: {
    method: string;
    status: 'pending' | 'completed';
  };
}

// Временные данные для демонстрации
const order: Order = {
  id: '123456',
  date: '2024-03-15',
  status: 'delivered',
  total: 165000,
  items: [
    {
      id: 1,
      name: 'Гидроцилиндр экскаватора',
      quantity: 1,
      price: 45000,
      image: '/images/hydraulic-cylinder.jpg',
      specifications: {
        diameter: '100мм',
        stroke: '500мм',
        pressure: '25МПа'
      }
    },
    {
      id: 2,
      name: 'Гусеничная цепь бульдозера',
      quantity: 2,
      price: 120000,
      image: '/images/track-chain.jpg',
      specifications: {
        width: '500мм',
        pitch: '203мм',
        plates: '41'
      }
    }
  ],
  delivery: {
    method: 'Стандартная доставка',
    address: 'ул. Примерная, д. 1',
    city: 'Москва',
    postalCode: '123456'
  },
  payment: {
    method: 'Банковской картой',
    status: 'completed'
  }
};

export default function OrderDetails() {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'processing':
        return <Package className="w-5 h-5" />;
      case 'shipped':
        return <Truck className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Ожидает обработки';
      case 'processing':
        return 'В обработке';
      case 'shipped':
        return 'Отправлен';
      case 'delivered':
        return 'Доставлен';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/profile/orders"
            className="inline-flex items-center text-primary hover:text-primary/90"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к заказам
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Заказ #{order.id}
                </h1>
                <p className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString('ru-RU')}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Информация о товарах */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Товары
                </h2>
                <div className="space-y-6">
                  {order.items.map(item => (
                    <div key={item.id} className="flex">
                      <div className="relative h-24 w-24 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-base font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.quantity} шт. × {item.price.toLocaleString()} ₽
                        </p>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {Object.entries(item.specifications).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="text-sm text-gray-500"
                              >
                                <span className="font-medium">{key}:</span>{' '}
                                {value}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-base font-medium text-gray-900">
                          {(item.price * item.quantity).toLocaleString()} ₽
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Информация о доставке и оплате */}
              <div>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Информация о доставке
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">
                        {order.delivery.method}
                      </p>
                      <p className="mt-2 text-sm text-gray-900">
                        {order.delivery.address}
                      </p>
                      <p className="text-sm text-gray-900">
                        {order.delivery.city}, {order.delivery.postalCode}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Информация об оплате
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">
                        {order.payment.method}
                      </p>
                      <p className="mt-2 text-sm text-gray-900">
                        Статус:{' '}
                        <span
                          className={
                            order.payment.status === 'completed'
                              ? 'text-green-600'
                              : 'text-yellow-600'
                          }
                        >
                          {order.payment.status === 'completed'
                            ? 'Оплачено'
                            : 'Ожидает оплаты'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <p>Итого</p>
                <p>{order.total.toLocaleString()} ₽</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 