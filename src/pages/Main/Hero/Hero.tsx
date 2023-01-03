import Slider from "react-slick";
import "./Hero.scss";
import { sliderSettings } from "./sliderSettings";
function Hero() {
  return (
    <Slider className="hero" {...sliderSettings}>
      <div className="hero__slide hero__slide--1">
        <p>Thousands of books</p>
        <p>make millions of thoughts...</p>
      </div>
      <div className="hero__slide hero__slide--2"></div>
    </Slider>
  );
}

export default Hero;
