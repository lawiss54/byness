import React from 'react';

export function OrdersHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des commandes</h1>
        <p className="text-gray-600 mt-2">Suivi et gestion de toutes les commandes clients</p>
      </div>
    </div>
  );
}
