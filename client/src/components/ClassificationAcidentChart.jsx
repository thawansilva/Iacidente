import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const ClassificationAcidentChart = ({ data }) => {
  const dataChart = {
    labels: data?.classification.map((row) => row[0]),
    datasets: [
      {
        data: data?.classification?.map((row) => row[1]),
        backgroundColor: "#1D4ED899",
        hoverBackgroundColor: "#1D4ED8",
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 1,
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Classificação dos Acidentes",
        position: "top",
        align: "start",
        color: "#000",
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div className="px-6 py-3 bg-gray-200 rounded-2xl">
      <Bar options={options} data={dataChart} />
    </div>
  );
};
