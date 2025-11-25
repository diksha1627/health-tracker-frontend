import {  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import TimelineIcon from "@mui/icons-material/Timeline";


const DiabetesChart = ({ records }) => {
  const chartData = records.map(record => ({
    date: new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    level: parseFloat(record.bloodSugarLevel)
  })).reverse().slice(-7);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <TimelineIcon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Blood Sugar Trend</h3>
      </div>
      
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '11px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '11px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '12px'
              }} 
            />
            <Bar 
              dataKey="level" 
              fill="url(#colorBar)"
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1}/>
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <TimelineIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No data yet</p>
          </div>
        </div>
      )}
    </div>
  );
};


export default DiabetesChart