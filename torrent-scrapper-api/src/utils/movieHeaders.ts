import createHttpError from "http-errors";
import { OutgoingHttpHeaders } from "http2";

export function movieHeaders(
  range: string,
  file: TorrentStream.TorrentFile
): { start: number; end: number; headers: OutgoingHttpHeaders } {
  if (!range || range === undefined) {
    throw createHttpError(404, "Range Header not found !");
  }
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
export function downLoadMovieHeaders(name: string): OutgoingHttpHeaders {
  const head: OutgoingHttpHeaders = {
    "Content-disposition": "attachment; filename=" + name,
    "Content-Type": "text/plain",
  };
  return head;
}
