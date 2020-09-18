import React, { useRef, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';

import 'react-alice-carousel/lib/alice-carousel.css';
import './Carousel.css';

const items = [
  'https://i.imgur.com/VTpz8XB.jpg',
  'https://i.imgur.com/nff0PWy.jpg',
  'https://i.imgur.com/fY311wc.jpeg',
  'https://i.imgur.com/BaGeu7F.jpeg',
  'https://i.imgur.com/rc9nH0R.jpeg',
  'https://i.imgur.com/xnoLgTy.jpeg',
];

const images = [
  'https://i.imgur.com/VTpz8XB.jpg',
  'https://i.imgur.com/nff0PWy.jpg',
  'https://i.imgur.com/fY311wc.jpeg',
  'https://i.imgur.com/BaGeu7F.jpeg',
];

function Carousel(props) {
  let Carousel = useRef();
  let SecondCarousel = useRef();

  useEffect(() => {
    // This code triggers the resize event on the browser and avoids image malfunction on the carousel.
    window.dispatchEvent(new Event('resize'));
  }, [props.popUpActive]);

  const galleryItems = items.map((image, index) => (
    <img alt="img" className="mainImages" key={index + 20} src={image} />
  ));

  const galleryVideos = images.map((image, index) => (
    <img alt="img" className="mainImages" key={index + 20} src={image} />
  ));

  const thumbItem = (item, index) => (
    <img
      alt="Img"
      key={index}
      onClick={() => Carousel.slideTo(index)}
      src={item}
      className={`smallImages`}
    />
  );

  const numberItem = (item, index) => (
    <span
      key={index + 10}
      onClick={() => Carousel.slideTo(index)}
      className="individualDigit"
    >
      {index + 1 + ' '}
    </span>
  );

  const secondThumbItem = (item, index) => (
    <img
      alt="Img"
      key={index}
      onClick={() => SecondCarousel.slideTo(index)}
      src={item}
      className={`smallImages`}
    />
  );

  const secondNumberItem = (item, index) => (
    <span
      key={index + 10}
      onClick={() => SecondCarousel.slideTo(index)}
      className="individualDigit"
    >
      {index + 1 + ' '}
    </span>
  );

  return (
    <>
      <div
        className={`galleryCarousel ${
          props.popUpActive === 1 ? '' : 'displayTab'
        }`}
      >
        <div className="carouselMain">
          <AliceCarousel
            dotsDisabled={true}
            buttonsDisabled={true}
            items={galleryItems}
            // responsive={responsive} Remove if one picture in Carousel displays
            ref={e => (Carousel = e)}
          />
        </div>

        <div className="carouselThumbs">
          <nav className="thumbImages">
            {items.map((item, index) => thumbItem(item, index))}
          </nav>
          <div className="thumbNumbers">
            <button
              id="leftArrow"
              className="buttonClass"
              onClick={() => Carousel.slidePrev()}
            >
              {`<`}
            </button>
            <span className="thumbDigits">
              {items.map((item, index) => numberItem(item, index))}
            </span>
            <button
              id="rightArrow"
              className="buttonClass arrowButtons"
              onClick={() => Carousel.slideNext()}
            >
              {`>`}
            </button>
          </div>
        </div>
      </div>

      {/* SECOND CAROUSEL FOR VIDEOS INSERT HERE! */}

      <div
        className={`galleryCarousel ${
          props.popUpActive === 2 ? '' : 'displayTab'
        }`}
      >
        <div className="carouselMain">
          <AliceCarousel
            dotsDisabled={true}
            buttonsDisabled={true}
            items={galleryVideos}
            mouseTrackingEnabled
            // responsive={responsive} Remove if one picture in Carousel displays
            ref={e => (SecondCarousel = e)}
          />
        </div>

        <div className="carouselThumbs">
          <nav className="thumbImages">
            {images.map((item, index) => secondThumbItem(item, index))}
          </nav>
          <div className="thumbNumbers">
            <button
              id="leftArrow"
              className="buttonClass"
              onClick={() => SecondCarousel.slidePrev()}
            >
              {`<`}
            </button>
            <span className="thumbDigits">
              {images.map((item, index) => secondNumberItem(item, index))}
            </span>
            <button
              id="rightArrow"
              className="buttonClass arrowButtons"
              onClick={() => SecondCarousel.slideNext()}
            >
              {`>`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carousel;
