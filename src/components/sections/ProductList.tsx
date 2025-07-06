'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ProductCard from '@/components/product/ProductCard';
import { categories, products } from '@/lib/data/mock-data';
import type { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

export default function ProductList() {
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

  const productsByCategory = categories.map(category => {
    const categoryProducts = products.filter(product => product.category === category.slug);
    return {
      ...category,
      products: categoryProducts
    };
  });

  return (
    <>
      {productsByCategory.map(category => (
        category.products.length > 0 && (
          <section key={category.id} id={category.slug} className="mb-10">
            <h2 className="text-2xl font-bold mb-5 text-acai-text">{category.name}</h2>
            {category.slug === 'milk-shake-de-pistache' && (
              <p className="text-sm text-gray-600 mb-4">
                O melhor milkshake de pistache que você já provou!
              </p>
            )}
            {category.slug === 'potinhos-da-felicidade' && (
              <p className="text-sm text-gray-600 mb-4">
                O que era bom ficou ainda melhor, que tal levar pra casa o potinho da felicidade? São 260ml dos melhores cremes e mousses artesanal preparados com toda dedicação e excelência agora em suas mãos ❤
              </p>
            )}
            {category.slug === 'combo-especial' && (
              <p className="text-sm text-gray-600 mb-4">
                Neste combo você paga muito menos e leva mais!!
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </section>
        )
      ))}

      {/* Product Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedProduct?.description && (
              <p className="text-sm text-gray-600">{selectedProduct.description}</p>
            )}
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                {selectedProduct?.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(selectedProduct.originalPrice)}
                  </span>
                )}
                <span className="text-xl font-bold text-acai-primary">
                  {selectedProduct && formatCurrency(selectedProduct.price)}
                </span>
              </div>
              <button
                className="bg-acai-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-acai-primary/90"
                onClick={() => selectedProduct && handleAddToCart(selectedProduct)}
                disabled={selectedProduct?.isOutOfStock}
              >
                {selectedProduct?.isOutOfStock ? 'Fora de estoque' : 'Adicionar ao carrinho'}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
