"use client";
import React, { useEffect } from "react";
import styles from "./Plot.module.css";
import { useAnimationFrame, useMotionValue, useSpring } from "framer-motion";

const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

function YAxis({ label, lim, ticks, height, decimalPlaces }) {
  function pos_to_percentage(pos) {
    return 100 - ((pos - lim[0]) / (lim[1] - lim[0])) * 100;
  }
  return (
    <div className={styles.yaxes_wrapper} style={{ height: height }}>
      <div className={styles.yaxes}>
        {ticks.map((i) => (
          <YTick key={i} className={styles.ytick} pos={pos_to_percentage(i)}>
            {i.toFixed(decimalPlaces)}
          </YTick>
        ))}
      </div>
      <div className={styles.yaxes_label}>{label}</div>
    </div>
  );
}

function XAxis({ label, lim, ticks, width, decimalPlaces }) {
  function pos_to_percentage(pos) {
    return ((pos - lim[0]) / (lim[1] - lim[0])) * 100;
  }
  return (
    <div className={styles.xaxes_wrapper} style={{ width: width }}>
      <div className={styles.xaxes}>
        {ticks.map((i) => (
          <XTick key={i} className={styles.xtick} pos={pos_to_percentage(i)}>
            {i.toFixed(decimalPlaces)}
          </XTick>
        ))}
      </div>
      <div className={styles.xaxes_label}>{label}</div>
    </div>
  );
}

function useEffectDamping(end) {
  const [value, setValue] = React.useState(end);
  const dampingFactor = 0.05; // Adjust this value to change the damping effect

  React.useEffect(() => {
    const delta = end - value;
    if (Math.abs(delta) < 0.01) return;
    const interval = setInterval(() => {
      // Calculate the next value by moving a small fraction of the distance towards the end value
      setValue((prevValue) => {
        const delta = end - prevValue;
        return Math.abs(delta) < 0.01 ? end : prevValue + delta * dampingFactor;
      });
    }, 16); // Approximately 60 FPS

    // Clear the interval when the component is unmounted or the value reaches the end
    return () => clearInterval(interval);
  }, [value, end]);
  return value;
}

function Plot({
  xlim = [-1, 3],
  ylim = [0, 1.1],
  xlabel = "time (s)",
  ylabel = "time (s)",
  height = 100,
  width = 200,
  title,
  content,
}) {
  ylim = [ylim[0], useEffectDamping(ylim[1])];
  const { ticks: xticks, decimalPlaces: decimalPlacesX } =
    calculateTicksAndPrecision(xlim[0], xlim[1]);
  const { ticks: yticks, decimalPlaces: decimalPlacesY } =
    calculateTicksAndPrecision(ylim[0], ylim[1], 4);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <YAxis
        label={ylabel}
        lim={ylim}
        ticks={yticks}
        height={height}
        decimalPlaces={decimalPlacesY}
      />
      <XAxis
        label={xlabel}
        lim={xlim}
        ticks={xticks}
        width={width}
        decimalPlaces={decimalPlacesX}
      />
      <Canvas xlim={xlim} ylim={ylim} height={height} width={width}>
        {content.map((i) => (
          <Content
            entry={i}
            xlim={xlim}
            ylim={ylim}
            height={height}
            width={width}
          />
        ))}
      </Canvas>
    </div>
  );
}

function Content({ entry, xlim, ylim, width, height }) {
  if (entry.type === "line") {
    return (
      <path
        d={PointsToPath(entry.data, xlim, ylim, width, height)}
        fill="none"
        strokeWidth={2}
        stroke={entry.color}
      />
    );
  }
  if (entry.type === "scatter") {
    return (
      <>
        {entry.data.map((i) => (
          <circle
            cx={MapPointX(i[0], xlim, width)}
            cy={MapPointY(i[1], ylim, height)}
            r="5"
            fill={entry.color}
          />
        ))}
      </>
    );
  }
  return <div>unknown</div>;
}

function MapPointX(x, xlim, width) {
  return ((x - xlim[0]) / (xlim[1] - xlim[0])) * width;
}
function MapPointY(y, ylim, height) {
  return ((y - ylim[1]) / (ylim[0] - ylim[1])) * height;
}

function PointsToPath(points, xlim, ylim, width, height) {
  function map_y(y) {
    return ((y - ylim[1]) / (ylim[0] - ylim[1])) * height;
  }

  function map_x(x) {
    return ((x - xlim[0]) / (xlim[1] - xlim[0])) * width;
  }

  return "M" + points.map(([x, y]) => `${map_x(x)},${map_y(y)}`).join("L");
}

function Canvas({ xlim, ylim, height, width, children }) {
  return (
    <svg
      className={styles.plot}
      height={height}
      width={width}
      viewBox={`0 0 ${width} ${height}`}
    >
      {children}
    </svg>
  );
}

function XTick({ pos, children }) {
  return (
    <div className={styles.xtick_wrapper} style={{ "--pos": pos + "%" }}>
      <span className={styles.xtick}>{children}</span>
    </div>
  );
}

function YTick({ pos, children }) {
  return (
    <div className={styles.ytick_wrapper} style={{ "--pos": pos + "%" }}>
      <span className={styles.ytick}>{children}</span>
    </div>
  );
}

function calculateTicksAndPrecision(minVal, maxVal, maxTicks = 5) {
  // Determine the approximate range and ideal step
  const rangeVal = maxVal - minVal;
  const roughStep = rangeVal / (maxTicks - 1);

  // Calculate a 'nice' step size based on the rough step
  const exponent = Math.floor(Math.log10(roughStep)); // Find exponent of 10
  const fractional = roughStep / Math.pow(10, exponent); // Normalize to fractional part 1-10

  // Define nice steps (e.g., 1, 2, 5, 10)
  let niceStep;
  if (fractional < 1.5) {
    niceStep = 1;
  } else if (fractional < 3) {
    niceStep = 2;
  } else if (fractional < 7) {
    niceStep = 5;
  } else {
    niceStep = 10;
  }

  niceStep *= Math.pow(10, exponent); // Scale back to the original range of steps

  // Determine the number of decimal places based on the nice step
  const decimalPlaces = niceStep < 1 ? Math.abs(exponent) : 0;

  // Define tick positions
  const tickStart = Math.floor(minVal / niceStep) * niceStep;
  const tickEnd = Math.ceil(maxVal / niceStep) * niceStep;

  // Generate ticks
  const numTicks = Math.round((tickEnd - tickStart) / niceStep + 1);
  const ticks = [];
  for (let i = 0; i < numTicks; i++) {
    ticks.push(tickStart + i * niceStep);
  }

  // Ensure ticks within the bounds
  const filteredTicks = ticks.filter(
    (tick) => minVal <= tick && tick <= maxVal,
  );

  return { ticks: filteredTicks, decimalPlaces: decimalPlaces };
}

export default Plot;
