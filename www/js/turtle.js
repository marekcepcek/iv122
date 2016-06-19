/**
 *
 * @returns {Turtle}
 */
var Turtle = function () {
  this.lines = new VectorImage();

  this.state = {
    x: 0,
    y: 0,
    angle: 0,
    active: true
  };

  this.stack = [];
};

Turtle.prototype = {

  /**
   *
   * @param {Number} step
   * @returns {Turtle}
   */
  forward: function (step) {
    return this.move(step, 1);
  },

  /**
   *
   * @param {Number} step
   * @returns {Turtle}
   */
  back: function (step) {
    return this.move(step, -1);
  },

  /**
   *
   * @param {Number} step
   * @param {Number} direction 1 | -1
   * @returns {Turtle}
   */
  move: function (step, direction) {
    var x = this.state.x + direction * step * Math.cos(this.state.angle);
    var y = this.state.y + direction * step * Math.sin(this.state.angle);

    if (this.state.active) {
      this.lines.add(new Line(new Point(this.state.x, this.state.y), new Point(x, y)));
    }

    this.state.x = x;
    this.state.y = y;

    return this;
  },

  /**
   *
   * @param {Number} angle
   * @returns {Turtle}
   */
  right: function (angle) {
    this.state.angle += angle * Math.PI / 180;

    return this;
  },

  /**
   *
   * @param {Number} angle
   * @returns {Turtle}
   */
  left: function (angle) {
    this.state.angle -= angle * Math.PI / 180;

    return this;
  },

  /**
   *
   * @returns {Turtle}
   */
  penup: function () {
    this.state.active = false;

    return this;
  },

  /**
   *
   * @returns {Turtle}
   */
  pendown: function () {
    this.state.active = true;

    return this;
  },

  /**
   *
   * @returns {Turtle}
   */
  push: function () {
    var state = {};

    for (var i in this.state) {
      state[i] = this.state[i];
    }

    this.stack.push(state);

    return this;
  },

  /**
   *
   * @returns {Turtle}
   */
  pop: function () {
    var state = this.stack.pop();
    if (state) {
      this.state = state;
    }

    return this;
  },

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @returns {undefined}
   */
  draw: function (context) {
    for (var i = 0; i < this.lines.length; i++) {
      this.lines[i].draw(context);
    }

    return this;
  },

  /**
   *
   * @param {Number} lineWidth
   * @param {Number} r
   * @param {Number} g
   * @param {Number} b
   * @returns {String}
   */
  drawSvg: function () {
    return this.lines.drawSvg();
  }
};

