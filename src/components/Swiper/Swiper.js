import React, { useContext } from "react";
import { MovieContext } from "../../Context";
import Swiper from "react-id-swiper";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
const params = {
  spaceBetween: 30,
  centeredSlides: true,
  rebuildOnUpdate: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
};

const Swiper = () => (
  <Swiper>
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
    <div>Slide 4</div>
    <div>Slide 5</div>
  </Swiper>
);

export default Swiper;
