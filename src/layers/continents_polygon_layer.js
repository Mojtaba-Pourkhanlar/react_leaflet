import { GeoJSON, LayerGroup, LayersControl } from "react-leaflet";

export const ContinentsPolygonLayer = ({
  data,
  setGeoFilter,
  getGeoFilter,
}) => {
  const geoFilter = getGeoFilter();
  const layer = (
    <GeoJSON
      key={"geo-json-layer"}
      data={data}
      eventHandlers={{
        click: (e) =>
          setGeoFilter((prevState) => {
            const same = prevState === e.propagatedFrom.feature;
            return same ? null : e.propagatedFrom.feature;
          }),
      }}
      style={(feature) => {
        return {
          color: geoFilter === feature ? "red" : "green",
          weight: 0.5,
          fillOpacity: 0.4,
        };
      }}
    ></GeoJSON>
  );

  return (
    <LayersControl.Overlay checked name="World Continents">
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
};
