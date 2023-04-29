import { useEffect, useState } from "react";
import { ITorrentResult } from "../interfaces";
import useQuery from "./useQuery";
import { torrentInstance } from "../instance";

export default function useTorrents() {
  const [loading, setLoading] = useState<boolean>(false);
  const defaultTorrentResults = {
    data: [],
    total: 0,
    time: 0,
    page: 0,
  };
  const [torrentResult, setTorrentResults] = useState<ITorrentResult>(
    defaultTorrentResults
  );
  const [page, setPage] = useState<number>(1);
  function incrementPage() {
    console.log(torrentResult.totalPages && torrentResult.totalPages > page);

    if (torrentResult.totalPages && torrentResult.totalPages > page) {
      setPage((p) => p + 1);
    }
  }
  const [siteIndex, setSiteIndex] = useState<number>(0);
  const torrentSites = [
    {
      label: "Relevant",
      url: "/api/v1/all/search",
    },
    {
      label: "1337x",
      url: "/api/v1/all/search/x1337",
    },
    {
      label: "YTS",
      url: "/api/v1/all/search/yts",
    },
    {
      label: "PiratesBay10",
      url: "/api/v1/all/search/pirateBay",
    },
  ];
  const query = useQuery();
  const search: string = query.get("search") || "";
  const controller = new AbortController();
  function onChangeSiteIndex(index: number) {
    setTorrentResults(defaultTorrentResults);
    setPage(1);
    setSiteIndex(index);
  }
  function onChangeTorrentResult(torrentResults: ITorrentResult) {
    const { data, ...others } = torrentResults;
    if (siteIndex > 0) {
      setTorrentResults({
        data: [...torrentResult?.data, ...data],
        ...others,
      });
    } else {
      setTorrentResults(torrentResults);
    }
  }
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await torrentInstance.get(
          torrentSites[siteIndex].url,
          {
            params: {
              query: search,
              page,
            },
            signal: controller.signal,
          }
        );
        onChangeTorrentResult(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [siteIndex, page]);
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
    torrentSites,
    siteIndex,
    onChangeSiteIndex,
    incrementPage,
  };
}
