import React from "react";
import Slider from "react-slick";
import "./Hero.scss";
function Hero() {
  const sliderSettings = {
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3750,
    pauseOnHover: false,
  };

  return (
    <Slider className="hero" {...sliderSettings}>
      <div className="hero__slide hero__slide--1">dsdfs</div>
      <div className="hero__slide hero__slide--2">dsdfs</div>
    </Slider>
  );
}

export default Hero;
