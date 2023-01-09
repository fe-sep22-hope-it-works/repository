/* eslint-disable global-require */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import '../../styles/page-title.scss';
import classNames from 'classnames';
import bannerMain from '../../img/banner/banner-main-mob.svg';

export const Slider = () => {
  const [numberOfPhoto, setNumberOfPhoto] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setInnerWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener('resize', () => {
        setInnerWidth(window.innerWidth);
      });
    };
  }, [innerWidth]);

  const rightSwipe = () => {
    setNumberOfPhoto((prevPhoto) => (prevPhoto + 1) % 3);
  };

  const leftSwipe = () => {
    setNumberOfPhoto((prevPhoto) => (
      (prevPhoto - 1 >= 0) ? prevPhoto - 1 : 2));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLImageElement>) => {
    setTouchEnd(0);
    setTouchStart(event.targetTouches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLImageElement>) => {
    setTouchEnd(event.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100 && touchEnd !== 0) {
      rightSwipe();
    }

    if (touchStart - touchEnd < -100 && touchEnd !== 0) {
      leftSwipe();
    }
  };

  return (
    <section className="slider slider--home-page">
      <div className="slider__container">
        {innerWidth > 640
          ? (
            <>
              <button
                className="slider__swipe"
                onClick={leftSwipe}
              >
                &#60;
              </button>
              <div className="slider__photo">
                <img
                  src={require('../../img/banner/banner-main.png')}
                  alt="Banner"
                  className={classNames('slider__img', {
                    'slider__img--active': numberOfPhoto === 0,
                  })}
                />
                <img
                  src={require('../../img/banner/banner-double.jpg')}
                  alt="Banner"
                  className={classNames('slider__img', {
                    'slider__img--active': numberOfPhoto === 1,
                  })}
                />
                <img
                  src={require('../../img/banner/banner-zoom.jpg')}
                  alt="Banner"
                  className={classNames('slider__img', {
                    'slider__img--active': numberOfPhoto === 2,
                  })}
                />

              </div>
              <button
                className="slider__swipe"
                onClick={rightSwipe}
              >
                &#62;
              </button>
            </>
          )
          : (
            <div className="slider__photo">
              <img
                src={bannerMain}
                alt="Banner"
                className={classNames('slider__img', {
                  'slider__img--active': numberOfPhoto === 0,
                })}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
              <img
                src={require('../../img/banner/banner-around-mob.jpg')}
                alt="Banner"
                className={classNames('slider__img', {
                  'slider__img--active': numberOfPhoto === 1,
                })}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
              <img
                src={require('../../img/banner/banner-one-mob.jpg')}
                alt="Banner"
                className={classNames('slider__img', {
                  'slider__img--active': numberOfPhoto === 2,
                })}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
            </div>
          )}
      </div>
      <div className="slider__select">
        <div className={classNames('slider__option', {
          'slider__option--active': numberOfPhoto === 0,
        })}
        />
        <div className={classNames('slider__option', {
          'slider__option--active': numberOfPhoto === 1,
        })}
        />
        <div className={classNames('slider__option', {
          'slider__option--active': numberOfPhoto === 2,
        })}
        />
      </div>
    </section>
  );
};
