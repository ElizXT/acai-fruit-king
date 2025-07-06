'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const handleClick = () => {
    onViewDetails(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <Card className="product-card cursor-pointer hover:border-acai-primary/50" onClick={handleClick}>
      <div className="relative">
        {product.isNew && (
          <Badge variant="secondary" className="absolute top-2 left-2 bg-acai-secondary text-white z-10">
            NOVIDADE
          </Badge>
        )}
        {product.originalPrice && product.originalPrice > product.price && (
          <Badge variant="secondary" className="absolute top-2 left-2 bg-acai-primary text-white z-10">
            PROMO DO DIA
          </Badge>
        )}
        <div className="relative h-40 w-full">
          <div className="w-full h-full flex items-center justify-center bg-acai-primary/10">
            <span className="text-acai-primary text-2xl font-bold">{product.name.split(' ')[0]}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="product-name text-acai-text">{product.name}</h3>
        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <div className="flex flex-col">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
          <span className="product-price">
            {formatCurrency(product.price)}
          </span>
        </div>

        <Button
          size="sm"
          className="rounded-full w-8 h-8 p-0"
          disabled={product.isOutOfStock}
          onClick={handleAddToCart}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Adicionar ao carrinho</span>
        </Button>
      </CardFooter>

      {product.isOutOfStock && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <span className="text-acai-secondary font-semibold text-sm px-2 py-1 bg-acai-light rounded-md">
            Fora de estoque
          </span>
        </div>
      )}
    </Card>
  );
}
