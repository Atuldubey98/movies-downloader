import { OutgoingHttpHeaders } from "http2";

export default function movieHeaders(
  range: string,
  file: TorrentStream.TorrentFile
): { start: number; end: number; headers: OutgoingHttpHeaders } {
  const videoSize = file.length;
  const CHUNK_SIZE: number = 10 ** 6;
  const start: number = Number(range.replace(/\D/g, ""));
  const end: number = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  const headers: OutgoingHttpHeaders = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": `video/mp4`,
  };
  return { start, end, headers };
}
