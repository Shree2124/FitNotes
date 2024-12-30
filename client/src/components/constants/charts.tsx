import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineGraphProps {
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
}

interface BarGraphProps {
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
}

export const LineGraph: React.FC<LineGraphProps> = ({ data, options }) => {
  return <Line data={data} options={{ responsive: true, maintainAspectRatio: false, ...options }} />;
};

export const BarGraph: React.FC<BarGraphProps> = ({ data, options }) => {
  return <Bar data={data} options={{ responsive: true, maintainAspectRatio: false, ...options }} />;
};
