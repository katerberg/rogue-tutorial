import {Display} from 'rot-js';

const o = {
  width: 11,
  height: 5,
};
const d = new Display(o);
document.body.appendChild(d.getContainer());

for (let i = 0; i < o.width; i += 1) {
  for (let j = 0; j < o.height; j += 1) {
    if (!i || !j || i + 1 === o.width || j + 1 === o.height) {
      d.draw(i, j, '#', 'gray');
    } else {
      d.draw(i, j, '.', '#666');

    }
  }
}
d.draw(Math.floor(o.width / 2), Math.floor(o.height / 2), '@', 'goldenrod');
