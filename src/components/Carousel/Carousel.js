import React, { useRef, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import ReactPlayer from 'react-player/lazy';

import 'react-alice-carousel/lib/alice-carousel.css';
import './Carousel.css';

const images = [
  'https://i.imgur.com/VTpz8XB.jpg',
  'https://i.imgur.com/nff0PWy.jpg',
  'https://i.imgur.com/fY311wc.jpeg',
  'https://i.imgur.com/BaGeu7F.jpeg',
  'https://i.imgur.com/rc9nH0R.jpeg',
  'https://i.imgur.com/xnoLgTy.jpeg',
];

const videos = [
  'https://www.youtube.com/watch?v=5Y0CaCn-hd8',
  'https://www.youtube.com/watch?v=C6ZqJ-5v3o4&list=LL9DN5AIo4LNrmpHHpXVFwtw&index=13&t=0s',
  'https://www.youtube.com/watch?v=KmlMQtMkywo&list=LL9DN5AIo4LNrmpHHpXVFwtw&index=7&t=0s',
  'https://www.youtube.com/watch?v=gwVb1nLPBkA&list=LL9DN5AIo4LNrmpHHpXVFwtw&index=8&t=215s',
  'https://www.youtube.com/watch?v=KmlMQtMkywo&list=LL9DN5AIo4LNrmpHHpXVFwtw&index=7&t=0s',
];

function Carousel(props) {
  let Carousel = useRef();
  let SecondCarousel = useRef();

  useEffect(() => {
    // This code triggers the resize event on the browser and avoids image malfunction on the carousel.
    window.dispatchEvent(new Event('resize'));
  }, [props.popUpActive]);

  const galleryItems = images.map((image, index) => (
    <img alt={`${index}`} className="mainImages" key={index + 20} src={image} />
  ));

  const galleryVideos = videos.map((video, index) => (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        key={index + 20}
        url={video}
        controls
        width="100%"
        height="100%"
      />
    </div>
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
    <div
      className={`smallVideos`}
      onClick={() => SecondCarousel.slideTo(index)}
    >
      <div className="player-wrapper-2">
        <ReactPlayer
          className="react-player-2"
          key={index + 20}
          url={item}
          light
          width="100%"
          height="100%"
        />
      </div>
    </div>
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
            ref={e => (Carousel = e)}
          />
        </div>

        <div className="carouselThumbs">
          <nav className="thumbImages">
            {images.map((item, index) => thumbItem(item, index))}
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
              {images.map((item, index) => numberItem(item, index))}
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

      {/* SECOND CAROUSEL FOR VIDEOS BELOW! */}

      <div
        className={`galleryCarousel ${
          props.popUpActive === 2 ? '' : 'displayTab'
        }`}
      >
        <div className="carouselMain">
          <AliceCarousel // Second Carousel
            dotsDisabled={true}
            buttonsDisabled={true}
            items={galleryVideos}
            ref={e => (SecondCarousel = e)}
          />
        </div>

        <div className="carouselThumbs">
          <div className="thumbVideos">
            {videos.map((item, index) => secondThumbItem(item, index))}
          </div>
          <div>
            <button
              id="leftArrow"
              className="buttonClass"
              onClick={() => SecondCarousel.slidePrev()}
            >
              {`<`}
            </button>
            <span className="thumbDigits">
              {videos.map((item, index) => secondNumberItem(item, index))}
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
