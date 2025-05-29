import React from 'react';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { soilData } from '../../../../data/mockData';

interface SoilInsightsProps {
  selectedCrop: string;
}

const SoilInsights: React.FC<SoilInsightsProps> = ({ selectedCrop }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="text-emerald-500" size={20} />
        <h4 className="font-semibold">Soil Insights: {selectedCrop}</h4>
      </div>
      
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={soilData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="parameter" />
            <YAxis />
            <Bar dataKey="value" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-emerald-600 font-medium mb-4">
        Optimal Range
      </div>

      <div className="bg-white rounded-lg p-4">
        <h5 className="font-semibold text-emerald-600 mb-2">Soil Requirements</h5>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Soil Type:</span>
            <p className="text-gray-600">Well-drained loamy soils</p>
          </div>
          <div>
            <span className="font-medium">NPK Requirements:</span>
            <p className="text-gray-600">High nitrogen demand</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilInsights;