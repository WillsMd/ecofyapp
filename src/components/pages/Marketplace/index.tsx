import React, { useState, useMemo } from 'react';
import MarketplaceHeader from './sections/MarketplaceHeader';
import MarketplaceFilters from './sections/MarketplaceFilters';
import ProductGrid from './sections/ProductGrid';
import MarketPriceView from './sections/MarketPriceView';
import type { MarketplaceTab, MarketFilters, FilterOptions, MarketItem as BaseMarketItem } from '../../../types/marketplace';

type MarketItem = BaseMarketItem & { quantity?: number };

// Mock data - replace with your actual data source
const mockMarketData: MarketItem[] = [
  {
    id: '1',
    name: 'Maize',
    price: 1200,
    unit: 'TZS/kg',
    description: 'High-quality maize grains suitable for human consumption or animal feed.',
    location: 'Morogoro',
    category: 'crops',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    name: 'Rice',
    price: 2500,
    unit: 'TZS/kg',
    description: 'Premium rice grown in the fertile lands of Mbeya region.',
    location: 'Mbeya',
    category: 'crops',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'Dairy Cattle',
    price: 750000,
    unit: 'TZS/head',
    description: 'Healthy dairy cattle with good milk production records.',
    location: 'Arusha',
    category: 'livestock',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    name: 'Layer Chickens',
    price: 15000,
    unit: 'TZS/bird',
    description: 'Productive layer chickens at peak egg production age.',
    location: 'Dar es Salaam',
    category: 'poultry',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    name: 'Tilapia Fish',
    price: 8000,
    unit: 'TZS/kg',
    description: 'Fresh tilapia fish from sustainable aquaculture farms.',
    location: 'Mwanza',
    category: 'fisheries',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'
  },
  {
    id: '6',
    name: 'Maize Seeds',
    price: 12000,
    unit: 'TZS/kg',
    description: 'High-yield maize seeds suitable for various climatic conditions.',
    location: 'Dodoma',
    category: 'seeds',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop'
  },
  {
    id: '7',
    name: 'NPK Fertilizer',
    price: 85000,
    unit: 'TZS/50kg',
    description: 'Balanced NPK fertilizer for optimal crop growth and yield.',
    location: 'Arusha',
    category: 'fertilizers',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop'
  },
  {
    id: '8',
    name: 'Tractor',
    price: 45000000,
    unit: 'TZS/unit',
    description: 'Modern farming tractor suitable for medium-scale farming operations.',
    location: 'Mbeya',
    category: 'equipment',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop'
  }
];

const mockFilterOptions: FilterOptions = {
  location: ['All Locations', 'Arusha', 'Dar es Salaam', 'Dodoma', 'Mbeya', 'Mwanza', 'Morogoro'],
  product: ['All Products', 'Maize', 'Rice', 'Wheat', 'Beans', 'Dairy Cattle', 'Beef Cattle', 'Layer Chickens', 'Broiler Chickens', 'Tilapia Fish', 'Maize Seeds', 'Rice Seeds', 'NPK Fertilizer', 'Tractor', 'Plough'],
  unit: ['All Units', 'TZS/kg', 'TZS/head', 'TZS/bird', 'TZS/50kg', 'TZS/unit'],
  timePeriod: ['1 Month', '3 Months', '6 Months', '1 Year'],
  category: ['All Categories', 'Crops', 'Livestock', 'Poultry', 'Fisheries', 'Seeds', 'Fertilizers', 'Equipment']
};

const Marketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MarketplaceTab>('market-price');
  const [filters, setFilters] = useState<MarketFilters>({
    location: 'Arusha',
    product: 'Maize',
    unit: 'Kilogram (kg)',
    timePeriod: '3 Months',
    search: '',
    category: 'All Categories'
  });

  const [cart, setCart] = useState<MarketItem[]>([]);

  const handleAddToCart = (item: MarketItem) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const filteredItems = useMemo(() => {
    return mockMarketData.filter(item => {
      // Filter by tab
      if (activeTab !== 'market-price' && activeTab !== 'all-products') {
        if (item.category !== activeTab) return false;
      }

      // Filter by location
      if (filters.location && filters.location !== 'All Locations') {
        if (item.location !== filters.location) return false;
      }

      // Filter by product
      if (filters.product && filters.product !== 'All Products') {
        if (!item.name.toLowerCase().includes(filters.product.toLowerCase())) return false;
      }

      // Filter by category
      if (filters.category && filters.category !== 'All Categories') {
        if (item.category !== filters.category.toLowerCase()) return false;
      }

      // Filter by search
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (!item.name.toLowerCase().includes(searchTerm) &&
            !item.description.toLowerCase().includes(searchTerm) &&
            !item.location.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [activeTab, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketplaceHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <MarketplaceFilters
        activeTab={activeTab}
        filters={filters}
        filterOptions={mockFilterOptions}
        onFiltersChange={setFilters}
      />

      <div className="bg-gray-50">
        {activeTab === 'market-price' ? (
          <MarketPriceView filters={filters} />
        ) : (
          <ProductGrid
            items={mockMarketData}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>

      {/* Cart indicator (optional) */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white rounded-full p-3 shadow-lg">
          <span className="text-sm font-medium">
            Cart ({cart.reduce((sum, item) => sum + (item.quantity || 1), 0)})
          </span>
        </div>
      )}
    </div>
  );
};

export default Marketplace;