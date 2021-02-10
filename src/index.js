import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'leaflet/dist/leaflet.css';
import "video-react/dist/video-react.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { MyPlayer } from './components/video/Player';

ReactDOM.render(
  <MyPlayer />,
  document.getElementById('root')
);