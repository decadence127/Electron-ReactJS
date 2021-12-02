import { useState, useCallback } from "react";
import axios from "axios";

export function useQueryHandler() {
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (url, body, headers = {}) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: url,
        data: body,
        headers: headers || {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      return response.data;
    } catch (e) {
      setLoading(false);
      setError(
        e.response ||
          `Something went wrong at: [${new Date().toLocaleDateString()}]`
      );
      throw e;
    }
  }, []);
  const clearError = () => setError([]);
  return { request, loading, error, clearError };
}
