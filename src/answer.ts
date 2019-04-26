async function fetchAnwser() {
  const fd = new FormData();
  fd.append('action', 'answer');

  const res = await fetch('/user/seibido/', {
    method: 'POST',
    body: fd,
    credentials: 'include',
  });

  const parser = new DOMParser();

  return parser.parseFromString(
    await res.text(),
    'text/html',
  );
}

export async function vocabulary() {
  const html = await fetchAnwser();

  const answer: HTMLInputElement = html.querySelector('.qu03 input');
  const testInput: HTMLInputElement = document.querySelector('#drill_form input');

  testInput.value = answer.value.trim();
}

export async function graspWords() {
  const html = await fetchAnwser();

  const answerList = html.querySelectorAll('#commentary font[color="red"]');

  Array.from(answerList).forEach((elem) => {
    const word = elem.textContent.trim().toLowerCase();

    const testInput: HTMLInputElement = document.querySelector(`input[value="${word}"]`);

    if (!testInput) {
      console.log(word);
      return;
    }

    testInput.checked = true;
  });
}

export async function fillInBlanks() {
  const html = await fetchAnwser();

  const answerList: NodeListOf<HTMLInputElement> = html.querySelectorAll('#question_area input');
  const testInputList: NodeListOf<HTMLInputElement> = document.querySelectorAll('#question_area input');

  Array.from(answerList).forEach((ans, idx) => {
    testInputList[idx].value = ans.value.trim();
  });
}

export async function arrange() {
  const html = await fetchAnwser();

  const answer: HTMLElement = html.querySelector('.qu03');
  const testInput: HTMLElement = document.querySelector('#Drop0');

  testInput.textContent = answer.textContent;
}
