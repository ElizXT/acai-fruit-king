import MainLayout from '@/components/layout/MainLayout';
import DailyPromotionsCarousel from '@/components/sections/DailyPromotionsCarousel';
import CategorySection from '@/components/sections/CategorySection';
import ProductList from '@/components/sections/ProductList';

export default function Home() {
  return (
    <MainLayout>
      <h1 className="sr-only">Açaí Fruit King - Pedidos Online</h1>

      <DailyPromotionsCarousel />
      <CategorySection />
      <ProductList />
    </MainLayout>
  );
}
