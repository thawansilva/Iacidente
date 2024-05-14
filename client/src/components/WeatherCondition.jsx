import cloudSun from "../assets/img/icons/cloud-sun.svg";
import React from "react";
import { percentageValue } from "../assets/js/Helpers";

export const WeatherCondition = ({ data }) => {
  let percentage = percentageValue(
    data?.weatherCondition[1],
    data?.quant_acidents,
  );

  return (
    data && (
      <div className="px-6 py-3 bg-gray-200 rounded-2xl ">
        <div>
          <img
            src={cloudSun}
            alt="cloud-sun icon"
            loading="lazy"
            className="w-10 h-10"
          />
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold">{percentage}%</span>
          <p className="text-sm text-gray-600">
            dos acidentes ocorreram em condições de{" "}
            {data.weatherCondition[0].toLowerCase()}
          </p>
        </div>
      </div>
    )
  );
};
