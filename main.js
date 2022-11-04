import Map from 'ol/Map';
import View from 'ol/View';
import './style.css';
import TileLayer from 'ol/layer/WebGLTile';
import Zoomify from 'ol/source/Zoomify';
import {Control, FullScreen } from 'ol/control';
import ImageLayer from 'ol/layer/Image';
import BaseLayer from 'ol/layer/Base';
import Raster from 'ol/source/Raster'
import { getCenter } from 'ol/extent';

const imgWidth = 5192;
const imgHeight = 6489;
const blue = [0, 255, 255, 1];

let extent = [0, 0, imgWidth, imgHeight];

let zoomifyUrlOne = 'assets/tiled_one/';
let zoomifyUrlTwo =  'assets/tiled_two/';

let zoomifyUrlThree =  'assets/tiled_three/';

let source = new Zoomify({
  className: "custom_zoomify",
  url: zoomifyUrlOne,
  size: [imgWidth, imgHeight],
  crossOrigin: 'anonymous',
  zDirection: -1,
});
let layer = new TileLayer({
  tileSize: 256,
  className: "custom_tile_layer",
  source: source,
});

const map = new Map({
  controls: [
    new FullScreen(),
    new Control({element: _buildInfoButton()})
  ],
  layers: [layer],
  target: 'map',
  view: new View({
    resolutions: layer.getSource().getTileGrid().getResolutions(),
    extent: extent,
    constrainOnlyCenter: true,
  }),
});
map.getView().fit(extent);


//this method is for debug buttons to swap layers while running in web
function _buildInfoButton() {
  let buttonOne = document.createElement('button');
  buttonOne.innerHTML = '<span>One</span>';
  buttonOne.id = 'layer-one-button';
  buttonOne.style = 'margin: 10px; color: white; padding-top: 2px; padding-bottom: 2px: padding-left: 5px; padding-right: 5px;'
  let buttonTwo = document.createElement('button');
  buttonTwo.innerHTML = '<span>Two</span>';
  buttonTwo.id = 'layer-two-button';
  buttonTwo.style="margin: 10px;";
  let buttonThree = document.createElement('button');
  buttonThree.innerHTML = '<span>Three</span>';
  buttonThree.id = 'layer-three-button';
  buttonThree.style="margin: 10px;";
  let zoomButton = document.createElement('button');
  zoomButton.innerHTML = '<span>Log Zoom</span>';
  zoomButton.id = 'layer-theee-button';
  zoomButton.style="margin: 10px;";

  let title = document.createElement('div');
  title.className = 'image-title-element';
  title.id = 'image-title-element';

  let element = document.createElement('div');
  element.id = 'button-container';
  element.appendChild(buttonOne);
  element.appendChild(buttonTwo);
  element.appendChild(buttonThree);
  element.appendChild(zoomButton);
  element.appendChild(title);

  buttonOne.addEventListener('click', () => {
    updateImageMap(zoomifyUrlOne);
  }, false);
  buttonTwo.addEventListener('click', () => {
   updateImageMap(zoomifyUrlTwo);
  }, false);
  buttonThree.addEventListener('click', () => {
    updateImageMap(zoomifyUrlThree);
  }, false);

  zoomButton.addEventListener('click', () => {
    console.log(map.getView().getZoom());
  }, false);

  return element;
}

function updateImageMap(url) {
  let curzoom = map.getView().getZoom();
  let source = new Zoomify({
      url: url,
      size: [imgWidth, imgHeight]
  });

  let layer = new TileLayer({
      source: source
  });
  let view = new View({
    resolutions: layer.getSource().getTileGrid().getResolutions(),
    constrainOnlyCenter: true,
    zoom: map.getView().getZoom(),
  });
  map.setView(view);
  map.getLayers().getArray()[0] = layer;
  map.getView().fit(extent);
  map.getView().setZoom(curzoom);
}