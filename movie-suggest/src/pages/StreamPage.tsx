import useQuery from "../hooks/useQuery";
import { useState, useEffect } from "react";
import "./StreamPage.css";
import { baseURL, fetchFiles, streamMedia, torrentInstance } from "../instance";
import { BounceLoader } from "react-spinners";
import mimeTypes from "mime-types";
export default function StreamPage() {
  const query = useQuery();
  const magnetUrl = query.get("magnetUrl") || "";
  const [files, setFiles] = useState<
    { name: string; length: string; path: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [videoPath, setVideoPath] = useState<string>("");
  async function onChangePath(name: string) {
    if (name.endsWith(".mp4") || name.endsWith(".mkv")) {
      setVideoPath(name);
    }
  }
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await torrentInstance.get(fetchFiles, {
          params: {
            magnetUrl,
          },
          headers: {
            "Content-Type": "application/xml",
          },
        });
        setFiles(
          data
            .split("\n")
            .map((file: string) => {
              const [name, length, path] = file.split(", ");
              return { name, length, path };
            })
            .filter(
              (file: { name: string; length: string; path: string }) =>
                file.name !== ""
            )
        );
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
          <video
            crossOrigin="anonymous"
            id="videoPlayer"
            controls
            autoPlay
            width={"100%"}
            muted
          >
            <source
              src={`${baseURL}${streamMedia}?magnetUrl=${magnetUrl}&videoPath=${videoPath}`}
              type={"video/mp4"}
            />
          </video>
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
                <th colSpan={5}>File Size</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr
                  role="button"
                  style={{
                    cursor:
                      file.name.endsWith(".mkv") || file.name.endsWith(".mp4")
                        ? "pointer"
                        : undefined,
                  }}
                  onClick={() => onChangePath(file.name)}
                  key={index}
                >
                  <td
                    style={{
                      color:
                        file.name.endsWith(".mkv") || file.name.endsWith(".mp4")
                          ? "green"
                          : undefined,
                    }}
                    colSpan={7}
                  >
                    {file.name}
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
}
