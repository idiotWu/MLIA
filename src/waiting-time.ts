const range = {
  vocabulary: [10e3, 30e3],
  graspWords: [90e3, 120e3],
  fillInBlanks: [30e3, 90e3],
  arrange: [30e3, 60e3],
};

export function getWaitingTime(exerciseType: string) {
  const [lower, upper] = range[exerciseType];

  return Math.random() * (upper - lower) + lower + 1 | 0;
}
