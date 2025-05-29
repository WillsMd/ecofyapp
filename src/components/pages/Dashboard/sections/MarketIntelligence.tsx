import React from 'react';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { marketData } from '../../../../data/mockData';

interface MarketIntelligenceProps {
  selectedCrop: string;
}

const MarketIntelligence: React.FC<MarketIntelligenceProps> = ({ selectedCrop }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-emerald-500" size={20} />
        <h4 className="font-semibold">Market Intelligence: {selectedCrop}</h4>
      </div>
      
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={marketData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="text-center text-emerald-600 font-medium mb-4">
        → Price (TZS/kg)
      </div>

      <div className="bg-white rounded-lg p-4">
        <h5 className="font-semibold text-emerald-600 mb-2">AI Recommendation</h5>
        <p className="text-gray-700">
          Current market trends suggest optimal selling period will be in August. Consider storing your harvest until then for maximum profit.
        </p>
      </div>
    </div>
  );
};

export default MarketIntelligence;