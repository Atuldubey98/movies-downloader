import bytes from "bytes";

export const toEntry = function ({
  name,
  path,
  length,
}: TorrentStream.TorrentFile) {
  return {
    name,
    path,
    length: bytes(length),
  };
};
