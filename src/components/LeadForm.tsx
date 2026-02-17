'use client';
import { useState } from 'react';

export default function LeadForm() {
  const [sent, setSent] = useState(false);
  return sent ? (
    <div className="text-center py-4">
      <div className="text-4xl mb-4">✅</div>
      <h3 className="text-xl font-bold mb-2 text-white">Demande envoyée !</h3>
      <p className="text-gray-400">Vous recevrez votre estimation par email sous 24h.</p>
    </div>
  ) : (
    <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Prénom</label>
          <input required type="text" name="prenom" placeholder="Jean" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
          <input required type="email" name="email" placeholder="jean@email.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Adresse du logement</label>
        <input required type="text" name="adresse" placeholder="12 rue de Rivoli, 75001 Paris" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Surface (m²)</label>
        <input required type="number" name="surface" min="5" max="500" placeholder="45" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors" />
      </div>
      <button type="submit" className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-accent-500/25">
        Recevoir mon estimation gratuite
      </button>
      <p className="text-xs text-gray-600 text-center">Vos données ne seront jamais partagées.</p>
    </form>
  );
}
