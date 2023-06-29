export const transparentEdge = {
  shape: "edge",
  attrs: {
    line: {
      stroke: "#515151",

      targetMarker: {
        tagName: "path",
        fill: "#c0c0c0", // 使用自定义填充色
        stroke: "#515151", // 使用自定义边框色
        strokeWidth: 2,
        d: "M 12 -7 0 0 12 7 Z",
      },
    },
  },
};
