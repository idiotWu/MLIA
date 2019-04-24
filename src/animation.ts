let animationID: number;
let timestamp: number;

const output = document.createElement('div');

document.body.appendChild(output);

output.style.cssText = `
  position: fixed;
  right: 1em;
  bottom: 1em;
  font-size: 60px;
  font-family: Consolas, Monaco, monospace;
  z-index: 9999;
`;

async function frame() {
  return new Promise((resolve) => {
    animationID = requestAnimationFrame(resolve);
  });
}

function zeroFix(num: number) {
  return num.toString().padStart(2, '0');
}

function update(remain: number) {
  output.textContent = `${zeroFix(remain / 1000 | 0)}:${zeroFix(remain % 1000 / 10 | 0)}`;
}

export async function animation(duration: number) {
  let remain = duration;

  timestamp = Date.now();

  if (remain !== 0) {
    update(remain);
  }

  while (remain > 0) {
    await frame();
    const now = Date.now();
    const elapsed = now - timestamp;

    remain -= elapsed;

    if (remain < 0) {
      remain = 0;
    }

    update(remain);
    timestamp = now;
  }
}

export function cancelAnimation() {
  output.textContent = '';
  cancelAnimationFrame(animationID);
}
