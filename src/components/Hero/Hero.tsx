import Slider from "react-slick";
import "./Hero.scss";
function Hero() {
  const sliderSettings = {
    infinite: true,
    arrows: false,
    speed: 650,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3750,
    pauseOnHover: false,
  };

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
