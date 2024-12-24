import { useState } from "react";
import { api } from "../api/api";

interface ApiCallParams {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE"; 
  body?: Record<string, unknown> | null;
}

const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<unknown | null>(null); 

  const callApi = async ({ url, method = "GET", body = null }: ApiCallParams): Promise<unknown | void> => {
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
    } catch (err: unknown) {
      if (err instanceof Error && err.message) {
        const errorMessage =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (err as any)?.response?.data?.message || err.message || "Error occurred";
        setError(errorMessage);
        console.error(errorMessage);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, callApi };
};

export default useApi;
