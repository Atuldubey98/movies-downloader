import { FcCancel } from "react-icons/fc";

export default function LoadingTorrents({
  onCancelRequest,
}: {
  onCancelRequest: () => void;
}) {
  return (
    <div className="d-flex-center message__cancel">
      <p style={{ textAlign: "center" }}>
        Get your popcorn ! It might take one to two minutes
      </p>
      <button onClick={() => onCancelRequest()} className="btn d-flex-center">
        <FcCancel size={20} color="black" /> <span>Cancel Request</span>
      </button>
    </div>
  );
}
