import { Ref } from 'vue';
import Feature from 'ol/Feature';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import { Icon, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import 'ol/ol.css';

import { Coordinates } from '@/models/randomUser/User';

export default function useMapOpenLayers(coordinates: Coordinates, mapRoot: Ref<HTMLElement | undefined>) {
  const innitMap = () => {
    let place = [parseFloat(coordinates.longitude), parseFloat(coordinates.latitude)];
    const point = new Point(place).transform('EPSG:4326', 'EPSG:3857');

    // openlayers openlayers coordinates
    place = point.getClosestPoint(place);

    const iconFeature = new Feature({
      geometry: point,
      name: 'Null Island',
      population: 4000,
      rainfall: 500,
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 26],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.PIXELS,
        src: 'http://dev.openlayers.org/img/marker.png',
      }),
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const rasterLayer = new TileLayer({
      source: new OSM(),

    });

    const target = mapRoot.value;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const map = new Map({
      layers: [rasterLayer, vectorLayer],

      target,
      view: new View({
        center: place,
        zoom: 3,
      }),
    });
  };
  return { innitMap };
}
