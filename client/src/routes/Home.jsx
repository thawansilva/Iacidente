import { HomeDescription } from "../pages/home/HomeDescription";

export function Home() {
  return (
    <div className="mb-48">
      <h1 className="inline-block pb-2 text-2xl border-b-2 ">
        Sejam bem vindos ao dashboard IAcidentes
      </h1>
      <HomeDescription />
    </div>
  );
}
