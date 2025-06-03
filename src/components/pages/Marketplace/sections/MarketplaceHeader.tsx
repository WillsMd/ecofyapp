import React from 'react';
import type { MarketplaceTab } from '../../../../types/marketplace';

interface MarketplaceHeaderProps {
  activeTab: MarketplaceTab;
  onTabChange: (tab: MarketplaceTab) => void;
}

const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs: { id: MarketplaceTab; label: string }[] = [
    { id: 'market-price', label: 'Market Price' },
    { id: 'all-products', label: 'All Products' },
    { id: 'crops', label: 'Crops' },
    { id: 'livestock', label: 'Livestock' },
    { id: 'poultry', label: 'Poultry' },
    { id: 'fisheries', label: 'Fisheries' },
    { id: 'seeds', label: 'Seeds' },
    { id: 'fertilizers', label: 'Fertilizers' },
    { id: 'equipment', label: 'Equipment' }
  ];

  return (
    <div className="bg-white border-b">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Marketplace</h1>
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHeader;