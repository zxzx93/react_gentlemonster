import React, { useRef, useState } from 'react';
import qs from 'qs';

function Shop(props) {
  const ref = useRef('');
  const [scrollTop, setscrollTop] = useState(0);
  // const { match, history, location } = props;

  // const query = qs.parse(props.location.search, {
  //   ignoreQueryPrefix: true, // ?제거
  // });

  // console.log(query);

  // console.log('location.pathname:', location.pathname);
  // console.log('match.params:', match.params);
  // console.log('match.url:', match.url);

  const onScroll = () => {
    const scrollY = window.scrollY;
    const scrollTop = ref.current.scrollTop;
    console.log(
      `onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${scrollTop}`,
    );
    setscrollTop(scrollTop);
  };

  return (
    <div
      ref={ref}
      onScroll={onScroll}
      style={{
        border: '1px solid black',
        width: '600px',
        height: '100px',
        overflow: 'scroll',
      }}
    >
      <p>
        This demonstrates how to get the scrollTop position within a scrollable
        react component.
      </p>
      <p>ScrollTop is {scrollTop}</p>
      <p>
        This demonstrates how to get the scrollTop position within a scrollable
        react component.
      </p>
      <p>ScrollTop is {scrollTop}</p>
    </div>
  );
}

export default Shop;
