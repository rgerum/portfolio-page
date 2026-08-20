import type { Point } from "./types";

interface Rect {
  x: number;
  width: number;
  y: number;
  height: number;
}

interface SpringDrawing {
  rect: Rect;
  rect_start: Rect;
  rect_end: Rect;
  lines: Point[][];
}

const math = {
  add: (...vectors: Point[]): Point =>
    vectors.reduce<Point>(
      (acc, vector) => [acc[0] + vector[0], acc[1] + vector[1]],
      [0, 0],
    ),
  subtract: (a: Point, b: Point): Point => [a[0] - b[0], a[1] - b[1]],
  multiply: (a: Point, b: number): Point => [a[0] * b, a[1] * b],
  norm: (a: Point): number => Math.sqrt(a[0] * a[0] + a[1] * a[1]),
  divide: (a: Point, b: number): Point => [a[0] / b, a[1] / b],
};

export function draw_spring(
  points: [Point, Point],
  strength = 1,
  rest = 1,
  drawoffset = 0,
): SpringDrawing {
  const start_dist = 0.2;
  const start_dist1 = 0.1;
  const end_dist = 0.2;
  const end_dist1 = 0.1;

  const [start, end] = points;
  // difference vector
  const dist = math.subtract(end, start);

  const length = math.norm(dist);
  let offset = drawoffset;
  if (length < 0) offset = -drawoffset;
  const distanceNorm = math.norm(dist);
  if (distanceNorm === 0) {
    return {
      rect: { x: start[0], width: 0, y: offset - 0.2, height: 0.4 },
      rect_start: { x: start[0], width: start_dist, y: offset - 0.2, height: 0.4 },
      rect_end: { x: end[0] - end_dist, width: end_dist, y: offset - 0.2, height: 0.4 },
      lines: [[start, end]],
    };
  }

  const norm = math.divide([-dist[1], dist[0]], distanceNorm);
  const tang = math.divide(dist, distanceNorm);

  const pos: Point[] = [start];
  pos.push(math.add(start, math.multiply(tang, start_dist1)));
  pos.push(
    math.add(
      start,
      math.multiply(tang, start_dist1),
      math.multiply(norm, offset),
    ),
  );
  pos.push(
    math.add(
      start,
      math.multiply(tang, start_dist),
      math.multiply(norm, offset),
    ),
  );

  const rect = {
    x: start[0],
    width: math.norm(dist),
    y: offset - 0.2,
    height: 0.4,
  };
  const rect_start = {
    x: start[0],
    width: start_dist,
    y: offset - 0.2,
    height: 0.4,
  };
  const rect_end = {
    x: end[0] - end_dist,
    width: end_dist,
    y: offset - 0.2,
    height: 0.4,
  };

  const count = Math.trunc(Math.abs(rest) / 0.1);
  if (strength !== 0) {
    for (let i = 0; i < count; i++) {
      const p_dist = math.multiply(
        tang,
        start_dist +
          ((i + 0.5) / count) * (math.norm(dist) - start_dist - end_dist),
      );
      const p_norm = math.multiply(norm, ((i % 2) * 2 - 1) * 0.1);
      const p_offset = math.multiply(norm, offset);
      const p = math.add(start, p_dist, p_norm, p_offset);
      pos.push(p);
    }
  }
  pos.push(
    math.add(
      start,
      math.multiply(tang, math.norm(dist) - end_dist),
      math.multiply(norm, offset),
    ),
  );
  pos.push(
    math.add(end, math.multiply(tang, -end_dist1), math.multiply(norm, offset)),
  );
  pos.push(end);
  return {
    rect,
    rect_start,
    rect_end,
    lines: [pos],
  };
}
