export function secToMin(sec: number) {
  const min = sec / 60;
  const remainedSec = sec % 60;
  if (sec < 60) {
    return `${sec}sec`;
  } else if (remainedSec !== 0) {
    return `${Math.floor(min)}min and ${remainedSec}sec`;
  } else {
    return `${Math.floor(min)}min`;
  }
}
