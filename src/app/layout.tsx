import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/lib/context/cart-context'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Açaí Fruit King - Pedido online',
  description: 'Clique aqui e faça seu pedido no Rei do Açaí e receba no conforto de sua casa. Confira nossas promoções exclusivas e seja notificado em tempo real sobre seu pedido',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
