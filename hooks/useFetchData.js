import api  from "@/services/apiService";
import { useEffect, useState } from "react";

const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);      // No generics: assume array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get(endpoint);
      setData(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
      setError(error?.response?.data?.error  || error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetchData;
