import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url,
      method = "GET",
      formdata = false,
      body = null,
      headers = {}
    ) => {
      setLoading(true);
      try {
        if (!formdata && body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong, try again");
        }
        setLoading(false);

        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        return error;
      }
    },
    []
  );
  const clearError = () => setError(null);
  // const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
};
