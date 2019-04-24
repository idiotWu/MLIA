import * as dat from 'dat-gui';

import { getAllOptions, saveOptions } from './config';
import { getInferredExerciseType } from './infer';
import { animation, cancelAnimation } from './animation';
import { getWaitingTime } from './waiting-time';
import * as answer from './answer';

const exerciseType = getInferredExerciseType();

const options = getAllOptions();

const gui = new dat.GUI();

[
  gui.add(options, 'autorun'),
  gui.add(options, 'nonstop'),
  gui.add(options, 'correctness', 0.5, 1.0),
].forEach(ctrl => ctrl.onChange(saveOptions));

gui.add({ run }, 'run');
gui.add({ stop }, 'stop');

// fix style
const style = document.createElement('style');

style.textContent = `
  .dg.ac {
    z-index: 99999 !important;
  }
  .dg.ac li {
    text-indent: 0 !important;
    float: none !important;
    width: auto !important;
  }
`;

document.head.appendChild(style);

// auto start
requestAnimationFrame(() => {
  if (exerciseType && options.autorun) {
    run();
  }
});

async function run() {
  const nextBtn: HTMLInputElement = document.querySelector('.btn-problem-next');

  // go to next question
  if (nextBtn !== null) {
    return nextBtn.click();
  }

  // is over?
  const message = document.querySelector('#under_area');

  if (message.textContent.includes('全問終了')) {
    return alert('Finished!');
  }

  // should answer?
  if (Math.random() <= options.correctness) {
    await Promise.all([
      answer[exerciseType](),
      animation(options.nonstop ? 0 : getWaitingTime(exerciseType)),
    ]);
  } else {
    console.log('skip');
  }

  submit();
}

function stop() {
  cancelAnimation();
}

function submit() {
  // cast to <any>
  const tdoc: any = document;
  const twin: any = window;
  if (exerciseType === 'arrange') {
    twin.Next(document.querySelector('#Drop0').textContent);
  } else {
    (tdoc.ExpForm as HTMLFormElement).submit();
  }
}
