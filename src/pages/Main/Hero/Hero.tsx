import Slider from "react-slick";
import "./Hero.scss";
import { sliderSettings } from "./sliderSettings";
function Hero() {
  return (
    <Slider className="hero" {...sliderSettings}>
      <div className="hero__slide hero__slide--1">
        <div className="slide__content slide__content--1">
          <p className="slide__quote slide__quote--1">
            „Inspring ipsam velit quam unde dolore!"
          </p>
          <p className="slide__author slide__author--1">- Rorem Limpsum</p>
        </div>
      </div>
      <div className="hero__slide hero__slide--2">
        <div className="slide__content slide__content--2">
          <p className="slide__quote slide__quote--2">
            „Inspring lorem velit quam dolore unde!"
          </p>
          <p className="slide__author slide__author--2">- Iorem Qimpsum</p>
        </div>
      </div>
    </Slider>
  );
}

export default Hero;
