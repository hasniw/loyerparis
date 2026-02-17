'use client';
import { useState } from 'react';

export default function LeadForm() {
  const [sent, setSent] = useState(false);
  return sent ? (
    <div className="bg-white rounded-xl p-8 shadow text-center">
      <div className="text-4xl mb-4">✅</div>
      <h3 className="text-xl font-bold mb-2">Demande envoyée !</h3>
      <p className="text-gray-600">Vous recevrez votre estimation par email sous 24h.</p>
    </div>
  ) : (
    <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="bg-white rounded-xl p-8 shadow space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
          <input required type="text" name="prenom" placeholder="Jean" className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input required type="email" name="email" placeholder="jean@email.com" className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse du logement</label>
        <input required type="text" name="adresse" placeholder="12 rue de Rivoli, 75001 Paris" className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Surface (m²)</label>
        <input required type="number" name="surface" min="5" max="500" placeholder="45" className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400" />
      </div>
      <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors">Recevoir mon estimation gratuite</button>
      <p className="text-xs text-gray-400 text-center">Vos données ne seront jamais partagées.</p>
    </form>
  );
}
