import { getMonthByNum } from "../../assets/js/Helpers";

export function LatestDataNotification({ time }) {
  return (
    <p className="p-3 mb-3 mr-5 bg-red-400 rounded-xl">
      A base de dados estão atualizados até
      <span className="font-bold"> {getMonthByNum(time.getMonth())} </span>
      de 2024
    </p>
  );
}
