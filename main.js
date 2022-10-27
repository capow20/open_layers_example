import ImageLayer from 'ol/layer/Image';
import Map from 'ol/Map';
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic';
import View from 'ol/View';
import {getCenter} from 'ol/extent';
import './style.css'

// Map views always need a projection.  Here we just want to map image
// coordinates directly to map coordinates, so we create a projection that uses
// the image extent in pixels.
const extent = [0, 0, 1024, 968];
const projection = new Projection({
  code: 'xkcd-image',
  units: 'pixels',
  extent: extent,
});

const map = new Map({
  layers: [
    new ImageLayer({
      source: new Static({
        attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
        url: 'assets/three.png',
        projection: new Projection({
          units: 'pixels',
          extent: [0,0, extent[2] / 6, extent[3] / 6],
        }),
        imageExtent: [0,0, extent[2] / 6, extent[3] / 6],
      }),
    }),
    new ImageLayer({
      source: new Static({
        attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
        url: 'assets/two.jpg',
        projection: new Projection({
          units: 'pixels',
          extent: [0,0, extent[2] / 2, extent[3] / 2],
        }),
        imageExtent: [0,0, extent[2] / 2, extent[3] / 2],
      }),
      maxZoom: 5
    }),
    new ImageLayer({
      source: new Static({
        attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
        url: 'assets/one.png',
        projection: projection,
        imageExtent: extent,
      }),
      maxZoom: 3,
    }),
  ],
  target: 'map',
  view: new View({
    projection: projection,
    center: getCenter(extent),
    zoom: 2,
    maxZoom: 8,
  }),
});
