import { AiOutlineDownload } from "react-icons/ai";
import { BiPlayCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { baseURL } from "../instance";
import { IStreamLinkProps } from "../interfaces";
function checkMime(file: { name: string; length: string; path: string }) {
  return file.name.endsWith(".mkv") || file.name.endsWith(".mp4");
}

export default function StreamLinks({
  file,
  index,
  magnetUrl,
}: IStreamLinkProps) {
  const mime = checkMime(file);
  return (
    <tr
      role="button"
      style={{
        cursor: mime ? "pointer" : undefined,
      }}
      key={index}
    >
      <td colSpan={2}>{mime ? <BiPlayCircle /> : <AiOutlineDownload />}</td>
      <td
        style={{
          color: mime ? "green" : undefined,
        }}
        colSpan={7}
      >
        <Link
          target={`${mime ? "_self" : "_blank"}`}
          to={`${
            mime
              ? `/stream?magnetUrl=${magnetUrl}&videoPath=${file.name}`
              : `${baseURL}/api/v1/torrent/video?magnetUrl=${magnetUrl}&videoPath=${file.name}`
          }`}
        >
          {file.name}
        </Link>
      </td>
      <td colSpan={3}>{file.length}</td>
    </tr>
  );
}
