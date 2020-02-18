//import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';

// import {toPng} from 'html-to-image';

var map = new Map({
  layers: [
    // new TileLayer({
    //   source: new OSM()
    // }),
    new VectorLayer({
      source: new VectorSource({
        url: 'data/geojson/countries.geojson',
        format: new GeoJSON()
      })
    })
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

map.addOverlay(new Overlay({
  position: [0, 0],
  element: document.getElementById('null')
}));
