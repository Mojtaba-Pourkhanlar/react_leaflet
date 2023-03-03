import {
  LayerGroup,
  LayersControl,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import { mountainIcon } from "../icons/mountainIcon";

export const MarkerLayerWidthYooltip = ({ data }) => {
  const leafletMap = useMap();
  const layer = data.features.map((feature) => {
    const { coordinates } = feature.geometry;
    const { name, elevatios, continent } = feature.properties;
    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={mountainIcon}
        eventHandlers={{
          click: (e) => leafletMap.panTo(e.latlng),
        }}
      >
        <Tooltip>
          <h3>MT . {name}</h3>
          Continent : <b>{continent} </b> <br />
          Elevatios : <b>{elevatios} m</b>
        </Tooltip>
      </Marker>
    );
  });
  return (
    <LayersControl.Overlay checked name="World Marker Layer Width Tooltip">
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
};
