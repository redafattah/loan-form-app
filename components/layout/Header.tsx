'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-500">
          💰 CrediForm
        </Link>

        {/* Nav Links */}
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

        {/* CTA Button */}
        <Link
          href="/loan-form"
          className="hidden md:inline-block bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition"
        >
          Démarrer
        </Link>
      </div>
    </header>
  );
}
