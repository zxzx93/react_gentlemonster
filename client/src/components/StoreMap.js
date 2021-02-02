import React, { useState, useEffect } from 'react';
import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  FlyToInterpolator,
} from 'react-map-gl';
//import 'mapbox-gl/dist/mapbox-gl.css';
//import './App.css';

const storeList = [
  { name: 'CU', location: [37.565964, 126.986574] },
  { name: '할리스', location: [37.564431, 126.986591] },
  { name: '세븐일레븐', location: [37.565188, 126.983238] },
  { name: '파리바게트', location: [37.564869, 126.98445] },
  { name: '스타벅스', location: [37.562003, 126.985829] },
];

const Mapbox = () => {
  const MAP_TOKEN =
    'pk.eyJ1IjoieWVvbnN1IiwiYSI6ImNrY2Rrd2pwczAwbTIycXFzZW5zZnZ3aGUifQ.XadvWOBALjQm6lUb4pcrmw';

  const [viewport, setViewport] = useState({
    latitude: 37.5326,
    longitude: 127.024612,
    //width: 800,
    // height: 800,
    zoom: 0,
    bearing: 0,
    pitch: 0,
  });

  return (
    <div className='Mapbox'>
      <MapGL
        style={{
          margin: '0 auto',
          borderRadius: '20px',
          borderCollapse: 'collapsed',
        }}
        {...viewport}
        width='95vw'
        height='60vh'
        mapboxApiAccessToken={MAP_TOKEN}
        transitionDuration={800}
        transitionInterpolator={new FlyToInterpolator()}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <div
          className='navi-control'
          style={{ position: 'absolute', right: 0, top: 10 }}
        >
          <NavigationControl />
        </div>

        {storeList.map((store, i) => (
          <Marker
            key={i}
            latitude={store.location[0]}
            longitude={store.location[1]}
          >
            <button className='btn-marker' />
          </Marker>
        ))}
      </MapGL>
    </div>
  );
};
export default Mapbox;
