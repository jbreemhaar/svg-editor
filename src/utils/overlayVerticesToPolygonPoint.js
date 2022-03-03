/**
 * vertice [x, y] to polygon points
 */
export default function overlayVerticesToPolygonPoint(vertices) {
  return vertices.map(({ x, y }) => [x, y].join(",")).join(" ");
}
