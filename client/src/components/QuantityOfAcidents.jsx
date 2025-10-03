import carBurst from "../assets/img/icons/car-burst.svg";
import { formatValue } from "../assets/js/HelpersFunctions.js";

export const QuantityOfAcidents = ({ data }) => {
  return (
    data && (
      <div className="px-6 py-3 bg-gray-200 rounded-2xl">
        <div>
          <img
            src={carBurst}
            alt="car burst icon"
            loading="lazy"
            className="w-10 h-10"
          />
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold">
            {formatValue(data.quant_acidents)} mil
          </span>
          <p className="text-sm text-gray-600">
            acidentes ocorreram em {data.year}
          </p>
        </div>
      </div>
    )
  );
};
