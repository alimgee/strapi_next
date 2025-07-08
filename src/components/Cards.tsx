'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/types/strapi';

const Cards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:1337/api/cards');
        
        if (!response.ok) {
          throw new Error('Failed to fetch cards');
        }
        
        const data = await response.json();
        setCards(data.data || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch cards');
        console.error('Error fetching cards:', err);
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
        <p>Error loading cards: {error}</p>
        <p className="text-sm mt-2">Make sure Strapi is running at localhost:1337</p>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center text-gray-500 bg-gray-50 p-8 rounded-lg">
        <p>No cards found.</p>
        <p className="text-sm mt-2">
          Create cards in Strapi admin at{' '}
          <a href="http://localhost:1337/admin" className="text-blue-600 hover:underline">
            localhost:1337/admin
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow ${
            card.bgColor || 'bg-gradient-to-br from-blue-500 to-blue-600'
          } ${card.textColor || 'text-white'}`}
        >
          <h3 className="text-xl font-bold mb-3">{card.title}</h3>
          <p className="mb-4 opacity-90">
            {typeof card.content === 'string' 
              ? card.content 
              : 'Dynamic content from Strapi'}
          </p>
          {card.buttonText && card.buttonLink && (
            <a
              href={card.buttonLink}
              className="inline-block bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded transition-colors"
            >
              {card.buttonText}
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default Cards;