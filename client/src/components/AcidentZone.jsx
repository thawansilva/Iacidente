import React from "react";
import tractor from "../assets/img/icons/tractor.svg";
import city from "../assets/img/icons/city.svg";
import { percentageValue } from "../assets/js/Helpers";

export const AcidentZone = ({ data }) => {
  let percentage = percentageValue(data?.acidentZone[1], data?.quant_acidents);

  return (
    data && (
      <div className="px-6 py-3 bg-gray-200 rounded-2xl">
        <div>
          <img
            src={data.acidentZone[0] == "Rural" ? tractor : city}
            alt={
              data.acidentZone[0] == "Rural"
                ? "rural tractor icon"
                : "city icon"
            }
            loading="lazy"
            className="w-10 h-10"
          />
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold">{percentage}%</span>
          <p className="text-sm text-gray-600">
            dos acidentes ocorreram em setor {data.acidentZone[0].toLowerCase()}
          </p>
        </div>
      </div>
    )
  );
};
