"use client";
import { useEffect, useState, type MouseEvent } from "react";
import styles from "./ElvisExample.module.css";
import Plot from "@/components/Plot";
import { CanvasSprings, Spring } from "@/components/Plot/Spring";
import range from "@/helpers/range";
import { Pause, Play } from "lucide-react";
import type { PlotEntry, PlotRange, Point } from "@/components/Plot/types";

const COLOR1 = "#1f77b4";
const COLOR2 = "#fc5252";
const T_LIM: PlotRange = [-1, 3];

function ElvisExample() {
  const [displacement, setDisplacement] = useState(1);
  const [strength, setStrength] = useState(1);
  const [time, setTime] = useState(0);
  const [play, setPlay] = useState(false);

  const dt = 0.01;

  const data: Point[] = range(T_LIM[0], T_LIM[1] + dt, dt).map((t) => {
    if (t > 0 && t < 1) {
      return [t, displacement];
    }
    return [t, 0];
  });
  const data2: Point[] = range(T_LIM[0], T_LIM[1] + dt, dt).map((t) => {
    if (t > 0 && t < 1) {
      return [t, displacement * strength];
    }
    return [t, 0];
  });

  function timeToIndex(currentTime: number): number {
    if (currentTime < T_LIM[0]) return 0;
    if (currentTime > T_LIM[1]) return data.length - 1;
    return Math.round((currentTime - T_LIM[0]) / dt);
  }

  useEffect(() => {
    if (!play) return;
    const interval = setInterval(() => {
      const newTime = time + 0.1;
      if (newTime > T_LIM[1]) {
        setPlay(false);
        setTime(T_LIM[1]);
      } else setTime(newTime);
    }, 100);
    return () => clearInterval(interval);
  }, [play, time]);

  const inputContent: PlotEntry[] = [
    {
      type: "line",
      data,
      color: COLOR1,
    },
    {
      type: "scatter",
      data: [data[timeToIndex(time)]],
      color: COLOR1,
    },
  ];

  const outputContent: PlotEntry[] = [
    {
      type: "line",
      data: data2,
      color: COLOR2,
    },
    {
      type: "scatter",
      data: [data2[timeToIndex(time)]],
      color: COLOR2,
    },
  ];

  function handlePlay(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!play && time === T_LIM[1]) {
      setTime(T_LIM[0]);
    }
    setPlay(!play);
  }

  return (
    <div className={styles.wrapper_elvis}>
      <div className={styles.wrapper_buttons}>
        <label>
          k ={" "}
          <input
            className={styles.number}
            type="number"
            min={1}
            max={10}
            value={strength}
            onChange={(e) => setStrength(parseFloat(e.target.value))}
          />
        </label>
        <label>
          d ={" "}
          <input
            className={styles.number}
            type="number"
            min={1}
            max={3}
            value={displacement}
            onChange={(e) => setDisplacement(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div className={styles.wrapper}>
        <Plot
          xlabel={"time (s)"}
          ylabel={"dips. (m)"}
          ylim={[0, displacement * 1.1]}
          xlim={T_LIM}
          title={"input"}
          content={inputContent}
        />
        <CanvasSprings>
          <Spring start={[0, 0]} end={[1 + data[timeToIndex(time)][1], 0]} />
        </CanvasSprings>
        <Plot
          xlabel={"time (s)"}
          ylabel={"force (N)"}
          ylim={[0, displacement * strength * 1.1]}
          title={"output"}
          xlim={T_LIM}
          content={outputContent}
        />
      </div>
      <label className={styles.slider_container}>
        <button className={styles.button_no_style} onClick={handlePlay}>
          {play ? <Pause /> : <Play />}
        </button>
        <input
          type="range"
          className={styles.slider}
          min={T_LIM[0]}
          max={T_LIM[1]}
          step={dt}
          value={time}
          onChange={(e) => setTime(parseFloat(e.target.value))}
        />
      </label>
    </div>
  );
}

export default ElvisExample;
