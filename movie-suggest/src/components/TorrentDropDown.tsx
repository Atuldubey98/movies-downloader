import { BsMagnetFill } from "react-icons/bs";
import { CiStreamOn } from "react-icons/ci";

import { Link } from "react-router-dom";
import { IDataEntity } from "../interfaces";
import "./TorrentDropDown.css";
import Torrent from "./Torrent";
import TextTruncate from "react-text-truncate";

export default function TorrentDropDown({ torrent }: { torrent: IDataEntity }) {
  return (
    <div className="torrent__dropDown">
      {torrent.poster ? (
        <div className="torrent__poster d-flex-center">
          <img loading="lazy" src={torrent.poster} alt="No Image" />
        </div>
      ) : null}
      <div className="torrent__details">
        {torrent.description ? (
          <div>
            <span className="field">Description : </span>
            <TextTruncate
              text={torrent.description}
              element="p"
              line={6}
              textTruncateChild={<Link to={torrent.url}>Read on</Link>}
            />
          </div>
        ) : null}
        {torrent.size ? (
          <p>
            <span className="field">Torrent Size :</span> {torrent.size}
          </p>
        ) : null}
        {torrent.date ? (
          <p>
            <span className="field">Date : </span>
            {torrent.date}
          </p>
        ) : null}
        {torrent.year ? (
          <p>
            <span className="field">Year : </span>
            {torrent.year}
          </p>
        ) : null}
        {torrent.language ? (
          <p>
            <span className="field">Language : </span>
            {torrent.language}
          </p>
        ) : null}
        {torrent.runtime ? (
          <p>
            <span className="field">Run Time : </span>
            {torrent.runtime}
          </p>
        ) : null}
        {torrent.rating ? (
          <p>
            <span className="field">Rating : </span>
            {torrent.rating}
          </p>
        ) : null}
        {torrent.url ? (
          <Link target="_blank" to={torrent.url}>
            Torrent URL
          </Link>
        ) : null}
        {torrent.uploader ? (
          <p>
            <span className="field">Uploader : </span>
            {torrent.uploader}
          </p>
        ) : null}
        {torrent.category ? (
          <p>
            <span className="field">Category : </span>
            {torrent.category}
          </p>
        ) : null}
        {torrent.files && Array.isArray(torrent.files) ? (
          <div>
            <span className="field">Files Available : </span>{" "}
            <div className="files">
              {torrent.files.map((file, index) => (
                <p key={index}>{file}</p>
              ))}
            </div>
          </div>
        ) : null}
        {torrent.magnet ? (
          <p>
            <span className="field">
              <BsMagnetFill size={20} color="red" />
              Magner URL :
            </span>
            <Link target="_blank" to={torrent.magnet}>
              Magnet
            </Link>
          </p>
        ) : null}
        {torrent.magnet ? (
          <Link target="_blank" to={`/stream?magnetUrl=${torrent.magnet}`}>
            <CiStreamOn color="black" size={20} />
            <span>Stream</span>
          </Link>
        ) : null}
        {torrent.authors && Array.isArray(torrent.authors) ? (
          <p>
            <span className="field">Authors : </span>
            {torrent.authors.join(", ")}
          </p>
        ) : null}

        {torrent.torrents && Array.isArray(torrent.torrents) ? (
          <div className="torrent__list">
            <h4>Torrent List :</h4>
            {torrent.torrents.map((tor, index) => (
              <Torrent torrent={tor} key={index} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
