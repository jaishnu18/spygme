export function start(setStartTime) {
  const date = new Date();
  setStartTime(date);
}

export function end(startTime) {
  const endTime = new Date();
  let timeDiff = endTime - startTime;
  timeDiff /= 1000;
  const seconds = timeDiff;
  return seconds;
}
