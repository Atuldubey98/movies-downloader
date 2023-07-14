import './Hero.css';
import hero from "../assets/hero.svg";
export default function Hero() {
  return (
    <section className="hero">
      <img src={hero} alt="hero image" />
      <div className="hero__text">
        <h1>Moviesss</h1>
      </div>
    </section>
  );
}
