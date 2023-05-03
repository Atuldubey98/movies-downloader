import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { BiCameraMovie } from "react-icons/bi";
import { PropagateLoader } from "react-spinners";
import LoadingTorrents from "../components/LoadingTorrents";
import TorrentResult from "../components/TorrentResult";
import TorrentSite from "../components/TorrentSite";
import useTorrents from "../hooks/useTorrents";
import { IDropDownPropsTorrent } from "../interfaces";
import "./TorrentPage.css";
import DataNotFound from "../components/DataNotFound";
export default function TorrentPage() {
  const {
    torrentResult,
    loading,
    onCancelRequest,
    siteIndex,
    torrentSites,
    onChangeSiteIndex,
    incrementPage,
  } = useTorrents();
  const [dropDownProps, setDropDownProps] = useState<IDropDownPropsTorrent>({
    open: false,
    torrentNumber: 0,
  });
  function updateDropDown(drop: IDropDownPropsTorrent) {
    setDropDownProps(drop);
  }

  return (
    <main className="torrent__page">
      <div className="messages">
        {loading ? <LoadingTorrents onCancelRequest={onCancelRequest} /> : null}
      </div>
      {loading ? null : torrentResult.total !== 0 ? (
        <section className="result__stats">
          <p>{`${torrentResult.total} results in ${torrentResult.time.toFixed(
            2
          )} seconds`}</p>
          <div className="torrent__filters">
            <ul className="d-flex-center torrents__sites">
              {torrentSites.map((torrentSite, index) => (
                <TorrentSite
                  key={torrentSite.url}
                  torrentSite={torrentSite}
                  index={index}
                  siteIndex={siteIndex}
                  onChangeSiteIndex={onChangeSiteIndex}
                />
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <section className="torrents">
        <div className="torrents__list">
          {torrentResult.data.length === 0 ? (
            loading ? null : (
              <DataNotFound
                content="No torrent found"
                color="white"
                size={150}
                Icon={BiCameraMovie}
              />
            )
          ) : (
            torrentResult.data?.map((torrent, index) => (
              <TorrentResult
                index={index}
                updateDropDown={updateDropDown}
                dropDownProps={dropDownProps}
                torrent={torrent}
                key={torrent.url + index}
              />
            ))
          )}
        </div>
        {loading ? (
          <div className="loading d-flex-center">
            <PropagateLoader loading={loading} color="#ffffff" size={25} />
          </div>
        ) : null}
        {[1, 4].indexOf(siteIndex) != -1 &&
        !loading &&
        torrentResult.page < (torrentResult.totalPages || 0) ? (
          <div className="d-flex-center show__more">
            <button onClick={incrementPage} className="d-flex-center btn">
              <BsChevronDown size={20} />
              <span>Show more</span>
            </button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
