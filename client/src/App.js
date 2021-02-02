import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Header from './components/Header';
import LandingPage from './page/LandingPage';
import ShopPage from './page/ShopPage';
import StorePage from './page/StorePage';
import LoginPage from './page/LoginPage';
import MyPage from './page/MyPage';
import SignUpForm from './components/SignUpForm';
import ProductDetailPage from './page/ProductDetailPage';

const GlobalStyles = createGlobalStyle`
  @font-face {
    src: url(${require('./asset/fonts/NotoSansKR-Bold.otf')});
        font-family: "Noto Sans KR", sans-serif !important;
  }
  body { 
    font-family: 'Noto Sans KR', sans-serif;
  } 
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/shop' component={ShopPage} />
      <Route exact path='/product/:id' component={ProductDetailPage} />
      <Route exact path='/store' component={StorePage} />
      <Route exact path='/mypage' component={MyPage} />
      <Switch>
        <Route exact path='/login/:signup' component={SignUpForm} />
        <Route exact path='/login' component={LoginPage} />
      </Switch>
    </>
  );
}

export default App;
