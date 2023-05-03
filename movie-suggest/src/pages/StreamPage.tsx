import { BiErrorCircle } from "react-icons/bi";
import ReactPlayer from "react-player";
import DataNotFound from "../components/DataNotFound";
import LoadingIndi from "../components/LoadingIndi";
import TorrentTableFiles from "../components/TorrentTableFiles";
import useStreamPage from "../hooks/useStreamPage";
import { baseURL, streamMedia } from "../instance";
import "./StreamPage.css";

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
          <TorrentTableFiles
            files={streamResponse.files}
            magnetUrl={magnetUrl}
          />
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
