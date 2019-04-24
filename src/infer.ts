const typeMap = [
  ['vocabulary check', 'vocabulary'],
  ['grasping of words', 'graspWords'],
  ['fill in blanks', 'fillInBlanks'],
  ['reading summary', 'fillInBlanks'],
  ['空所補充', 'fillInBlanks'],
  ['単語並び替え', 'arrange'],
];

export function getInferredExerciseType() {
  const title: HTMLElement = document.querySelector('.bloc-resp-lessonname');

  if (!title) {
    return '';
  }

  for (let [str, type] of typeMap) {
    if (title.textContent.toLowerCase().includes(str)) {
      return type;
    }
  }
}
