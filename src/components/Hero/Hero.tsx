import React from "react";
import "./Hero.scss";
function Hero() {
  return (
    <div className="hero">
      <h1 className="hero__heading">
        Dozens of clothes <br /> discounted up to 40%!
      </h1>
      <button className="hero__btn">See offers</button>
    </div>
  );
}

export default Hero;
