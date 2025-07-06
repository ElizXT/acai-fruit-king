'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '@/lib/context/search-context';
import ProductCard from '@/components/product/ProductCard';
import { Dialog } from '@/components/ui/dialog';
import { Product } from '@/lib/types';

export default function SearchResults() {
  const { searchTerm, searchResults, isSearching } = useSearch();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    console.log('Adding to cart:', product);
    // Add to cart logic would go here
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  if (!isSearching) {
    return null;
  }

  return (
    <section className="my-8">
      <div className="flex items-center mb-4">
        <Search className="h-5 w-5 mr-2 text-acai-primary" />
        <h2 className="text-xl font-semibold">
          {searchResults.length > 0
            ? `Resultados para "${searchTerm}" (${searchResults.length})`
            : `Nenhum resultado para "${searchTerm}"`}
        </h2>
      </div>

      {searchResults.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">Tente pesquisar por outro termo ou navegue pelas categorias abaixo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
    </section>
  );
}
