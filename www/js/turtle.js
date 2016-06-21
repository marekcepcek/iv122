/**
 *
 * @returns {Turtle}
 */
var Turtle = function () {

  this.lines = [];

  this.state = {
    x: 0,
    y: 0,
    angle: 0,
    active: true
  };

  this.stack = [];

  this.box = {
    top: null,
    right: null,
    bottom: null,
    left: null
  };
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
      this.addLine(new Line(new Point(this.state.x, this.state.y), new Point(x, y)));
    }

    this.state.x = x;
    this.state.y = y;

    return this;
  },

  /**
   *
   * @param {Line} line
   * @returns {Turtle}
   */
  addLine: function (line) {
    this.lines.push(line);

    this.resizeBox(line.getBox());

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
   * @returns {Object}
   */
  getBox: function () {
    return this.box;
  },

  /**
   *
   * @returns {Number}
   */
  getWidth: function () {
    return this.box.right - this.box.left;
  },

  /**
   *
   * @returns {Number}
   */
  getHeight: function () {
    return this.box.bottom - this.box.top;
  },

  /**
   *
   * @param {Matrix} transformation
   * @returns {Turtle}
   */
  transform: function (transformation) {
    for (var i in this.lines) {
      this.lines[i].transform(transformation);
    }

    this.recountBox();

    return this;
  },

  /**
   *
   * @returns {Turtle}
   */
  recountBox: function () {
    this.box = {
      top: null,
      right: null,
      bottom: null,
      left: null
    };

    for (var i in this.lines) {
      this.resizeBox(this.lines[i].getBox());
    }

    return this;
  },

  /**
   *
   * @param {Object} box
   * @returns {Turtle}
   */
  resizeBox: function (box) {
    this.box.top = this.box.top !== null ? Math.max(this.box.top, box.top) : box.top;
    this.box.right = this.box.right !== null ? Math.max(this.box.right, box.right) : box.right;
    this.box.bottom = this.box.bottom !== null ? Math.min(this.box.bottom, box.bottom) : box.bottom;
    this.box.left = this.box.left !== null ? Math.min(this.box.left, box.left) : box.left;

    return this;
  },

  /**
   *
   * @returns {Turtle}
   */
  clone: function () {
    // @TODO deep clone!
    var turtle = new Turtle();

    for (var i in this.lines) {
      turtle.addLine(this.lines[i].clone());
    }

    return turtle;
  },

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @returns {Turtle}
   */
  draw: function (context) {
    for (var i = 0; i < this.lines.length; i++) {
      this.lines[i].draw(context);
    }

    return this;
  },

  /**
   *
   * @returns {String}
   */
  drawSvg: function () {
    return this.lines.map(function (line) {
      return line.drawSvg();
    }).join('');
  }
};

