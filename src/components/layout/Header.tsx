'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Searching for:', searchTerm);
  }, [searchTerm]);

  return (
    <header className="sticky top-0 z-50 bg-acai-primary shadow-md">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <div className="font-bold text-white text-xl">Rei do Açaí</div>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 mx-4 max-w-xl">
          <div className="relative">
            <Input
              type="search"
              placeholder="Pesquisar cardápio"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/90 focus:bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </form>

        {/* Categories Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-white font-medium">
              Categorias
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Link href="/#combo-especial" className="w-full">Combo Especial</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/#acai" className="w-full">Açaí</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/#acai-e-cupuacu" className="w-full">Açaí e Cupuaçu</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/#milk-shake-de-pistache" className="w-full">Milk-shake de Pistache</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/#potinhos-da-felicidade" className="w-full">Potinhos da Felicidade ❤</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/#bebidas" className="w-full">BEBIDAS</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Button */}
        <Button variant="ghost" className="ml-2 text-white">
          <User className="h-5 w-5 mr-2" />
          Perfil
        </Button>
      </div>
    </header>
  );
}
