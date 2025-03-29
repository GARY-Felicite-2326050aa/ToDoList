import React from "react";
import { PieChart as RePieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const PieChart = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return <p>Aucune donnée disponible pour le graphique.</p>;
  }

  // Comptage du nombre de tâches par catégorie
  const taskCategories = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});

  // Transformer les données en format recharts
  const data = Object.entries(taskCategories).map(([name, value], index) => ({
    name,
    value,
    color: COLORS[index % COLORS.length], // Attribution des couleurs dynamiques
  }));

  return (
    <div>
      <h3>Répartition des tâches par catégorie</h3>
      <RePieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RePieChart>
    </div>
  );
};

export default PieChart;