import React, { useState, useEffect, useCallback, useRef } from 'react';
//import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
//import { useSelector } from 'react-redux';

// import {  } from 'module'
import MainVideo from '../components/MainVideo';
import NewProducts from '../components/NewProducts';

// const Banner = styled.div`
//   position: relative;
// `;

function LandingPage(props) {
  // const { gnbmenu } = useSelector((state) => ({
  //   gnbmenu: state.gnbmenu.categories,
  // }));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        top: '-80px',
        height: '5000px',
        width: '100%',
      }}
    >
      <MainVideo />
      <NewProducts />
    </div>
  );
}

export default LandingPage;
