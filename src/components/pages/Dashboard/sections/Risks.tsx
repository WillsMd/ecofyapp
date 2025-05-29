import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { riskData } from '../../../../data/mockData';

interface RisksProps {
  selectedCrop: string;
}

const Risks: React.FC<RisksProps> = ({ selectedCrop }) => {
  return (
    <div className="bg-white rounded-lg border-2 border-emerald-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="text-emerald-500" size={20} />
        <h4 className="font-semibold">Risks: {selectedCrop}</h4>
      </div>

      {riskData.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-6">
          <h5 className="font-semibold text-gray-800 mb-3">{category.category}</h5>
          <div className="space-y-3">
            {category.risks.map((risk, riskIndex) => (
              <div key={riskIndex} className={`${risk.color} border rounded-lg p-4`}>
                <div className="flex justify-between items-start mb-2">
                  <h6 className="font-medium text-gray-800">{risk.name}</h6>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    risk.level === 'High Risk' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {risk.level}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{risk.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Risks;