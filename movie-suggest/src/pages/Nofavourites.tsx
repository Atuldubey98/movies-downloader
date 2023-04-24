import { AiTwotoneHeart } from "react-icons/ai";
import "./NoFavourites.css";

export default function Nofavourites() {
  return (
    <main className="d-flex-center nofavs">
      <AiTwotoneHeart size={150} color="red" />
      <h1>No Favourites</h1>
    </main>
  );
}
