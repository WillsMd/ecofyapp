import React from 'react';
import { MapPin } from 'lucide-react';
import { suitableAreas } from '../../../../data/mockData';

interface SuitableAreasProps {
  selectedCrop: string;
}

const SuitableAreas: React.FC<SuitableAreasProps> = ({ selectedCrop }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="text-emerald-500" size={20} />
        <h4 className="font-semibold">Suitable Areas: {selectedCrop}</h4>
      </div>

      <div className="mb-6 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Interactive Map View</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {suitableAreas.map((area, index) => (
          <div key={index} className="bg-white rounded-lg p-4 border">
            <h6 className="font-semibold text-emerald-600 mb-1">{area.name}</h6>
            <p className="text-xs text-gray-500 mb-2">{area.climate}</p>
            <p className="text-sm text-gray-600">{area.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuitableAreas;