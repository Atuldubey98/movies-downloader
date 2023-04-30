import { IconType } from "react-icons";

export default function DataNotFound({
  Icon,
  content,
  size,
  color,
}: {
  size: number;
  color: string;
  Icon: IconType;
  content: string;
}) {
  return (
    <div className="">
      <div className="d-flex-center">
        <Icon size={size} color={color} />
      </div>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        {content}
      </h2>
    </div>
  );
}
