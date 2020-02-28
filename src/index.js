import {Display, Map, Engine, RNG, Scheduler} from 'rot-js';

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.draw();
  }

  draw() {
    game.display.draw(this.x, this.y, '@', '#ff0');
  }
}

class Game {

  constructor() {
    this.display = new Display({width: 80, height: 25});
    this.map = {};
    this.engine = null;
    this.freeCells = [];
    document.body.appendChild(this.display.getContainer());
  }

  generateMap() {
    const digger = new Map.Digger(80, 25, {dugPercentage: 0.9});

    const digCallback = (x, y, value) => {
      if (value) {
        return;
      } /* Do not store walls */

      const key = `${x},${y}`;
      this.freeCells.push(key);
      this.map[key] = value ? '-' : '.';
    };
    digger.create(digCallback.bind(this));
  }

  popOpenFreeSpace() {
    const index = Math.floor(RNG.getUniform() * this.freeCells.length);
    return this.freeCells.splice(index, 1)[0]
  }

  drawMap() {
    Array(10).fill().forEach(() => {
      this.map[this.popOpenFreeSpace()] = 'x';
    });
    Object.keys(this.map).forEach(key => {
      const parts = key.split(',');
      const x = parseInt(parts[0], 10);
      const y = parseInt(parts[1], 10);
      this.display.draw(x, y, this.map[key]);
    });
    const player = this.createPlayer();
  }

  createPlayer() {
    const key = this.popOpenFreeSpace();
    var parts = key.split(",");
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    this.player = new Player(x, y);
  }

  init() {
    const scheduler = new Scheduler.Simple();
    this.engine = new Engine(scheduler);
    scheduler.add(this.player, true);
    this.engine.start();
  }
}

const game = new Game();
game.generateMap();
game.init();
game.drawMap();
