/**
 * @module examples.main
 */
import OLCesium from 'olcs/OLCesium.js';
import {transform, get as getProjection} from 'ol/proj.js';
import {getWidth, getTopLeft} from 'ol/extent.js';
import olView from 'ol/View.js';
import {defaults as olControlDefaults} from 'ol/control.js';
import olSourceOSM from 'ol/source/OSM.js';
import WMTS from 'ol/source/WMTS.js';
import WMTSTileGrid from 'ol/tilegrid/WMTS.js';
import olSource from 'ol/source/Source.js';
import olBingMaps from 'ol/source/BingMaps.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayer from 'ol/layer/Layer.js';
import olMap from 'ol/Map.js';
import XYZ from 'ol/source/XYZ';



import Vector  from 'ol/source/Vector.js';
import VectorLayer  from 'ol/layer/Vector.js';
import {OSM, Vector as VectorSource} from 'ol/source';

import point from 'ol/geom/Point';


import GeoJSON from 'ol/format/GeoJSON.js'; //GeoJson 형식
import { Image, Style, Stroke, Fill, Text } from 'ol/style.js';  //데이터를 그릴 스타일들

let setZoomLevel = 5;
let setGridLayerNumber = 20;
const projection = getProjection('EPSG:3857');
const projectionExtent = projection.getExtent();
const size = getWidth(projectionExtent) / 256;
const resolutions = new Array(setGridLayerNumber);
const matrixIds = new Array(setGridLayerNumber);
for (let z = 0; z < setGridLayerNumber; ++z) {
  // generate resolutions and matrixIds arrays for this WMTS
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = z;
}

//Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OWJhYzAwOS0zNjU1LTQyMzUtYWU3NC01MzQ3MzU0OWRhYzIiLCJpZCI6MjE4NjUsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODA3OTc3NzR9._OBsP4wgClKcu7UJquyGI54TPPxAxZ_GfCgJVvNrDkU';
//Cesium.Ion.test = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OWJhYzAwOS0zNjU1LTQyMzUtYWU3NC01MzQ3MzU0OWRhYzIiLCJpZCI6MjE4NjUsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODA3OTc3NzR9._OBsP4wgClKcu7UJquyGI54TPPxAxZ_GfCgJVvNrDkU';
const ol2d = new olMap({
  layers: [
    // new olLayerTile({
    //   source: new olSourceOSM()
    // }),
    new olLayerTile({
      preload: Infinity,
      source: new olBingMaps({
        key: 'AoeCdU4h3ZRXM_PCi0MG-VPHio5C-Q5rihor2APppSXuvF3W7BtOgrcRI2gDTGHr',
        imagerySet: 'AerialWithLabelsOnDemand',
        culture: 'ko-KR'
      })
    }),

    // new VectorLayer({
    //   source: new VectorSource({
    //     url: 'data/geojson/countries.geojson',
    //     format: new GeoJSON()
    //   })
    // }),

    // new olLayerTile({
    //   preload: Infinity,
    //   source: new WMTS({
    //     url: 'http://apps.ecmwf.int/wms/',
    //     params: {'layers': 'composition_aod550', 'token':'public'},
    //     serverType: 'geoserver',
    //     projection: 'EPSG:4326'
    //   })
    // }),

    // new VectorLayer({
    //   source : new Vector({  //백터
    //     title: 'added Layer',
    //     format: new GeoJSON(),  //형식
    //     projection : 'EPSG:3857',
    //     url: 'data/geojson/earth-topo.json'
    //   }),
    //   style: (feature, resolution)=>{
    //     let name = feature.values_.adm_nm;
    //     return new Style({
    //       stroke: new Stroke({
    //           color: '#5c68ff',
    //           width: 1
    //       })
    //     })
    //   }
    // }),

    new olLayerTile({
      opacity: 1,
      source: new XYZ({
        url: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=505524f3d1d8d525b5722f3f8cf37322',
        layer: 'temp',
        matrixSet: 'EPSG:3857',
        format: 'image/png',
        projection: projection,
        tileGrid: new WMTSTileGrid({
          origin: getTopLeft(projectionExtent),
          resolutions: resolutions,
          matrixIds: matrixIds
        }),
        style: 'default',
        wrapX: true
      }),
    })
  ],
  controls: olControlDefaults({
    attributionOptions: {
      collapsible: true
    }
  }),
  target: 'map',
  view: new olView({
    center: transform([127, 37], 'EPSG:4326', 'EPSG:3857'),
    zoom: setZoomLevel
  }),
});

// const timeElt = document.getElementById('time');
const ol3d = new OLCesium({
  map: ol2d,
  time: function() {
    //const val = timeElt.value;
    // if (ol3d.getCesiumScene().globe.enableLighting && val) {
    //   const d = new Date();
    //   d.setUTCHours(val);
    //   return Cesium.JulianDate.fromDate(d);
    // }
    ol3d.getCesiumScene().globe.enableLighting = true;
    return Cesium.JulianDate.now();
  }
});
//const scene = ol3d.getCesiumScene();
//scene.terrainProvider = Cesium.createWorldTerrain();
ol3d.setEnabled(true);


// timeElt.style.display = 'none';

// document.getElementById('enable').addEventListener('click', () => ol3d.setEnabled(!ol3d.getEnabled()));
// window['toggleTime'] = function() {
//   scene.globe.enableLighting = !scene.globe.enableLighting;
//   if (timeElt.style.display == 'none') {
//     timeElt.style.display = 'inline-block';
//   } else {
//     timeElt.style.display = 'none';
//   }
// };

var loading = true;
var step = 0;

// function showLoading() {
//   var canvas = document.getElementById('display');
//   if (canvas) {
//     var g = canvas.getContext('2d');
//     var w = canvas.width;
//     var h = canvas.height;
//     g.fillStyle = 'rgba(255, 255, 255)';
//     g.fillRect(0, 0, w, h);
//     step++;
//     var alpha = .3 + (1 + Math.sin(step * .3)) / 3;
//     g.fillStyle = 'rgba(255, 255, 255, '  + alpha + ')';
//     g.textAlign = 'center';
//     g.font = '14pt Verdana';
//     g.fillText('LOADING', 450, 300);
//   }
//   if (loading) {
//     //setTimeout(showLoading, 3000);
//   }
// }

// showLoading();
