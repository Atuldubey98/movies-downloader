import { AiOutlineCheck } from "react-icons/ai";
import { ITorrentSite } from "../interfaces";

export default function TorrentSite({
  torrentSite,
  onChangeSiteIndex,
  index,
  siteIndex,
}: {
  siteIndex: number;
  index: number;
  onChangeSiteIndex: (index: number) => void;
  torrentSite: ITorrentSite;
}) {
  return (
    <li
      key={torrentSite.url}
      onClick={() => onChangeSiteIndex(index)}
      className={`d-flex-center torrent__site ${
        siteIndex === index ? "selected" : ""
      }`}
    >
      {index === siteIndex ? <AiOutlineCheck size={20} color="white" /> : null}
      <span>{torrentSite.label}</span>
    </li>
  );
}
