import createHttpError from "http-errors";
import { OutgoingHttpHeaders } from "http2";
import RangeParser from "range-parser";
export function movieHeaders(
  range: string,
  file: TorrentStream.TorrentFile
): { start: number; end: number; headers: OutgoingHttpHeaders } {
  if (!range || range === undefined) {
    throw createHttpError(404, "Range Header not found !");
  }
  const videoSize = file.length;
  const rp: RangeParser.Result | RangeParser.Ranges = RangeParser(
    Number(file.length),
    range
  );
  let end = 0;
  let start = 0;
  if (Array.isArray(rp)) {
    end = rp[0].end;
    start = rp[0].start;
  }
  const contentLength = end - start + 1;

  const headers: OutgoingHttpHeaders = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": `video/mp4`,
    "transferMode.dlna.org": "Streaming",
    "contentFeatures.dlna.org":
      "DLNA.ORG_OP=01;DLNA.ORG_CI=0;DLNA.ORG_FLAGS=01700000000000000000000000000000",
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
