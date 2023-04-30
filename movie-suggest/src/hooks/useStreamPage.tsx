import { useEffect, useState } from "react";
import { fetchFiles, torrentInstance } from "../instance";
import { IStreamResponse } from "../interfaces";
import useQuery from "./useQuery";
import { isAxiosError } from "axios";

export default function useStreamPage() {
  const query = useQuery();
  const magnetUrl = query.get("magnetUrl") || "";
  const videoPath = query.get("videoPath") || "";
  const [streamResponse, setStreamResponse] = useState<IStreamResponse>({
    files: [],
    totalLength: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setError("");
      setLoading(true);
      try {
        const { data } = await torrentInstance.get(fetchFiles, {
          params: {
            magnetUrl,
          },
        });
        setStreamResponse(data);
      } catch (error) {
        setError(
          isAxiosError(error) ? error.response?.data.message : "Error occured"
        );
      } finally {
        setLoading(false);
      }
    })();
    return () => {};
  }, []);
  return {
    magnetUrl,
    error,
    videoPath,
    loading,
    streamResponse,
  };
}
