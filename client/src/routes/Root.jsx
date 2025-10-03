import { useEffect, useReducer, useState } from "react";
import { NavigationBar } from "../components/NavigationBar";
import { Outlet } from "react-router-dom";
import { FormInputContext } from "../contexts/FormInputContext";
import { TrafficDataContext } from "../contexts/TrafficDataContext";
import { getRegions, getStates, getYears } from "../assets/js/HelpersFunctions.js";
import { filterReducer } from "../reducers/FilterFormReducer";

export function Root() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const [trafficData, setTrafficData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  const yearsOptions = getYears();
  const regionsOptions = getRegions();
  const stateOptions = getStates();

  const [filters, dispatch] = useReducer(filterReducer, {
    year: yearsOptions.slice(-1)[0],
    region: regionsOptions[0],
    state: null,
  });
  const toggleNavbar = () => {
    setIsNavbarOpen((current) => !current);
  };

  const fetchAPI = async () => {
    setIsFetching(true);
    await fetch(
      `http://localhost:5000/visaogeral?year=${filters.year.value}&region=${
        filters.region.value
      }${
        filters.region?.value != "todas" ? `&state=${filters.state?.value}` : ""
      }`,
    )
      .then((res) => res.json())
      .then((data) => setTrafficData(data))
      .catch((err) => setError(err))
      .finally(() => {
        setIsFetching(false);
      });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchAPI();
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <FormInputContext.Provider
        value={{
          yearsOptions,
          regionsOptions,
          stateOptions,
          filters,
          dispatch,
          handleFilterSubmit,
        }}
      >
        <TrafficDataContext.Provider value={{ trafficData, isFetching, error }}>
          <NavigationBar toggleNavbar={toggleNavbar} />
          <main
            id="main"
            className={`${isNavbarOpen && "md:ml-[340px]"} px-5 pt-5 ml-12`}
          >
            <section className="container mx-auto">
              <Outlet />
            </section>
            <footer className="py-3 mt-2 text-center">
              Desenvolvido por:{" "}
              <a
                href="https://github.com/thawansilva"
                referrerPolicy="no-referrer"
                target="_blank"
                className="text-blue-700 hover:underline "
              >
                Thawan Silva
              </a>
            </footer>
          </main>
        </TrafficDataContext.Provider>
      </FormInputContext.Provider>
    </>
  );
}
