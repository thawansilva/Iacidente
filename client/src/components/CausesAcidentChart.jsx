import React from "react";
import { Chart as ChartJS, Tooltip, ArcElement, plugins } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getGradientBlueHex, percentageValue } from "../assets/js/Helpers";

ChartJS.register(ArcElement, Tooltip, plugins);

export const CausesAcidentChart = ({ data }) => {
  const thresholdPercent = 5;
  const slices =
    data &&
    data.causes
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
  const colors = getGradientBlueHex(slices.length);
  const dataChart = data && {
    labels: slices?.map((row) => row.label),
    datasets: [
      {
        label: "Quantidade de acidentes",
        data: slices.map((row) => row.value),
        borderWidth: 1,
        backgroundColor: colors,
        hoverOffset: 10,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Causas de Acidentes",
        position: "top",
        align: "start",
        color: "#000",
        font: {
          size: 18,
        },
      },
      tooltip: { backgroundColor: "#000" },
    },
    cutout: "50%",
    borderRadius: 10,
  };
  return (
    <div className="relative z-0 px-6 py-3 bg-gray-200 rounded-2xl">
      {data && (
        <>
          <p className="absolute font-bold text-center top-[44%] left-[26%] text-2xl w-4/5 max-w-[170px] -z-[1]">
            {percentageValue(data.causes[0][1], data.quant_acidents)}% <br />{" "}
            <span className="inline-block w-3/5 text-xs font-normal text-gray-600">
              {data.causes[0][0]}
            </span>
          </p>
          <Doughnut data={dataChart} options={options} />
        </>
      )}
    </div>
  );
};
