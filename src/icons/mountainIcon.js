import L from "leaflet";
import mountainsSVG from "../images/mountains.svg";

const LeafIcon = L.Icon.extend({
  options: {
    iconSize: [35, 23],
    iconAnchor: [17, 16],
    tooltipAnchor: [15, -5],
  },
});

export const mountainIcon = new LeafIcon({
  iconUrl: mountainsSVG,
});
