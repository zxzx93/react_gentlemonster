import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';

import video from '../asset/New Campaign MY MARS.mp4';

const MainBannerVideo = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  min-height: 600px;
  height: calc(100vh - 250px);
  overflow: hidden;
  background: #000;
  margin-bottom: 100px;

  @media (max-width: 414px) {
    & {
      min-height: 76vh;
    }
  }
`;

const MainVideoWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  //opacity: 0;
  animation: zoomin 3s 0.5s ease-in;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  video {
    position: relative;
    width: 100%;
    height: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) !important;
  }

  .main_video {
    position: relative;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 768px), (max-width: 1024px) {
    .main_video {
      width: auto;
      height: 100%;
      left: 0;
      top: 0;
      transform: none !important;
    }
  }
  /* @media (max-width: 1024px) {
    .main_video {
      width: auto;
      height: 100%;
      left: 0;
      top: 0;
      transform: none !important;
    }
  } */

  @media (min-width: 1025px) {
    .main_video {
      width: 100%;
      height: auto;
    }
  }

  @media (max-aspect-ratio: 16/9) {
    .main_video {
      width: auto;
      height: 100%;
    }
  }
`;

function MainVideo() {
  const [w, setW] = useState('');
  const [h, setH] = useState('');

  const video_banner = useRef();

  const RATIO_PC = 1920 / 1080;
  //var RATIO_MO = 1080 / 1080;
  const imageRatio = RATIO_PC;

  const onResize = useCallback(() => {
    let windowWidth = window.innerWidth;
    let windowHeight = Math.max(window.innerHeight * 0.83, 400);

    let size = windowWidth / windowHeight;
    console.log({ RATIO_PC, windowWidth, windowHeight, size });

    console.log('사이즈');
    if (video_banner && size >= imageRatio) {
      console.log('1');

      //setResize({ w: '100%', h: 'auto' });
      // video_banner.current.style.width = '100%';
      // video_banner.current.style.height = 'auto';
      setW('100%');
      setH('auto');
    } else if (video_banner && size < imageRatio) {
      console.log('2');
      // video_banner.current.style.width = 'auto';
      // video_banner.current.style.height = '100%';
      //setResize({ w: 'auto', h: '100%' });
      setW('auto');
      setH('100%');
    }
  }, [imageRatio, RATIO_PC]);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);
  console.log(w, h);

  return (
    <MainBannerVideo>
      <MainVideoWrap>
        <video
          //onLoadStart={resize}
          className='main_video'
          ref={video_banner}
          autoPlay
          muted
          loop
          style={{ width: w, height: h }}
        >
          <source src={video} type='video/mp4' />
        </video>
      </MainVideoWrap>
    </MainBannerVideo>
  );
}

export default MainVideo;
