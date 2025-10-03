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
import { percentageValue } from "../assets/js/HelpersFunctions.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const AcidentState = ({ data }) => {
  const prop = data?.states ? "states" : "cities";
  const thresholdPercent = 5;
  const slices =
    data &&
    data[prop]
      .map((row) => ({ label: row[0], value: row[1] }))
      .reduce((accumulator, currObj) => {
        const percent = percentageValue(currObj.value, data.quant_acidents);
        if (percent < thresholdPercent) {
          const others = accumulator.find((o) => o.label == "Outros");
          if (!others) {
            return accumulator.concat({
              label: "Outros",
              value: currObj.value,
            });
          }
          others.value += currObj.value;
        } else {
          accumulator.push(currObj);
        }
        return accumulator;
      }, []);

  const dataChart = data && {
    labels: slices.map((row) => row.label),
    datasets: [
      {
        data: slices.map((row) => row.value),
        backgroundColor: "#1D4ED899",
        hoverBackgroundColor: "#1D4ED8",
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Acidentes por ${prop == "states" ? "Estado" : "Municipio"}`,
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
      <Bar data={dataChart} options={options} />
    </div>
  );
};
