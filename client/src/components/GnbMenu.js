import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoIosHeartEmpty, IoIosSearch } from 'react-icons/io';

import { clickCategory } from '../store/modules/gnbmenu';

const sizeStyles = css`
  cursor: pointer;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 0px;
`;

const HeartIcon = styled(IoIosHeartEmpty)`
  width: 22px;
  height: 22px;
`;
const SearchIcon = styled(IoIosSearch)`
  width: 22px;
  height: 22px;
`;

const Nav = styled.ul`
  ${sizeStyles}

  li {
    margin-left: 25px;
    transition: all 0.3s ease;

    a {
      color: #000;
    }

    span {
      position: relative;
    }

    & > span::after {
      content: '';
      width: 0%;
      left: 50%;
      height: 1px;
      display: block;
      position: absolute;
      margin-top: 0.5px;
      border-bottom: 1px solid #000;
      transition: all 0.3s ease;
    }

    &:hover > span::after {
      content: '';
      width: 100%;
      left: 0px;
      height: 1px;
      display: block;
      position: absolute;
      margin-top: 0.5px;
      border-bottom: 1px solid #000;
      transition: all 0.3s ease;
    }
  }

  @media (max-width: 1024px) {
    flex-flow: column nowrap;
    background-color: #fff;
    position: fixed;
    top: 55px;
    right: 0;
    width: 100%;
    height: 100vh;
    font-size: 18px;
    padding-top: 30px;
    z-index: 9999;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    transform-origin: 1px;
    transition: all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);

    li {
      padding: 5px 18px;
    }
  }
`;

const RightNav = styled.ul`
  ${sizeStyles}

  li {
    margin-left: 25px;
  }
`;

const CartButton = styled.button`
  position: relative;
  z-index: 10;
  width: 32px;
  height: 20px;
  border: none;
  background: transparent;
  cursor: pointer;

  span {
    display: block;
    position: relative;
    z-index: 10;
    margin: 0 auto;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    z-index: 0;
    top: calc(50% - 11px);
    left: calc(50% - 11px);
    width: 22px;
    height: 22px;
    background: #000;
    border-radius: 50% 50%;
  }
`;

function GnbMenu({ open }) {
  const dispatch = useDispatch();
  const { gnbmenu, id } = useSelector((state) => ({
    gnbmenu: state.gnbmenu.categories,
    id: state.gnbmenu.id,
  }));
  const { me } = useSelector((state) => state.user);

  if (me) {
    return (
      <Nav open={open}>
        {gnbmenu.map((nav) => (
          <li key={nav.id} onClick={() => dispatch(clickCategory(nav.id))}>
            <span>
              <Link to={nav.path}>{nav.name}</Link>
            </span>
          </li>
        ))}

        <RightNav open={open}>
          <li>
            <Link to='/mypage'>회원 정보</Link>
          </li>
          <li>
            <Link to='/wishlist'>
              <HeartIcon style={{ width: '22px', height: '22px' }} />
            </Link>
          </li>
          <li>
            <Link to='/cart'>
              <CartButton>
                <span>0</span>
              </CartButton>
            </Link>
          </li>
          <li>
            <Link to='/search'>
              <SearchIcon />
            </Link>
          </li>
        </RightNav>
      </Nav>
    );
  } else {
    return (
      <Nav open={open}>
        {gnbmenu.map((nav) => (
          <li key={nav.id} onClick={() => dispatch(clickCategory(nav.id))}>
            <span>
              <Link to={nav.path}>{nav.name}</Link>
            </span>
          </li>
        ))}

        <RightNav open={open}>
          <li>
            <Link to='/login'>로그인</Link>
          </li>
          <li>
            <Link to='/wishlist'>
              <HeartIcon style={{ width: '22px', height: '22px' }} />
            </Link>
          </li>
          <li>
            <Link to='/cart'>
              <CartButton>
                <span>0</span>
              </CartButton>
            </Link>
          </li>
          <li>
            <Link to='/search'>
              <SearchIcon />
            </Link>
          </li>
        </RightNav>
      </Nav>
    );
  }
}

export default GnbMenu;
