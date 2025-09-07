import { useContext } from "react";
import { TrafficDataContext } from "../contexts/TrafficDataContext";
import { CausesAcidentChart } from "../components/CausesAcidentChart";
import { ClassificationAcidentChart } from "../components/ClassificationAcidentChart";
import { AcidentState } from "../components/AcidentState";
import { QuantityOfAcidents } from "../components/QuantityOfAcidents";
import { MomentDay } from "../components/MomentDay";
import { WeatherCondition } from "../components/WeatherCondition";
import { AcidentZone } from "../components/AcidentZone";
import { LatestDataNotification } from "../pages/overview/LatestDataNotification";

export function Overview() {
  const time = new Date();
  const { trafficData, isFetching, error } = useContext(TrafficDataContext);
  return (
    <div>
      <h1 className="text-2xl w-fit">Visão Geral</h1>
      <div className="mt-2">
        {error && <div>{error}</div>}
        {trafficData && (
          <div>
            <LatestDataNotification trafficData={trafficData} time={time} />
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
