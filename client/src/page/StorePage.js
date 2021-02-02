import React from 'react';
import StoreMap from '../components/StoreMap';

function Store() {
  return (
    <>
      <div>
        <h2>매장찾기</h2>
        <p>
          찾고자하는 위치를 선택하여 가장 가까운 젠틀몬스터 매장을 방문하세요.
        </p>
      </div>

      <StoreMap />
      {/* <StoreList /> */}
    </>
  );
}

export default Store;
