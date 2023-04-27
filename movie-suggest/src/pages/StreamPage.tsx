import useQuery from "../hooks/useQuery";
import { useState, useEffect } from "react";
import "./StreamPage.css";
import { baseURL, fetchFiles, streamMedia, torrentInstance } from "../instance";
import { BounceLoader } from "react-spinners";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { IStreamResponse } from "../interfaces";

export default function StreamPage() {
  const query = useQuery();
  const magnetUrl = query.get("magnetUrl") || "";
  const videoPath = query.get("videoPath") || "";
  const [streamResponse, setStreamResponse] = useState<IStreamResponse>({
    files: [],
    totalLength: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await torrentInstance.get(fetchFiles, {
          params: {
            magnetUrl,
          },
        });
        setStreamResponse(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
    return () => {};
  }, []);

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
          <div className="d-flex-center loading">
            <BounceLoader loading={loading} color="white" />
          </div>
        ) : (
          <table className="torrent__files">
            <thead>
              <tr>
                <th colSpan={7}>File Name</th>
                <th colSpan={5}>Size</th>
              </tr>
            </thead>
            <tbody>
              {streamResponse.files.map((file, index) => (
                <tr
                  role="button"
                  style={{
                    cursor: checkMime(file) ? "pointer" : undefined,
                  }}
                  key={index}
                >
                  <td
                    style={{
                      color: checkMime(file) ? "green" : undefined,
                    }}
                    colSpan={7}
                  >
                    <Link
                      target={`${checkMime(file) ? "_self" : "_blank"}`}
                      to={`${
                        checkMime(file)
                          ? `/stream?magnetUrl=${magnetUrl}&videoPath=${file.name}`
                          : `${baseURL}/api/v1/torrent/video?magnetUrl=${magnetUrl}&videoPath=${file.name}`
                      }`}
                    >
                      {file.name}
                    </Link>
                  </td>
                  <td colSpan={5}>{file.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );

  function checkMime(file: { name: string; length: string; path: string }) {
    return file.name.endsWith(".mkv") || file.name.endsWith(".mp4");
  }
}
