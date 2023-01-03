import Slider from "react-slick";
import "./Hero.scss";
import { sliderSettings } from "./sliderSettings";
function Hero() {
  return (
    <Slider className="hero" {...sliderSettings}>
      <div className="hero__slide hero__slide--1"></div>
      <div className="hero__slide hero__slide--2"></div>
    </Slider>
  );
}

export default Hero;
