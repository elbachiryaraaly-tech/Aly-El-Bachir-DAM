import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  dataPoint: number;
}

export const LiveChart: React.FC<Props> = ({ dataPoint }) => {
  const [data, setData] = React.useState<{ time: number; value: number }[]>([]);

  React.useEffect(() => {
    setData(prev => {
      const newData = [...prev, { time: Date.now(), value: dataPoint }];
      if (newData.length > 50) newData.shift();
      return newData;
    });
  }, [dataPoint]);

  return (
    <div className="w-full h-48 glass-panel p-4">
      <h3 className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Historial RPM en Vivo</h3>
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" hide />
            <YAxis domain={[0, 8000]} hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#12121a', border: '1px solid #333' }}
              itemStyle={{ color: '#00f3ff' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#00f3ff" 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
