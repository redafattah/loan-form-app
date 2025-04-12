'use client';

import Link from 'next/link';
import { HandCoins, FileSignature, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-gray-50 text-zinc-800">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-24 h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-4">
          Simplifiez vos demandes de crédit
        </h1>
        <p className="text-zinc-600 text-lg max-w-2xl mx-auto mb-8">
          Simulez, préparez et soumettez votre demande de prêt en quelques clics avec CrediForm.
        </p>

        <div className="flex justify-center flex-wrap gap-4">
          <Link
            href="/loan-form"
            className="px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition"
          >
            Faire une demande
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition"
          >
            Simuler un prêt
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 h-screen flex flex-col justify-center py-16">
        <h2 className="text-2xl font-bold text-center mb-12">Comment ça marche ?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 border rounded-lg shadow-sm text-center">
            <HandCoins className="w-10 h-10 mx-auto text-blue-500 mb-4" />
            <h3 className="font-semibold mb-2">1. Simulez votre prêt</h3>
            <p className="text-sm text-zinc-600">
              Indiquez le montant et la durée pour estimer vos mensualités.
            </p>
          </div>
          <div className="bg-white p-6 border rounded-lg shadow-sm text-center">
            <FileSignature className="w-10 h-10 mx-auto text-blue-500 mb-4" />
            <h3 className="font-semibold mb-2">2. Remplissez le formulaire</h3>
            <p className="text-sm text-zinc-600">
              Ajoutez vos informations personnelles et chargez vos justificatifs.
            </p>
          </div>
          <div className="bg-white p-6 border rounded-lg shadow-sm text-center">
            <ShieldCheck className="w-10 h-10 mx-auto text-blue-500 mb-4" />
            <h3 className="font-semibold mb-2">3. Recevez une réponse</h3>
            <p className="text-sm text-zinc-600">
              Suivez l’état de votre dossier dans votre espace client.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
