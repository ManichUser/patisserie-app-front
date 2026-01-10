'use client'
import { useState } from "react";
const categories = [
  { id: '1', name: 'All', icon: '🍰' },
  { id: '2', name: 'Cakes', icon: '🎂' },
  { id: '3', name: 'Cookies', icon: '🍪' },
  { id: '4', name: 'Cupcakes', icon: '🧁' },
  { id: '5', name: 'Pastries', icon: '🥐' },
];
  export function Categories() {
    const [selectedCategory, setSelectedCategory] = useState('1');
    return (
      <section className="px-4 mt-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Categories</h2>

          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`shrink-0 px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-amber-700 text-white shadow-lg shadow-amber-700/30'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>
    )
  }
