'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import type { Product, Additional } from '@/lib/types';

// Sample additionals for customization
const SAMPLE_ADDITIONALS: Additional[] = [
  { id: "add-1", name: "Leite condensado", price: 2.00 },
  { id: "add-2", name: "Granola", price: 1.50 },
  { id: "add-3", name: "Morango", price: 3.00 },
  { id: "add-4", name: "Banana", price: 2.00 },
  { id: "add-5", name: "Nutella", price: 4.00 },
  { id: "add-6", name: "Kiwi", price: 3.50 },
  { id: "add-7", name: "Leite em pó", price: 1.50 },
  { id: "add-8", name: "Castanha", price: 3.00 },
  { id: "add-9", name: "Côco ralado", price: 1.50 },
  { id: "add-10", name: "Paçoca", price: 2.00 },
];

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (product: Product, quantity: number, additionals: Additional[]) => void;
}

export default function ProductDetailModal({
  product,
  open,
  onOpenChange,
  onAddToCart
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAdditionals, setSelectedAdditionals] = useState<Additional[]>([]);

  const handleIncrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleToggleAdditional = (additional: Additional) => {
    setSelectedAdditionals(prev => {
      const exists = prev.some(item => item.id === additional.id);
      if (exists) {
        return prev.filter(item => item.id !== additional.id);
      } else {
        return [...prev, additional];
      }
    });
  };

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, quantity, selectedAdditionals);
      onOpenChange(false);
      setQuantity(1);
      setSelectedAdditionals([]);
    }
  };

  const calculateTotalPrice = () => {
    if (!product) return 0;

    const additionalsCost = selectedAdditionals.reduce((sum, item) => sum + item.price, 0);
    return (product.price + additionalsCost) * quantity;
  };

  // Reset state when modal opens with a new product
  if (!open) {
    // Reset on close
    if (quantity !== 1 || selectedAdditionals.length > 0) {
      setQuantity(1);
      setSelectedAdditionals([]);
    }
  }

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{product.name}</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="mt-2">
          {product.description && (
            <p className="text-sm text-gray-600 mb-3">{product.description}</p>
          )}

          <div className="relative h-40 w-full rounded-md overflow-hidden mb-4">
            <div className="w-full h-full flex items-center justify-center bg-acai-primary/10">
              <span className="text-acai-primary text-3xl font-bold">{product.name.split(' ')[0]}</span>
            </div>
            {product.isNew && (
              <Badge variant="secondary" className="absolute top-2 left-2 bg-acai-secondary text-white">
                NOVIDADE
              </Badge>
            )}
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-xl text-acai-primary">
              {formatCurrency(product.price)}
            </div>

            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleDecrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Diminuir</span>
              </Button>

              <span className="w-10 text-center font-medium">{quantity}</span>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleIncrementQuantity}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Aumentar</span>
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="font-medium mb-3">Adicionais</h3>
            <div className="grid grid-cols-2 gap-2">
              {SAMPLE_ADDITIONALS.map(additional => {
                const isSelected = selectedAdditionals.some(item => item.id === additional.id);
                return (
                  <div
                    key={additional.id}
                    className={`
                      border rounded-md p-2 cursor-pointer transition-colors
                      ${isSelected ? 'border-acai-primary bg-acai-primary/5' : 'border-gray-200 hover:border-acai-primary/50'}
                    `}
                    onClick={() => handleToggleAdditional(additional)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{additional.name}</span>
                      <Badge variant="outline" className={isSelected ? 'bg-acai-primary text-white' : ''}>
                        + {formatCurrency(additional.price)}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between items-center font-bold">
            <span>Total:</span>
            <span className="text-acai-primary text-xl">{formatCurrency(calculateTotalPrice())}</span>
          </div>
        </div>

        <DialogFooter>
          <Button className="w-full" onClick={handleAddToCart}>
            Adicionar ao carrinho
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
