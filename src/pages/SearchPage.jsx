import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, X, Star, SlidersHorizontal } from 'lucide-react';
import Header from '../components/Header';
import BodyguardCard from '../components/BodyguardCard';
import { mockBodyguards, filterBodyguards } from '../data/mockBodyguards';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    availability: 'all',
    minRating: 0,
    maxPrice: 10000,
    isTeam: undefined,
  });
  const [results, setResults] = useState(mockBodyguards);

  useEffect(() => {
    // Check URL params for initial filters
    const type = searchParams.get('type');
    const availability = searchParams.get('availability');
    
    if (type === 'event') {
      setFilters(prev => ({ ...prev, isTeam: true }));
    } else if (type === 'personal') {
      setFilters(prev => ({ ...prev, isTeam: false }));
    }
    
    if (availability) {
      setFilters(prev => ({ ...prev, availability }));
    }
  }, [searchParams]);

  useEffect(() => {
    const filtered = filterBodyguards({
      search: searchQuery,
      ...filters,
    });
    setResults(filtered);
  }, [searchQuery, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      availability: 'all',
      minRating: 0,
      maxPrice: 10000,
      isTeam: undefined,
    });
    setSearchQuery('');
  };

  const hasActiveFilters = filters.availability !== 'all' || 
    filters.minRating > 0 || 
    filters.maxPrice < 10000 || 
    filters.isTeam !== undefined ||
    searchQuery !== '';

  return (
    <div className="pb-4">
      <Header 
        title="Search Bodyguards" 
        showBack 
        onBack={() => navigate('/')} 
      />
      
      {/* Search Bar */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, skill, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium"
          >
            <SlidersHorizontal size={18} />
            Filters
            {hasActiveFilters && (
              <span className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                {[filters.availability !== 'all', filters.minRating > 0, filters.maxPrice < 10000, filters.isTeam !== undefined, searchQuery !== ''].filter(Boolean).length}
              </span>
            )}
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-primary-600 font-medium text-sm"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 px-4 py-4 space-y-4">
          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <div className="flex gap-2">
              {['all', 'available', 'available_soon'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleFilterChange('availability', status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    filters.availability === status
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {status === 'all' ? 'All' : status === 'available' ? 'Available Now' : 'Available Soon'}
                </button>
              ))}
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <div className="flex gap-2">
              {[undefined, false, true].map((type) => (
                <button
                  key={type === undefined ? 'all' : type ? 'team' : 'individual'}
                  onClick={() => handleFilterChange('isTeam', type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    filters.isTeam === type
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {type === undefined ? 'All' : type ? 'Teams' : 'Individuals'}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Rating: {filters.minRating > 0 ? filters.minRating.toFixed(1) : 'Any'}
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={filters.minRating}
              onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Any</span>
              <span>5.0</span>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price: ₹{filters.maxPrice.toLocaleString('en-IN')}/hr
            </label>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹1,000</span>
              <span>₹10,000</span>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {results.length} {results.length === 1 ? 'Result' : 'Results'}
          </h3>
        </div>
        
        {results.length === 0 ? (
          <div className="text-center py-12">
            <Search className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 font-medium">No bodyguards found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div>
            {results.map(bodyguard => (
              <BodyguardCard key={bodyguard.id} bodyguard={bodyguard} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

