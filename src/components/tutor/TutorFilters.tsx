import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { TutorFilters as FilterType } from '../../store/tutorStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface TutorFiltersProps {
  onFilter: (filters: FilterType) => void;
}

export const TutorFilters: React.FC<TutorFiltersProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<FilterType>({
    search: '',
    language: '',
    priceMin: undefined,
    priceMax: undefined,
    country: '',
    rating: undefined
  });
  
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFilters(prev => ({
      ...prev,
      [name]: name === 'priceMin' || name === 'priceMax' || name === 'rating'
        ? value ? Number(value) : undefined
        : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };
  
  const handleReset = () => {
    setFilters({
      search: '',
      language: '',
      priceMin: undefined,
      priceMax: undefined,
      country: '',
      rating: undefined
    });
    onFilter({});
  };
  
  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input
              name="search"
              placeholder="Search tutors by name or keywords..."
              value={filters.search || ''}
              onChange={handleInputChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center gap-2"
          >
            <Filter size={18} />
            Filters
          </Button>
          
          <Button type="submit">
            Search
          </Button>
        </div>
        
        {isFiltersOpen && (
          <div className="bg-white p-4 rounded-md shadow-md mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Filter Options</h3>
              <button
                type="button"
                onClick={() => setIsFiltersOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  name="language"
                  value={filters.language}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Any Language</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Russian">Russian</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  name="country"
                  value={filters.country}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Any Country</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Spain">Spain</option>
                  <option value="Japan">Japan</option>
                  <option value="Russia">Russia</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Rating
                </label>
                <select
                  name="rating"
                  value={filters.rating || ''}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+</option>
                  <option value="4">4.0+</option>
                  <option value="3.5">3.5+</option>
                  <option value="3">3.0+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range (Min)
                </label>
                <input
                  type="number"
                  name="priceMin"
                  placeholder="Min Price"
                  value={filters.priceMin || ''}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range (Max)
                </label>
                <input
                  type="number"
                  name="priceMax"
                  placeholder="Max Price"
                  value={filters.priceMax || ''}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="mr-2"
              >
                Reset
              </Button>
              <Button type="submit">
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};