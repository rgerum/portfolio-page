import { draw_spring } from "@/components/Plot/plot_spring";

function PointsToPath(points) {
  return "M" + points.map(([x, y]) => `${x},${y}`).join("L");
}

export function CanvasSprings({ children }) {
  return (
    <svg width={150} height={150} viewBox={"-0.5 -1.5 3 3"}>
      {children}
    </svg>
  );
}

export function Spring({ start, end }) {
  const data = draw_spring([start, end]);
  return (
    <>
      <path
        d={PointsToPath(data.lines[0])}
        fill="none"
        stroke="red"
        strokeWidth={0.05}
      />
      <circle cx={start[0]} cy={start[1]} r="0.1" fill="red" />
      <circle
        cx={end[0]}
        cy={end[1]}
        r="0.1"
        fill="white"
        stroke={"red"}
        strokeWidth={0.05}
      />
    </>
  );
}
