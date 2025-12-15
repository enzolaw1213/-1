import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface OddsChartProps {
  data: {
    time: string;
    home: number;
    draw: number;
    away: number;
  }[];
}

const OddsChart: React.FC<OddsChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="h-72 w-full mt-4 bg-white p-4 rounded-lg">
       <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">Market Movement Tracker (1x2 Odds)</h4>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" tick={{fontSize: 12}} stroke="#9ca3af" />
          <YAxis domain={['auto', 'auto']} tick={{fontSize: 12}} stroke="#9ca3af" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ fontSize: '12px', fontWeight: 600 }}
          />
          <Legend wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
          <Line type="monotone" dataKey="home" name="Home Win" stroke="#00355f" strokeWidth={3} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="draw" name="Draw" stroke="#f3d027" strokeWidth={3} />
          <Line type="monotone" dataKey="away" name="Away Win" stroke="#ef4444" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OddsChart;
