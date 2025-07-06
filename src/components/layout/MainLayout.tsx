'use client';

import { ReactNode } from 'react';
import Header from './Header';
import StatusIndicator from './StatusIndicator';
import Footer from './Footer';
import Cart from '@/components/cart/Cart';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6 flex justify-between items-center">
            <StatusIndicator />
            <div className="text-sm">
              <span className="text-gray-500">Tempo de entrega:</span>
              <span className="font-medium ml-1">90 a 120min</span>
            </div>
          </div>

          {children}
        </div>
      </main>

      <Footer />
      <Cart />
    </div>
  );
}
