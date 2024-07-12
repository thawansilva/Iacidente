import { useEffect } from "react";
import axios from "axios";

export const useFetch = (filters) => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      setIsFetching(true);
      await axios
        .get(
          `http://localhost:5000/visaogeral?year=${
            filters.year?.value
          }&region=${filters.region?.value}${
            filters.region?.value != "todas"
              ? `&state=${filters.state?.value}`
              : ""
          }`,
        )
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => setError(err))
        .finally(() => {
          setIsFetching(false);
        });

      fetchAPI();
    };
  }, []);

  return { data, isFetching, error };
};
