import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { searchTracks, clearResults } from '../../store/slices/searchSlice';
import { Music, Mic, Radio, TrendingUp } from 'lucide-react';

const SearchPage = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const { results, loading } = useSelector((state) => state.search);

  const browseCategories = [
    { id: 'pop', name: 'Pop', color: 'bg-pink-500', icon: Music },
    { id: 'rock', name: 'Rock', color: 'bg-red-500', icon: Music },
    { id: 'hip-hop', name: 'Hip-Hop', color: 'bg-purple-500', icon: Mic },
    { id: 'electronic', name: 'Electronic', color: 'bg-blue-500', icon: Radio },
    { id: 'jazz', name: 'Jazz', color: 'bg-yellow-500', icon: Music },
    { id: 'classical', name: 'Classical', color: 'bg-green-500', icon: Music },
    { id: 'country', name: 'Country', color: 'bg-orange-500', icon: Music },
    { id: 'r&b', name: 'R&B', color: 'bg-indigo-500', icon: Mic },
    { id: 'indie', name: 'Indie', color: 'bg-teal-500', icon: TrendingUp },
    { id: 'latin', name: 'Latin', color: 'bg-red-400', icon: Music },
  ];

  useEffect(() => {
    if (query.trim()) {
      const debounceTimer = setTimeout(() => {
        dispatch(searchTracks(query));
      }, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      dispatch(clearResults());
    }
  }, [query, dispatch]);

  return (
    <div className="p-6 space-y-6">
      <SearchBar value={query} onChange={setQuery} />
      
      {query.trim() ? (
        <SearchResults results={results} loading={loading} query={query} />
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {browseCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className={`${category.color} rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform relative overflow-hidden`}
                >
                  <h3 className="text-white font-bold text-lg mb-2">
                    {category.name}
                  </h3>
                  <IconComponent className="absolute bottom-4 right-4 w-16 h-16 text-white/20 transform rotate-12" />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
