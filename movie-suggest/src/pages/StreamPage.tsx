import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import LoadingIndi from "../components/LoadingIndi";
import useStreamPage from "../hooks/useStreamPage";
import { baseURL, streamMedia } from "../instance";
import { IStreamLinkProps } from "../interfaces";
import { BiErrorCircle, BiPlayCircle } from "react-icons/bi";
import { AiOutlineDownload } from "react-icons/ai";
import "./StreamPage.css";
import DataNotFound from "../components/DataNotFound";

export default function StreamPage() {
  const { magnetUrl, videoPath, loading, streamResponse, error } =
    useStreamPage();
  return (
    <main className="stream__page">
      {magnetUrl && videoPath ? (
        <div className="video__placeHolder">
          <ReactPlayer
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                  crossOrigin: "false",
                },
              },
            }}
            onContextMenu={(e: any) => e.preventDefault()}
            width={"100%"}
            playing
            controls
            height={"100%"}
            url={`${baseURL}${streamMedia}?magnetUrl=${magnetUrl}&videoPath=${videoPath}`}
          />
        </div>
      ) : (
        <div className="video__placeHolder">
          <h1>Select a movie</h1>
        </div>
      )}
      <div className="torrent__contents">
        {loading ? (
          <LoadingIndi loading={loading} />
        ) : (
          <table className="torrent__files">
            <thead>
              <tr>
                <th colSpan={2}>Playable / Download</th>
                <th colSpan={7}>File Name</th>
                <th colSpan={3}>Size</th>
              </tr>
            </thead>
            <tbody>
              {streamResponse.files.map((file, index) => (
                <StreamLinks
                  key={index}
                  index={index}
                  file={file}
                  magnetUrl={magnetUrl}
                />
              ))}
            </tbody>
          </table>
        )}
        {error ? (
          <DataNotFound
            Icon={BiErrorCircle}
            content={error}
            size={150}
            color="red"
          />
        ) : null}
      </div>
    </main>
  );
}
function checkMime(file: { name: string; length: string; path: string }) {
  return file.name.endsWith(".mkv") || file.name.endsWith(".mp4");
}
function StreamLinks({ file, index, magnetUrl }: IStreamLinkProps) {
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
