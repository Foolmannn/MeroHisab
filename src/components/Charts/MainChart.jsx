import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MainChart({ data, days }) {
  const processData = () => {
    const dailyMap = {};
    const now = new Date();
    
    // Create an array of the last X days to ensure even empty days show up
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      dailyMap[label] = { name: label, income: 0, spending: 0 };
    }

    data.forEach((t) => {
      const tDate = new Date(t.date);
      const label = tDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });

      if (dailyMap[label]) {
        const amt = Number(t.amount || 0);
        if (t.type === "income" || t.type === "borrow") {
          dailyMap[label].income += amt;
        } else {
          dailyMap[label].spending += amt;
        }
      }
    });

    return Object.values(dailyMap);
  };

  const chartData = processData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.1} />

        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: "#94a3b8", fontSize: 10 }}
          minTickGap={20}
          dy={10}
        />

        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: "#94a3b8", fontSize: 10 }}
        />

        <Tooltip
          contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px", color: "#fff" }}
        />

        {/* INCOME LINE (GREEN) */}
        <Area
          type="monotone"
          dataKey="income"
          stroke="#10b981"
          strokeWidth={3}
          fill="url(#colorIncome)"
          dot={{ r: 3, fill: "#fff", stroke: "#10b981", strokeWidth: 2 }}
        />

        {/* SPENDING LINE (RED) */}
        <Area
          type="monotone"
          dataKey="spending"
          stroke="#ef4444"
          strokeWidth={3}
          fill="url(#colorSpending)"
          dot={{ r: 3, fill: "#fff", stroke: "#ef4444", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}