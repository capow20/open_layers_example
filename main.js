import ImageLayer from 'ol/layer/Image';
import Map from 'ol/Map';
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic';
import View from 'ol/View';
import {getCenter} from 'ol/extent';
import './style.css'
import MousePosition from 'ol/control/MousePosition';
import * as coordinate from 'ol/coordinate';

// Map views always need a projection.  Here we just want to map image
// coordinates directly to map coordinates, so we create a projection that uses
// the image extent in pixels.
const extent = [0, 0, 1024, 968];
const projection = new Projection({
  code: 'xkcd-image',
  units: 'pixels',
  extent: extent,
});
var currZoom = 1;
const secondExtent = [(extent[0] + extent[2] / 4),(extent[0] + extent[3] / 4),(extent[2] - extent[2] / 4),(extent[3] - extent[3] / 4)];
const thirdExtent = [(secondExtent[0] + secondExtent[2] / 4),(secondExtent[0] + secondExtent[3] / 4),(secondExtent[2] - secondExtent[2] / 4),(secondExtent[3] - secondExtent[3] / 4)];

const map = new Map({
  layers: [
    new ImageLayer({
      source: new Static({
        attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
        url: 'assets/three.png',
        projection: new Projection({
          units: 'pixels',
          extent: thirdExtent,
        }),
        imageExtent: thirdExtent,
      }),
    }),
    new ImageLayer({
      source: new Static({
        attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
        url: 'assets/two.jpg',
        projection: new Projection({
          units: 'pixels',
          extent: secondExtent,
        }),
        imageExtent: secondExtent,
      }),
      maxZoom: 3
    }),
    new ImageLayer({
      source: new Static({
        attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
        url: 'assets/one.png',
        projection: projection,
        imageExtent: extent,
      }),
      maxZoom: 2,
    }),
  ],
  target: 'map',
  view: new View({
    projection: projection,
    center: getCenter(extent),
    zoom: 1,
    extent: [extent[0] - 100, extent[1] - 100, extent[2] + 100, extent[3] + 100],
  }),
});

map.on('moveend', function(e) {
  var newZoom = map.getView().getZoom();
  if(newZoom > 2 && currZoom < 2){
    map.setView(new View({
      extent: [secondExtent[0] - 100, secondExtent[1] - 100, secondExtent[2] + 100, secondExtent[3] + 100],
      center: getCenter(secondExtent),
      projection: new Projection({
        units: 'pixels',
        extent: [secondExtent[0] - 100, secondExtent[1] - 100, secondExtent[2] + 100, secondExtent[3] + 100],
      }),
      zoom: 2.01
    }));
  }else if(newZoom > 3 && currZoom < 3){
    map.setView(new View({
      extent: [thirdExtent[0] - 100, thirdExtent[1] - 100, thirdExtent[2] + 100, thirdExtent[3] + 100],
      center: getCenter(thirdExtent),
      projection: new Projection({
        units: 'pixels',
        extent: [thirdExtent[0] - 100, thirdExtent[1] - 100, thirdExtent[2] + 100, thirdExtent[3] + 100],
      }),
      zoom: 3.01,
      maxZoom: 4
    }));
  }

  currZoom = newZoom;
});