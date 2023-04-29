import { useState } from "react";
import { FcCancel } from "react-icons/fc";
import { PropagateLoader } from "react-spinners";
import TorrentResult from "../components/TorrentResult";
import useTorrents from "../hooks/useTorrents";
import { IDropDownPropsTorrent } from "../interfaces";
import "./TorrentPage.css";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
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
        {loading ? (
          <div className="d-flex-center message__cancel">
            <p style={{ textAlign: "center" }}>
              Get your popcorn ! It might take one to two minutes
            </p>
            <button
              onClick={() => onCancelRequest()}
              className="btn d-flex-center"
            >
              <FcCancel size={20} color="black" /> <span>Cancel Request</span>
            </button>
          </div>
        ) : null}
      </div>
      {loading ? null : torrentResult.total !== 0 ? (
        <section className="result__stats">
          <p>{`${torrentResult.total} results in ${torrentResult.time.toFixed(
            2
          )} seconds`}</p>
          <div className="torrent__filters">
            <ul className="d-flex-center torrents__sites">
              {torrentSites.map((torrentSite, index) => (
                <li
                  key={torrentSite.url}
                  onClick={() => onChangeSiteIndex(index)}
                  className={`d-flex-center torrent__site ${
                    siteIndex === index ? "selected" : ""
                  }`}
                >
                  {index === siteIndex ? (
                    <AiOutlineCheck size={20} color="white" />
                  ) : null}
                  <span>{torrentSite.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <section className="torrents">
        <div className="torrents__list">
          {torrentResult.data?.map((torrent, index) => (
            <TorrentResult
              index={index}
              updateDropDown={updateDropDown}
              dropDownProps={dropDownProps}
              torrent={torrent}
              key={torrent.url + index}
            />
          ))}
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
