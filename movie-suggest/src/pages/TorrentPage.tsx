import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { PropagateLoader } from "react-spinners";
import TorrentResult from "../components/TorrentResult";
import useTorrents from "../hooks/useTorrents";
import { IDataEntity, IDropDownPropsTorrent } from "../interfaces";
import "./TorrentPage.css";
export default function TorrentPage() {
  const { torrentResult, loading, controller, onCancelRequest } = useTorrents();
  const [dropDownProps, setDropDownProps] = useState<IDropDownPropsTorrent>({
    open: false,
    torrentNumber: 0,
  });
  function updateDropDown(drop: IDropDownPropsTorrent) {
    setDropDownProps(drop);
  }
  const [offset, setOffset] = useState<number>(10);
  const currentResult: IDataEntity[] = torrentResult.data
    ? torrentResult.data?.slice(0, offset)
    : [];
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
      {loading ? (
        <div className="loading d-flex-center">
          <PropagateLoader loading={loading} color="#ffffff" size={25} />
        </div>
      ) : torrentResult.total !== 0 ? (
        <div className="result__stats d-flex-center">
          <span>{`${
            torrentResult.total
          } results in ${torrentResult.time.toFixed(2)} seconds`}</span>
        </div>
      ) : null}
      <section className="torrents">
        <div className="torrents__list">
          {currentResult?.map((torrent, index) => (
            <TorrentResult
              index={index}
              updateDropDown={updateDropDown}
              dropDownProps={dropDownProps}
              torrent={torrent}
              key={torrent.url + index}
            />
          ))}
        </div>
        {offset < torrentResult.total ? (
          <div className="d-flex-center show__more">
            <button
              className="d-flex-center btn"
              onClick={() => setOffset((o) => o + 10)}
            >
              <BsChevronDown size={20} />
              <span>Show more</span>
            </button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
