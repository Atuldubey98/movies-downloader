import {
    BsFileArrowDownFill,
    BsFileArrowUpFill,
    BsFillMagnetFill,
    BsMagnetFill,
} from "react-icons/bs";
import { IDataEntity, IDropDownPropsTorrent } from "../interfaces";
import TorrentDropDown from "./TorrentDropDown";
import "./TorrentResult.css";
export default function TorrentResult({
  torrent,
  dropDownProps,
  updateDropDown,
  index,
}: {
  index: number;
  torrent: IDataEntity;
  updateDropDown: (drop: IDropDownPropsTorrent) => void;
  dropDownProps: IDropDownPropsTorrent;
}) {
  function decideDropDown() {
    if (dropDownProps.open && index === dropDownProps.torrentNumber) {
      updateDropDown({ open: false, torrentNumber: index });
    } else {
      updateDropDown({ open: false, torrentNumber: index });
      updateDropDown({ open: true, torrentNumber: index });
    }
  }
  return (
    <div className="torrent__result">
      <div onClick={() => decideDropDown()} className="torrent__props">
        <p className="torrent__name">{torrent.name}</p>
        <div className="torrent__stats">
          <p>
            <BsFileArrowUpFill color="green" size={16} /> {torrent?.seeders}
          </p>
          <span>
            {torrent.torrents &&
            Array.isArray(torrent.torrents) &&
            torrent.torrents.length > 0 ? (
              <BsFillMagnetFill color="green" size={20} />
            ) : null}
            {torrent.magnet ? <BsMagnetFill size={20} color="red" /> : null}
          </span>
          <p>
            <BsFileArrowDownFill color="red" size={16} />
            {torrent?.leechers}
          </p>
        </div>
      </div>
      {dropDownProps.open && dropDownProps.torrentNumber === index ? (
        <TorrentDropDown torrent={torrent} />
      ) : null}
    </div>
  );
}
