'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { dailyPromotions } from '@/lib/data/mock-data';
import type { DailyPromotion } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

// Helper to get day abbreviation in Portuguese
const getDayAbbreviation = (day: string) => {
  // Map full day names to abbreviations (Portuguese)
  const dayMap: { [key: string]: string } = {
    'Domingo': 'DOM',
    'Segunda': 'SEG',
    'Terça': 'TER',
    'Quarta': 'QUA',
    'Quinta': 'QUI',
    'Sexta': 'SEX',
    'Sábado': 'SÁB',
  };
  return dayMap[day] || day.slice(0, 3).toUpperCase();
};

export default function DailyPromotionsCarousel() {
  const [selectedPromotion, setSelectedPromotion] = useState<DailyPromotion | null>(null);

  const handleAddToCart = (promotion: DailyPromotion) => {
    console.log('Adding to cart:', promotion);
    // Add to cart functionality would go here
  };

  return (
    <section className="w-full mb-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {dailyPromotions.map((promotion) => (
            <CarouselItem key={promotion.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="daily-promotion-card h-full">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="w-full md:w-1/3 min-h-[120px] bg-acai-secondary/30 flex items-center justify-center">
                    <div className="text-white text-4xl font-bold">
                      {getDayAbbreviation(promotion.day)}
                    </div>
                  </div>
                  <div className="daily-promotion-content w-full md:w-2/3 flex flex-col justify-between">
                    <div>
                      <span className="daily-promotion-day">{promotion.day}</span>
                      <h3 className="text-xl font-bold mb-1">{promotion.name}</h3>
                      <p className="text-sm opacity-90 mb-3 line-clamp-2">{promotion.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="daily-promotion-price">
                        <span className="daily-promotion-old-price">R${promotion.originalPrice.toFixed(2)}</span>
                        <span className="daily-promotion-current-price">R${promotion.price.toFixed(2)}</span>
                      </div>
                      <Button
                        onClick={() => handleAddToCart(promotion)}
                        className="bg-white text-acai-secondary hover:bg-white/90"
                      >
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 bg-white text-acai-secondary px-2 py-1 rounded-bl-md font-bold text-sm">
                  limitado!
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-white text-acai-secondary" />
        <CarouselNext className="right-2 bg-white text-acai-secondary" />
      </Carousel>
    </section>
  );
}
