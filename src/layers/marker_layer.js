import { useState } from "react";
import L from "leaflet";
import { Button, Card, InputNumber, Space } from "antd";
import { LayersControl, LayerGroup, Marker, Popup } from "react-leaflet";
import { defaultIcon } from "../icons/defaultIcons";
import { FilterOutlined } from "@ant-design/icons";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

const DEFAULT_REDIUS = 3000;

const PopupStatistics = ({ feature, setRadiusFilter }) => {
  const [radius, setRadius] = useState(DEFAULT_REDIUS);
  const { name, adm0name, pop_max } = feature.properties;
  const mtStyle = {
    marginTop: "16px",
  };
  return (
    <>
      <Card type="inner" title="Name" style={mtStyle}>
        <b>{`${name} , ${adm0name} `}</b>
      </Card>
      <Card type="inner" title="Population" style={mtStyle}>
        <b>{`${pop_max} `}</b>
      </Card>
      <Card type="inner" title="Radius Filter" style={mtStyle}>
        <Space>
          <InputNumber
            defaultValue={radius}
            min={0}
            onChange={(e) => setRadius(e)}
          ></InputNumber>
          <Button
            type="primary"
            shape="round"
            icon={<FilterOutlined />}
            onClick={() =>
              setRadiusFilter((prevState) => {
                let newFilter;
                if (prevState) {
                  if (radius === 0) {
                    newFilter = prevState;
                  } else {
                    const sameFeature = prevState.feature === feature;
                    const sameRadius = prevState.radius === radius;

                    if (!sameFeature || !sameRadius) {
                      newFilter = { feature, radius };
                    }
                  }
                } else if (radius !== 0) {
                  newFilter = { feature, radius };
                }
                return newFilter;
              })
            }
          >
            Filter by km
          </Button>
        </Space>
      </Card>
    </>
  );
};

export const MarkerLayer = ({
  data,
  setRadiusFilter,
  getRadiusFilter,
  getGeoFilter,
}) => {
  const radiusFilter = getRadiusFilter();
  const geoFilter = getGeoFilter();

  let centerPoint;
  if (radiusFilter) {
    const { coordinates } = radiusFilter.feature.geometry;
    centerPoint = L.latLng(coordinates[1], coordinates[0]);
  }

  const layer = data.features
    .filter((currentFeature) => {
      let filterByRadius;
      let filterByGeo;

      if (centerPoint) {
        const { coordinates } = currentFeature.geometry;
        const currentPoint = L.latLng(coordinates[1], coordinates[0]);
        filterByRadius =
          centerPoint.distanceTo(currentPoint) / 1000 < radiusFilter.radius;
      }
      if (geoFilter) {
        filterByGeo = booleanPointInPolygon(currentFeature, geoFilter);
      }

      let doFilter = true;

      if (geoFilter && radiusFilter) {
        doFilter = filterByGeo && filterByRadius;
      } else if (geoFilter && !radiusFilter) {
        doFilter = filterByGeo;
      } else if (radiusFilter && !geoFilter) {
        doFilter = filterByRadius;
      }
      return doFilter;
    })
    .map((feature) => {
      const { coordinates } = feature.geometry;
      return (
        <Marker
          key={String(coordinates)}
          position={[coordinates[1], coordinates[0]]}
          icon={defaultIcon}
        >
          <Popup>
            <PopupStatistics
              feature={feature}
              setRadiusFilter={setRadiusFilter}
            />
          </Popup>
        </Marker>
      );
    });
  return (
    <LayersControl.Overlay checked name="World Cities">
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
};
