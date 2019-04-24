const range = {
  vocabulary: [3e3, 10e3],
  graspWords: [60e3, 120e3],
  fillInBlanks: [10e3, 60e3],
  arrange: [10e3, 60e3],
};

export function getWaitingTime(exerciseType: string) {
  const [lower, upper] = range[exerciseType];

  return Math.random() * (upper - lower) + lower + 1 | 0;
}
