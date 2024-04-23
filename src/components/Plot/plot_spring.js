const math = {
  add: (a, b, c) => [a[0] + b[0] + c?.at(0) || 0, a[1] + b[1] + c?.at(1) || 0],
  subtract: (a, b) => [a[0] - b[0], a[1] - b[1]],
  multiply: (a, b) => [a[0] * b, a[1] * b],
  norm: (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1]),
  divide: (a, b) => [a[0] / b, a[1] / b],
};

export function draw_spring(points, strength = 1, rest = 1, drawoffset = 0) {
  let start_dist = 0.2;
  let start_dist1 = 0.1;
  let end_dist = 0.2;
  let end_dist1 = 0.1;

  let [start, end] = points;
  // difference vector
  let dist = math.subtract(end, start);

  let length = math.norm(dist);
  let offset = drawoffset;
  if (length < 0) offset = -drawoffset;
  // ignore 0 elements
  //if(math.norm(dist) === 0)
  // normalized normal vector
  let norm = math.divide([-dist[1], dist[0]], math.norm(dist));
  let tang = math.divide(dist, math.norm(dist));

  // pos with gather all points
  let pos = [start];
  pos.push(math.add(start, math.multiply(tang, start_dist1)));
  // add the start point with offset
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

  let rect = {
    x: start[0],
    width: math.norm(dist),
    y: offset - 0.2,
    height: 0.4,
  };
  let rect_start = {
    x: start[0],
    width: start_dist,
    y: offset - 0.2,
    height: 0.4,
  };
  let rect_end = {
    x: end[0] - end_dist,
    width: end_dist,
    y: offset - 0.2,
    height: 0.4,
  };

  // the count of the coil
  let count = parseInt(Math.abs(rest) / 0.1);
  // iterate over them
  if (strength !== 0) {
    for (let i = 0; i < count; i++) {
      // and add a point
      let p_dist = math.multiply(
        tang,
        start_dist +
          ((i + 0.5) / count) * (math.norm(dist) - start_dist - end_dist),
      );
      let p_norm = math.multiply(norm, ((i % 2) * 2 - 1) * 0.1);
      let p_offset = math.multiply(norm, offset);
      let p = math.add(start, p_dist, p_norm, p_offset);
      pos.push(p);
      //pos.push([start + dist * (i+0.5)/count + norm * ((i%2)*2-1) * 0.1 + norm * self.drawoffset])
    }
  }
  pos.push(
    math.add(
      start,
      math.multiply(tang, math.norm(dist) - end_dist),
      math.multiply(norm, offset),
    ),
  );
  // add the end point
  pos.push(
    math.add(end, math.multiply(tang, -end_dist1), math.multiply(norm, offset)),
  );
  //pos.push(math.add(end, math.multiply(tang, -end_dist1)));
  pos.push(end);
  // plot the spring
  //subplot.plot(pos[:, 0], pos[:, 1], 'g-')
  return {
    rect: rect,
    rect_start: rect_start,
    rect_end: rect_end,
    lines: [pos],
  };
}
