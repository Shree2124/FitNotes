import { useState } from "react";
import { api } from "../api/api";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callApi = async ({ url, method = "GET", body = null }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api({
        url,
        method,
        data: body,
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Error occurred";
      setError(errorMessage);
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, callApi };
};

export default useApi;
