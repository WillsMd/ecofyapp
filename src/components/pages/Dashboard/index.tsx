import React, { useState } from 'react';
import { 
  TrendingUp,
  BarChart3,
  AlertTriangle,
  MapPin,
  Cloud
} from 'lucide-react';

// Import section components
import MarketIntelligence from './sections/MarketIntelligence';
import SoilInsights from './sections/SoilInsights';
import Risks from './sections/Risks';
import SuitableAreas from './sections/SuitableAreas';
import ClimateType from './sections/ClimateType';

interface DashboardProps {
  selectedCrop: string;
  setSelectedCrop: (crop: string) => void;
}

type ActiveSection = 'market' | 'soil' | 'risks' | 'areas' | 'climate';

const Dashboard: React.FC<DashboardProps> = ({ selectedCrop, setSelectedCrop }) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('market');

  const navigationButtons = [
    { key: 'market' as ActiveSection, icon: TrendingUp, label: 'Market Intelligence' },
    { key: 'soil' as ActiveSection, icon: BarChart3, label: 'Soil Insights' },
    { key: 'risks' as ActiveSection, icon: AlertTriangle, label: 'Risks' },
    { key: 'areas' as ActiveSection, icon: MapPin, label: 'Suitable Areas' },
    { key: 'climate' as ActiveSection, icon: Cloud, label: 'Climate Type' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'market':
        return <MarketIntelligence selectedCrop={selectedCrop} />;
      case 'soil':
        return <SoilInsights selectedCrop={selectedCrop} />;
      case 'risks':
        return <Risks selectedCrop={selectedCrop} />;
      case 'areas':
        return <SuitableAreas selectedCrop={selectedCrop} />;
      case 'climate':
        return <ClimateType selectedCrop={selectedCrop} />;
      default:
        return <MarketIntelligence selectedCrop={selectedCrop} />;
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <select 
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option>Maize</option>
          <option>Rice</option>
          <option>Wheat</option>
        </select>
      </div>

      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-emerald-600">{selectedCrop}</h3>
            <p className="text-gray-600">A staple crop in Tanzania, grown in various regions with good yield potential.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Optimal Planting Time</div>
            <div className="font-semibold">March - April</div>
          </div>
        </div>

        <div className="flex gap-4 mb-6 flex-wrap">
          {navigationButtons.map(({ key, icon: Icon, label }) => (
            <button 
              key={key}
              onClick={() => setActiveSection(key)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                activeSection === key 
                  ? 'bg-emerald-500 text-white' 
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {renderActiveSection()}
      </div>
    </div>
  );
};

export default Dashboard;