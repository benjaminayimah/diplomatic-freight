import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import useFetchData from "./useFetchData";


const CACHE_TIME = 5 * 60 * 1000;


export default function useCachedResource({
  resource,
  endpoint,
  sortFn,
}) {

  const data = useAuthStore(
    (state) => state[resource]
  );


  const timestamp = useAuthStore(
    (state) => state[`${resource}LastFetched`]
  );


  const setResource = useAuthStore(
    (state) => state.setResource
  );


  // prevents duplicate store updates
  const hasSynced = useRef(false);



  const stale =
    !timestamp ||
    Date.now() - timestamp > CACHE_TIME;



  const shouldFetch =
    !data?.length || stale;



  const {
    data: response,
    loading,
    error,
  } = useFetchData(
    shouldFetch ? endpoint : null
  );



  useEffect(() => {

    if (!response) return;


    // avoid running again with same response
    if (hasSynced.current) return;



    let items =
      response?.[resource] ||
      response?.data?.[resource] ||
      response ||
      [];



    if (!Array.isArray(items)) {
      items = [];
    }



    if (sortFn) {
      items = [...items].sort(sortFn);
    }



    hasSynced.current = true;


    setResource(
      resource,
      items
    );


  }, [
    response,
    resource,
    setResource
  ]);



  return {
    data: Array.isArray(data) ? data : [],
    loading: shouldFetch && loading,
    error,
  };

}