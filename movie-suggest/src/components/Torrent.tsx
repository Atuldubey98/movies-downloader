import { Link } from "react-router-dom";
import { ITorrentsEntity } from "../interfaces";
import "./Torrent.css";
export default function Torrent({ torrent }: { torrent: ITorrentsEntity }) {
  return (
    <div className="torrent__link">
      <p className="field">Link 1 : </p>{" "}
      <Link target="_blank" to={torrent.torrent}>{torrent.torrent}</Link>
      <p>
        <span className="field">Size : </span>
        {torrent.size || ""}
      </p>
      <p>
        <span className="field">Type : </span>
        {torrent.type || ""}
      </p>
    </div>
  );
}
