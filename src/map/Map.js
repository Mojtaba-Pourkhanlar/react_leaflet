import React, { useState } from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import { FitBounds } from "../controls/fit_dataa_to_bounds";
import { citis } from "../data/citis";
import { continents } from "../data/continents";
import { mountains } from "../data/highest_points";
import { ContinentsPolygonLayer } from "../layers/continents_polygon_layer";
import { MarkerLayer } from "../layers/marker_layer";
import { MarkerLayerWidthYooltip } from "../layers/marker_layer_width_tooltip";
import { RadiusFilter } from "../layers/radius_filter";

const Map = () => {
  const [geoFilter, setGeoFilter] = useState(null);
  const [radiusFilter, setRadiusFilter] = useState(null);
  const getRadiusFilter = () => radiusFilter;
  const getGeoFilter = () => geoFilter;
  return (
    <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={true}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OSM Streets">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <MarkerLayer
          data={citis}
          setRadiusFilter={setRadiusFilter}
          getRadiusFilter={getRadiusFilter}
          getGeoFilter={getGeoFilter}
        />
        <MarkerLayerWidthYooltip data={mountains} />
        <RadiusFilter
          radiusFilter={radiusFilter}
          setRadiusFilter={setRadiusFilter}
        />
        <ContinentsPolygonLayer
          data={continents}
          getGeoFilter={getGeoFilter}
          setGeoFilter={setGeoFilter}
        />
      </LayersControl>
      <FitBounds />
    </MapContainer>
  );
};

export default Map;
