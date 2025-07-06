'use client';

import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/lib/data/mock-data';

export default function CategorySection() {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Categorias</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/#${category.slug}`}
            className="category-card"
          >
            <div className="category-image bg-acai-primary/10">
              {category.image.startsWith('/') ? (
                <div className="w-full h-full flex items-center justify-center bg-acai-primary/20 rounded-full">
                  <span className="text-acai-primary text-2xl font-bold">{category.name.charAt(0)}</span>
                </div>
              ) : (
                <Image
                  src={category.image}
                  alt={category.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <span className="category-name">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
