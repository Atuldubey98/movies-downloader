import { TorrentFile } from "../interfaces";
import StreamLinks from "./StreamLinks";
interface ITorrentTableFileProps {
  files: TorrentFile[];
  magnetUrl: string;
}
export default function TorrentTableFiles({
  files,
  magnetUrl,
}: ITorrentTableFileProps) {
  return (
    <table className="torrent__files">
      <thead>
        <tr>
          <th colSpan={2}>Playable / Download</th>
          <th colSpan={7}>File Name</th>
          <th colSpan={3}>Size</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file, index) => (
          <StreamLinks
            key={index}
            index={index}
            file={file}
            magnetUrl={magnetUrl}
          />
        ))}
      </tbody>
    </table>
  );
}
