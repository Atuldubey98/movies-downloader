import { useEffect, useState } from "react";
import { ITorrentResult } from "../interfaces";
import useQuery from "./useQuery";
import { torrentInstance } from "../instance";

export default function useTorrents() {
  const [loading, setLoading] = useState<boolean>(false);
  const [torrentResult, setTorrentResults] = useState<ITorrentResult>({
    data: [],
    total: 0,
    time: 0,
  });
  const query = useQuery();
  const search: string = query.get("search") || "";
  const controller = new AbortController();
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await torrentInstance.get("/api/v1/all/search", {
          params: {
            query: search,
          },
          signal: controller.signal,
        });
        setTorrentResults(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  function onCancelRequest() {
    controller.abort();
    setLoading(false);
  }
  return {
    loading,
    torrentResult,
    search,
    controller,
    onCancelRequest,
  };
}
