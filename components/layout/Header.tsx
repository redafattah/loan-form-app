'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-500">
          <img src="sofac.png" className='h-8' alt="logo sofac" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-zinc-700">
          <Link href="/" className="hover:text-blue-500 transition">
            Simuler un prêt
          </Link>
          <Link href="/loan-form" className="hover:text-blue-500 transition">
            Faire une demande
          </Link>
          <Link href="/mes-prets" className="hover:text-blue-500 transition">
            Mes prêts
          </Link>
        </nav>

        {/* CTA Button (Desktop only) */}
        <Link
          href="/loan-form"
          className="hidden md:inline-block bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition"
        >
          Démarrer
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-zinc-600 hover:text-blue-500 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pb-4 space-y-4 text-sm text-zinc-700">
          <Link
            href="/"
            className="block py-2 border-b hover:text-blue-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Simuler un prêt
          </Link>
          <Link
            href="/loan-form"
            className="block py-2 border-b hover:text-blue-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Faire une demande
          </Link>
          <Link
            href="/mes-prets"
            className="block py-2 border-b hover:text-blue-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Mes prêts
          </Link>
          <Link
            href="/loan-form"
            className="block mt-4 bg-blue-500 text-white px-4 py-2 rounded-full text-center font-medium hover:bg-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Démarrer
          </Link>
        </div>
      )}
    </header>
  );
}
