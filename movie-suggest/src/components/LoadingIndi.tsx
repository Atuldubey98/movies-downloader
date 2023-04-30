import { BounceLoader } from "react-spinners";

export default function LoadingIndi({ loading }: { loading: boolean }) {
  return (
    <div className="d-flex-center loading">
      <BounceLoader loading={loading} color="white" />
    </div>
  );
}
