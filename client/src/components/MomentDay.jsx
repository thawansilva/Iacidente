import sun from "../assets/img/icons/sun.svg";
import { percentageValue } from "../assets/js/HelpersFunctions.js";

export const MomentDay = ({ data }) => {
  let percentage = percentageValue(data?.moment_day[1], data?.quant_acidents);

  return (
    data && (
      <div className="px-6 py-3 bg-gray-200 rounded-2xl">
        <div>
          <img src={sun} alt="sun icon" loading="lazy" className="w-10 h-10" />
        </div>
        <div className="mt-2 ">
          <span className="text-2xl font-bold">{percentage}%</span>
          <p className="text-sm text-gray-600">
            dos acidentes ocorreram em {data.moment_day[0].toLowerCase()}
          </p>
        </div>
      </div>
    )
  );
};
