'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '@/lib/types';
import { products } from '@/lib/data/mock-data';

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: Product[];
  isSearching: boolean;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Update search results whenever searchTerm changes
  const updateSearchResults = (term: string) => {
    setSearchTerm(term);

    if (!term.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const normalizedTerm = term.toLowerCase().trim();

    const results = products.filter(product => {
      return (
        product.name.toLowerCase().includes(normalizedTerm) ||
        (product.description && product.description.toLowerCase().includes(normalizedTerm)) ||
        product.category.toLowerCase().includes(normalizedTerm)
      );
    });

    setSearchResults(results);
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm: updateSearchResults,
        searchResults,
        isSearching,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
