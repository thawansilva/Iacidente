import { useContext } from "react";
import { TrafficDataContext } from "../contexts/TrafficDataContext";
import { CausesAcidentChart } from "../components/CausesAcidentChart";
import { ClassificationAcidentChart } from "../components/ClassificationAcidentChart";
import { AcidentState } from "../components/AcidentState";
import { QuantityOfAcidents } from "../components/QuantityOfAcidents";
import { MomentDay } from "../components/MomentDay";
import { WeatherCondition } from "../components/WeatherCondition";
import { AcidentZone } from "../components/AcidentZone";
import { getMonthByNum } from "../assets/js/Helpers";

export function Overview() {
  const time = new Date();
  const { trafficData, isFetching, error } = useContext(TrafficDataContext);
  return (
    <div>
      <h1 className="pb-2 text-3xl border-b-2 md:text-4xl">Visão Geral</h1>
      <div className="mt-2">
        {error && <div>{error}</div>}
        {trafficData && (
          <div>
            {trafficData.year <= 2016 && (
              <p className="p-3 mb-3 bg-red-400 rounded-xl">
                Dados anteriores a 2016 não possuem dados de latitude e
                longitude para o mapa de risco
              </p>
            )}
            {trafficData.year == time.getFullYear() && (
              <p className="p-3 mb-3 bg-red-400 rounded-xl">
                Os dados de {trafficData.year} estão atualizados até o mês de{" "}
                <span className="font-bold">
                  {getMonthByNum(time.getMonth())}
                </span>
              </p>
            )}
            <div
              className={`flex flex-wrap items-center justify-around gap-4 md:justify-start md:items-start ${
                isFetching && "animate-pulse"
              }`}
            >
              <CausesAcidentChart data={trafficData} />
              <div className="grid w-4/5 grid-cols-2 gap-4 md:w-3/6 grid-row-2 max-w-[460px]">
                <QuantityOfAcidents data={trafficData} />
                <MomentDay data={trafficData} />
                <WeatherCondition data={trafficData} />
                <AcidentZone data={trafficData} />
              </div>
              <AcidentState data={trafficData} />
              <ClassificationAcidentChart data={trafficData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
