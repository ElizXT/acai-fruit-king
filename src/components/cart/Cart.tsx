'use client';

import { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/lib/context/cart-context';
import { toast } from 'sonner';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, removeItem, updateQuantity, clearCart, totalItems, subtotal } = useCart();

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    toast.success('Pedido finalizado com sucesso!');
    clearCart();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg bg-acai-primary hover:bg-acai-primary/90 border-0 z-50"
        >
          <ShoppingCart className="h-6 w-6 text-white" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-acai-secondary text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Meu pedido</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Seu carrinho está vazio</h3>
              <p className="text-sm text-gray-500 mt-1">
                Adicione alguns itens para começar
              </p>
              <Button
                className="mt-6"
                onClick={() => setIsOpen(false)}
              >
                Continuar comprando
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center shrink-0">
                    <span className="text-acai-primary font-bold">{item.name.charAt(0)}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-sm text-gray-500 truncate">
                      {item.size && `Tamanho: ${item.size}`}
                    </p>

                    {item.additionals && item.additionals.length > 0 && (
                      <div className="mt-1">
                        <p className="text-xs text-gray-500">Adicionais:</p>
                        <ul className="text-xs text-gray-500">
                          {item.additionals.map((additional) => (
                            <li key={additional.id}>
                              {additional.name} (+{formatCurrency(additional.price)})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="font-medium text-acai-primary">
                      {formatCurrency(item.price * item.quantity)}
                    </p>

                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-full"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Diminuir</span>
                      </Button>

                      <span className="w-8 text-center text-sm">{item.quantity}</span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-full"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Aumentar</span>
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0 text-gray-400 hover:text-red-500"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remover</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <div className="p-4 border-t">
              <div className="flex justify-between py-2">
                <span className="text-sm">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-sm">Taxa de entrega</span>
                <span className="font-medium">Grátis</span>
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between py-2">
                <span className="font-medium">Total</span>
                <span className="font-bold text-acai-primary text-lg">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </div>

            <SheetFooter className="p-4 border-t">
              <Button
                className="w-full"
                onClick={handleCheckout}
              >
                Finalizar pedido
              </Button>

              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => setIsOpen(false)}
              >
                Continuar comprando
              </Button>

              <Button
                variant="link"
                className="w-full mt-1 text-red-500"
                onClick={handleClearCart}
              >
                Limpar carrinho
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
