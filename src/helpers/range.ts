export default function range(end: number): number[];
export default function range(start: number, end: number, step?: number): number[];
export default function range(
  start: number,
  end?: number,
  step = 1,
): number[] {
  const output: number[] = [];
  let rangeStart = start;
  let rangeEnd = end;

  if (typeof rangeEnd === "undefined") {
    rangeEnd = rangeStart;
    rangeStart = 0;
  }

  for (let index = rangeStart; index < rangeEnd; index += step) {
    output.push(index);
  }

  return output;
}
