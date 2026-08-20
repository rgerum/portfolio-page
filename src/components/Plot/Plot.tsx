"use client";
import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./Plot.module.css";
import type { PlotEntry, PlotRange, Point } from "./types";

interface TickAxisProps {
  label: string;
  lim: PlotRange;
  ticks: number[];
  decimalPlaces: number;
}

interface YAxisProps extends TickAxisProps {
  height: number;
}

interface XAxisProps extends TickAxisProps {
  width: number;
}

interface PlotProps {
  xlim?: PlotRange;
  ylim?: PlotRange;
  xlabel?: string;
  ylabel?: string;
  height?: number;
  width?: number;
  title?: string;
  content: PlotEntry[];
}

interface ContentProps {
  entry: PlotEntry;
  xlim: PlotRange;
  ylim: PlotRange;
  width: number;
  height: number;
}

interface CanvasProps {
  height: number;
  width: number;
  children: ReactNode;
}

function YAxis({ label, lim, ticks, height, decimalPlaces }: YAxisProps) {
  function posToPercentage(pos: number): number {
    return 100 - ((pos - lim[0]) / (lim[1] - lim[0])) * 100;
  }

  return (
    <div className={styles.yaxes_wrapper} style={{ height }}>
      <div className={styles.yaxes}>
        {ticks.map((i) => (
          <YTick key={i} pos={posToPercentage(i)}>
            {i.toFixed(decimalPlaces)}
          </YTick>
        ))}
      </div>
      <div className={styles.yaxes_label}>{label}</div>
    </div>
  );
}

function XAxis({ label, lim, ticks, width, decimalPlaces }: XAxisProps) {
  function posToPercentage(pos: number): number {
    return ((pos - lim[0]) / (lim[1] - lim[0])) * 100;
  }

  return (
    <div className={styles.xaxes_wrapper} style={{ width }}>
      <div className={styles.xaxes}>
        {ticks.map((i) => (
          <XTick key={i} pos={posToPercentage(i)}>
            {i.toFixed(decimalPlaces)}
          </XTick>
        ))}
      </div>
      <div className={styles.xaxes_label}>{label}</div>
    </div>
  );
}

function useEffectDamping(end: number): number {
  const [value, setValue] = useState(end);
  const dampingFactor = 0.05;

  useEffect(() => {
    const delta = end - value;
    if (Math.abs(delta) < 0.01) return;
    const interval = setInterval(() => {
      setValue((prevValue) => {
        const delta = end - prevValue;
        return Math.abs(delta) < 0.01 ? end : prevValue + delta * dampingFactor;
      });
    }, 16);

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
}: PlotProps) {
  const animatedYLim: PlotRange = [ylim[0], useEffectDamping(ylim[1])];
  const { ticks: xticks, decimalPlaces: decimalPlacesX } =
    calculateTicksAndPrecision(xlim[0], xlim[1]);
  const { ticks: yticks, decimalPlaces: decimalPlacesY } =
    calculateTicksAndPrecision(animatedYLim[0], animatedYLim[1], 4);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <YAxis
        label={ylabel}
        lim={animatedYLim}
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
      <Canvas height={height} width={width}>
        {content.map((i, index) => (
          <Content
            key={`${i.type}-${index}`}
            entry={i}
            xlim={xlim}
            ylim={animatedYLim}
            height={height}
            width={width}
          />
        ))}
      </Canvas>
    </div>
  );
}

function Content({ entry, xlim, ylim, width, height }: ContentProps) {
  if (entry.type === "line") {
    return (
      <path
        d={pointsToPath(entry.data, xlim, ylim, width, height)}
        fill="none"
        strokeWidth={2}
        stroke={entry.color}
      />
    );
  }
  if (entry.type === "scatter") {
    return (
      <>
        {entry.data.map((i, index) => (
          <circle
            key={`${i[0]}-${i[1]}-${index}`}
            cx={mapPointX(i[0], xlim, width)}
            cy={mapPointY(i[1], ylim, height)}
            r="5"
            fill={entry.color}
          />
        ))}
      </>
    );
  }
  return null;
}

function mapPointX(x: number, xlim: PlotRange, width: number): number {
  return ((x - xlim[0]) / (xlim[1] - xlim[0])) * width;
}

function mapPointY(y: number, ylim: PlotRange, height: number): number {
  return ((y - ylim[1]) / (ylim[0] - ylim[1])) * height;
}

function pointsToPath(
  points: Point[],
  xlim: PlotRange,
  ylim: PlotRange,
  width: number,
  height: number,
): string {
  function mapY(y: number): number {
    return ((y - ylim[1]) / (ylim[0] - ylim[1])) * height;
  }

  function mapX(x: number): number {
    return ((x - xlim[0]) / (xlim[1] - xlim[0])) * width;
  }

  return "M" + points.map(([x, y]) => `${mapX(x)},${mapY(y)}`).join("L");
}

function Canvas({ height, width, children }: CanvasProps) {
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

function XTick({ pos, children }: { pos: number; children: ReactNode }) {
  const style = { "--pos": `${pos}%` } as CSSProperties;

  return (
    <div className={styles.xtick_wrapper} style={style}>
      <span className={styles.xtick}>{children}</span>
    </div>
  );
}

function YTick({ pos, children }: { pos: number; children: ReactNode }) {
  const style = { "--pos": `${pos}%` } as CSSProperties;

  return (
    <div className={styles.ytick_wrapper} style={style}>
      <span className={styles.ytick}>{children}</span>
    </div>
  );
}

function calculateTicksAndPrecision(
  minVal: number,
  maxVal: number,
  maxTicks = 5,
): { ticks: number[]; decimalPlaces: number } {
  const rangeVal = maxVal - minVal;
  const roughStep = rangeVal / (maxTicks - 1);

  const exponent = Math.floor(Math.log10(roughStep));
  const fractional = roughStep / Math.pow(10, exponent);

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

  niceStep *= Math.pow(10, exponent);

  const decimalPlaces = niceStep < 1 ? Math.abs(exponent) : 0;

  const tickStart = Math.floor(minVal / niceStep) * niceStep;
  const tickEnd = Math.ceil(maxVal / niceStep) * niceStep;

  const numTicks = Math.round((tickEnd - tickStart) / niceStep + 1);
  const ticks: number[] = [];
  for (let i = 0; i < numTicks; i++) {
    ticks.push(tickStart + i * niceStep);
  }

  const filteredTicks = ticks.filter(
    (tick) => minVal <= tick && tick <= maxVal,
  );

  return { ticks: filteredTicks, decimalPlaces };
}

export default Plot;
