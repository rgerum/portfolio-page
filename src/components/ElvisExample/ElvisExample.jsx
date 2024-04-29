"use client";
import React, { useEffect } from "react";
import styles from "./ElvisExample.module.css";
import Plot from "@/components/Plot";
import { CanvasSprings, Spring } from "@/components/Plot/Spring";
import range from "@/helpers/range";
import { Pause, Play } from "lucide-react";

const COLOR1 = "#1f77b4";
const COLOR2 = "#fc5252";

function ElvisExample() {
  const [displacement, setDisplacement] = React.useState(1);
  const [strength, setStrength] = React.useState(1);
  const [time, setTime] = React.useState(0);

  const [play, setPlay] = React.useState(false);

  const dt = 0.01;
  const t_lim = [-1, 3];

  const data = range(t_lim[0], t_lim[1] + dt, dt).map((t) => {
    if (t > 0 && t < 1) {
      return [t, 1 * displacement];
    }
    return [t, 0];
  });
  const data2 = range(t_lim[0], t_lim[1] + dt, dt).map((t) => {
    if (t > 0 && t < 1) {
      return [t, 1 * displacement * strength];
    }
    return [t, 0];
  });
  function time_to_index(time) {
    if (time < t_lim[0]) return 0;
    if (time > t_lim[1]) return data.length - 1;
    return Math.round((time - t_lim[0]) / dt);
  }

  useEffect(() => {
    if (!play) return;
    const interval = setInterval(() => {
      const newTime = time + 0.1;
      if (newTime > t_lim[1]) {
        setPlay(false);
        setTime(t_lim[1]);
      } else setTime(newTime);
    }, 100);
    return () => clearInterval(interval);
  }, [play, time]);

  function handlePlay(e) {
    e.preventDefault();
    if (!play && time === t_lim[1]) {
      setTime(t_lim[0]);
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
          xlim={t_lim}
          title={"input"}
          content={[
            {
              type: "line",
              data: data,
              color: COLOR1,
            },
            {
              type: "scatter",
              data: [data[time_to_index(time)]],
              color: COLOR1,
            },
          ]}
        />
        <CanvasSprings>
          <Spring
            start={[0, 0]}
            end={[1 + 1 * data[time_to_index(time)][1], 0]}
          />
        </CanvasSprings>
        <Plot
          xlabel={"time (s)"}
          ylabel={"force (N)"}
          ylim={[0, displacement * strength * 1.1]}
          title={"output"}
          xlim={t_lim}
          content={[
            {
              type: "line",
              data: data2,
              color: COLOR2,
            },
            {
              type: "scatter",
              data: [data2[time_to_index(time)]],
              color: COLOR2,
            },
          ]}
        />
      </div>
      <label className={styles.slider_container}>
        <button className={styles.button_no_style} onClick={handlePlay}>
          {play ? <Pause /> : <Play />}
        </button>
        <input
          type="range"
          className={styles.slider}
          min={t_lim[0]}
          max={t_lim[1]}
          step={dt}
          value={time}
          onChange={(e) => setTime(parseFloat(e.target.value))}
        />
      </label>
    </div>
  );
}

export default ElvisExample;
