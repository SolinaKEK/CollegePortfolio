class Tetris {
  canvas;
  ctx;
  canvasNext;
  ctxNext;
  gameFont;
  account;
  accountValues;
  requestId;
  moves;
  board;
  time;
  lbButton;

  constructor(canvas, canvasNext, lbButton) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvasNext = canvasNext;
    this.ctxNext = this.canvasNext.getContext('2d');
    this.lbButton = lbButton;
    this.gameFont = new FontFace('gameFont', 'url(assets/fonts/P2P.ttf)');
    this.requestId = null;
    this.time = { start: 0, elapsed: 0, level: 0 };
    
        this.accountValues = {
          score: 0,
          level: 0,
          lines: 0
        }
        this.account = new Proxy(this.accountValues, {
          set: (target, key, value) => {
            target[key] = value;
            this.updateAccount(key, value);
            return true;
          }
        });
        

    this.moves = {
      [KEY.LEFT]: p => ({ ...p, x: p.x - 1 }),
      [KEY.RIGHT]: p => ({ ...p, x: p.x + 1 }),
      [KEY.DOWN]: p => ({ ...p, y: p.y + 1 }),
      [KEY.SPACE]: p => ({ ...p, y: p.y + 1 }),
      [KEY.UP]: p => this.board.rotate(p)
    };
    this.board = new Board(this.ctx, this.ctxNext, this.moves, this);
  }

  // METHODS


  updateAccount(key, value) {
    let element = document.getElementById(key);
    if (element) {
      element.textContent = value;
    }
  }
  

  initNext =()=> {
    this.ctxNext.canvas.width = 4 * BLOCK_SIZE;
    this.ctxNext.canvas.height = 4 * BLOCK_SIZE;
    this.ctxNext.scale(BLOCK_SIZE/2, BLOCK_SIZE/2);
  }

  resetGame() {
    this.account.score = 0;
    this.account.lines = 0;
    this.account.level = 0;
    this.board.reset();
    this.time = { start: performance.now(), elapsed: 0, level: LEVEL[this.account.level] };
  }

  animate(now = 0) {
    this.time.elapsed = now - this.time.start;

    if (this.time.elapsed > this.time.level) {
      this.time.start = now;
      if (!this.board.drop()) {
        this.gameOver();
        return;
      }
    }

    // Clear board before drawing new state.
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.board.draw();
    this.requestId = requestAnimationFrame(this.animate.bind(this));
  }

  pause() {

    // control pause message
    let f = (font) => {
      document.fonts.add(font);
      if (this.requestId !== undefined) {
        cancelAnimationFrame(this.requestId);
        this.requestId = null;

        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(1, 3, 8, 1.5);


        this.ctx.font = "0.8px gameFont";
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('PAUSED', 2.8, 4.2);
      }
    }

    if (!this.requestId) {
      this.animate();
      return;
    }
    else {
      this.gameFont.load().then(f);
    }
  }
  hold() {
    let f = (font) => {
      document.fonts.add(font);
      cancelAnimationFrame(this.requestId);
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(1, 3, 8, 3);
      this.ctx.font = '0.5px gameFont';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('HOLD IS FOR', 2.3, 4.3);
      this.ctx.fillText('THE WEAK ^_^', 2.1, 5.3);

      setTimeout(g, 1000);
    }

    let g = () => {
      this.animate();
      return;
    }
    this.gameFont.load().then(f); {
    }
  }

  saveHighScore(score, highScores) {
    let name = prompt('HIGHSCORE Enter initials:');
    let newScore = { score, name };

    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(HIGH_SCORE_NUM);
    localStorage.setItem(HIGH_SCORE_NUM, JSON.stringify(highScores));
  }

  checkHighScore() {
    let highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    let lowestScore = highScores[HIGH_SCORE_NUM - 1]?.score ?? 0;

    if (this.account.score > lowestScore) {
      this.saveHighScore(this.account.score, highScores);
    }
  }

  leaderboard() {
    let f = (font) => {
      document.fonts.add(font);
      cancelAnimationFrame(this.requestId);
      this.requestId = null;

      let highScores = JSON.parse(localStorage.getItem(1)) ?? [];
      let nameScore = highScores[0]['name'] + "  " + highScores[0]['score'];

      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(1, 3, 8, 3.5);
      this.ctx.font = "0.5px gameFont";
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('MAX SCORE:', 2.2, 4.4);
      this.ctx.fillStyle = '#84a4fc';
      this.ctx.fillText(nameScore, 2.2, 5.5);
    }

    if (!this.requestId) {
      this.animate();
      return;
    }
    this.gameFont.load().then(f);
  }

  gameOver() {
    let f = (font) => {
      document.fonts.add(font);
      cancelAnimationFrame(this.requestId);
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(1, 3, 8, 1.5);
      this.ctx.font = "0.7px gameFont";
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('GAME OVER', 1.9, 4.2);

      this.checkHighScore();
    }
    this.gameFont.load().then(f);
  }

  addEventHandler() {

    lbButton.addEventListener('click', this.leaderboard.bind(this));

    document.addEventListener('keydown', event => {
      if (event.keyCode === KEY.P) {
        this.pause();
      }
      if (event.keyCode === KEY.H) {
        this.hold();
      }
      if (this.moves[event.keyCode]) {
        event.preventDefault();
        // Get new state
        let p = this.moves[event.keyCode](this.board.piece);
        if (event.keyCode === KEY.SPACE) {
          // Hard drop
          while (this.board.valid(p)) {
            this.board.piece.move(p);
            p = this.moves[KEY.DOWN](this.board.piece);
          }
        } else if (this.board.valid(p)) {
          this.board.piece.move(p);
          if (event.keyCode === KEY.DOWN) {
          }
        }
      }
    });
  }

  play() {
    this.initNext();
    this.addEventHandler();
    this.resetGame();

    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
    this.animate();
  }
}