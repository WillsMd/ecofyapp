import React from 'react';
import { X } from 'lucide-react';
import type { Farm, ViewTab } from '../../../../types/farm';

interface ViewModalProps {
  isOpen: boolean;
  farm: Farm | null;
  activeTab: ViewTab;
  onClose: () => void;
  onTabChange: (tab: ViewTab) => void;
}

const ViewModal: React.FC<ViewModalProps> = ({ 
  isOpen, 
  farm, 
  activeTab, 
  onClose, 
  onTabChange 
}) => {
  if (!isOpen || !farm) return null;

  const tabs: ViewTab[] = ['Farm Maps', 'Soil Reports', 'Resources', 'Recommendations'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Farm Maps':
        return (
          <div>
            <div className="bg-gray-100 h-64 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-6">
              <p className="text-gray-500">Farm map visualization</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Latitude</p>
                <p className="font-semibold">{farm.latitude}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Longitude</p>
                <p className="font-semibold">{farm.longitude}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Topography</p>
                <p className="font-semibold">{farm.topography}</p>
              </div>
            </div>
          </div>
        );

      case 'Soil Reports':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Soil Moisture</h4>
                <p className="text-2xl font-bold text-blue-600">{farm.soilMoisture}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Organic Carbon</h4>
                <p className="text-2xl font-bold text-green-600">{farm.organicCarbon}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Soil Texture</h4>
                <p className="text-lg font-semibold">{farm.soilTexture}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Soil pH</h4>
                <p className="text-lg font-semibold">{farm.soilPH}</p>
              </div>
            </div>
          </div>
        );

      case 'Resources':
        return (
          <div>
            <h4 className="font-semibold mb-4">Available Resources</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Irrigation System</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Weather Station</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Storage Facility</span>
              </div>
            </div>
          </div>
        );

      case 'Recommendations':
        return (
          <div>
            <h4 className="font-semibold mb-4">Agricultural Recommendations</h4>
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-green-500 bg-green-50">
                <h5 className="font-semibold text-green-800">Optimal Crops</h5>
                <p className="text-green-700">
                  Based on soil conditions, {farm.crops.join(', ')} are recommended for this season.
                </p>
              </div>
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                <h5 className="font-semibold text-blue-800">Irrigation</h5>
                <p className="text-blue-700">
                  Current soil moisture is optimal. Monitor weekly and adjust irrigation accordingly.
                </p>
              </div>
              <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                <h5 className="font-semibold text-yellow-800">Fertilization</h5>
                <p className="text-yellow-700">
                  Consider adding organic matter to improve soil structure and nutrient retention.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold">{farm.name}</h2>
            <p className="text-gray-600">{farm.location} • {farm.size}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex border-b">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-6 py-3 font-medium ${
                activeTab === tab 
                  ? 'text-emerald-600 border-b-2 border-emerald-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-96">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ViewModal;