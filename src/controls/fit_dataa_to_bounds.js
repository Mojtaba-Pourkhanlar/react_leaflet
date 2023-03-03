// import ReactDOM from "react-dom";
// import { Button } from "antd";
import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil } from "leaflet";
// import { BorderOuterOutlined } from "@ant-design/icons";

const node = DomUtil.create("div");

Control.FitBounds = Control.extend({
  Option: {
    position: "topleft",
  },
  onAdd: function (map) {
    // ReactDOM.render(
    //   <Button
    //     title="Fit bounds to world"
    //     icon={<BorderOuterOutlined />}
    //     onClick={() => map.fitWorld()}
    //   ></Button>,
    //   node
    // );
    return node;
  },
  onRemove: function (map) {},
});

export const FitBounds = createControlComponent(
  (props) => new Control.FitBounds(props)
);
