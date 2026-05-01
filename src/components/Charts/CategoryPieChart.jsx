import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function CategoryPieChart({ data ,currency}) {
  const processData = () => {
    const categories = {};
    let total = 0;

    data.filter(t => t.type === "expense" || t.type === "lend").forEach((t) => {
      const cat = t.category || "Other";
      const amt = Number(t.amount || 0);
      categories[cat] = (categories[cat] || 0) + amt;
      total += amt;
    });

    return {
      chartData: Object.keys(categories).map((name) => ({
        name,
        value: categories[name],
      })),
      total,
    };
  };

  const { chartData, total } = processData();

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <div className="w-full h-[220px] overflow-visible">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              isAnimationActive={true}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
              ))}
            </Pie>
            
            {/* 3. FIXED TOOLTIP SETTINGS */}
            <Tooltip 
               // wrapperStyle ensures the tooltip stays on top of everything
               wrapperStyle={{ zIndex: 1000 }}
               // use 'portal' logic (allowEscapeViewBox) so it doesn't hide behind the card edge
               allowEscapeViewBox={{ x: true, y: true }}
               contentStyle={{ 
                 borderRadius: '8px', 
                 border: 'none', 
                 backgroundColor: '#1e293b', 
                 color: '#fff',
                 padding: '8px'
               }}
               itemStyle={{ color: '#fff', fontSize: '12px' }}
               // Format the value in the tooltip to look like money
               formatter={(value) => [`${currency}${value.toLocaleString()}`, 'Spent']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* CENTER TOTAL */}
      <div className="absolute top-[110px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <p className="text-2xl font-bold text-slate-900 dark:text-white">
          {currency}{total.toLocaleString()}
        </p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
          Total Spent
        </p>
      </div>

      {/* LEGEND SECTION */}
      <div className="w-full mt-4 space-y-2">
        {chartData.map((entry, index) => {
          const percentage = total > 0 ? ((entry.value / total) * 100).toFixed(0) : 0;
          return (
            <div key={entry.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-slate-600 dark:text-slate-400 font-medium">
                  {entry.name}
                </span>
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}