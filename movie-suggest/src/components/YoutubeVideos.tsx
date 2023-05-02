import { useReducer } from "react";
import { IUTubeVideo } from "../interfaces";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ReactPlayer from "react-player";
import "./YoutubeVideos.css";
export default function YoutubeVideos({
  youtubes,
}: {
  youtubes: IUTubeVideo[];
}) {
  type Action =
    | {
        type: "index";
        index: number;
      }
    | {
        type: "play";
        index: number;
      }
    | {
        type: "pause";
        index: number;
      };
  type State = {
    index: number;
    youtubeVideos: { youtube: IUTubeVideo; playing: boolean }[];
  };
  function reducer(state: State, action: Action) {
    switch (action.type) {
      case "index":
        return { ...state, index: action.index };
      case "play":
        return {
          ...state,
          youtubeVideos: state.youtubeVideos.map((u, i) =>
            i === action.index ? { ...u, playing: true } : u
          ),
        };
      case "pause":
        return {
          ...state,
          youtubeVideos: state.youtubeVideos.map((u, i) =>
            i === action.index ? { ...u, playing: false } : u
          ),
        };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    index: 0,
    youtubeVideos: youtubes
      .map((youtube) => ({ youtube, playing: false }))
      .filter((youtube) => youtube.youtube.site === "YouTube"),
  });
  const { youtubeVideos, index } = state;
  const youtube: IUTubeVideo = youtubeVideos[index].youtube;
  const playing: boolean = youtubeVideos[index].playing;
  function onNext() {
    if (index < youtubeVideos.length - 1) {
      dispatch({ type: "pause", index });
      dispatch({ type: "index", index: index + 1 });
    }
  }
  function onPrevious() {
    if (index > 0) {
      dispatch({ type: "pause", index });
      dispatch({ type: "index", index: index - 1 });
    }
  }
  if (youtubeVideos.length === 0) {
    return <p>Currently there are no videos available for this content </p>;
  }
  return (
    <div className="youtube__div">
      <div className="youtube__description">
        <p>
          <span className="field">Name : </span>
          <span>{youtube.name}</span>
        </p>
        <p>
          <span className="field">Official or Unofficial : </span>
          <span>{youtube.official ? "Official" : "Unofficial"}</span>
        </p>
        <p>
          <span className="field">Site : </span>
          <span>{youtube.site}</span>
        </p>
        <p>
          <span className="field">Type : </span>
          <span>{youtube.type}</span>
        </p>
        <p className="videos__description">
          <span className="field">Video : </span>
          <span>{`${index + 1}/${youtubeVideos.length}`}</span>
        </p>
      </div>
      <div className="youtubes">
        {index === 0 ? null : (
          <AiOutlineLeft onClick={onPrevious} className="icon" size={30} />
        )}
        <ReactPlayer
          className="react-player"
          controls
          config={{
            file: {
              attributes: {
                crossOrigin: "false",
              },
            },
          }}
          url={`https://www.youtube.com/watch?v=${youtube.key}`}
          width="100%"
          onPlay={() => {
            dispatch({ type: "play", index });
          }}
          playing={playing}
        />
        {index === youtubeVideos.length - 1 ? null : (
          <AiOutlineRight size={30} className="icon" onClick={onNext} />
        )}
      </div>
    </div>
  );
}
