/**
 *
 * @returns {Turtle}
 */
var Turtle = function () {
  this.lines = new VectorImage();
  this.angle = 0;
  this.x = 0;
  this.y = 0;
  this.active = true;
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
    var x = this.x + direction * step * Math.cos(this.angle * Math.PI / 180);
    var y = this.y + direction * step * Math.sin(this.angle * Math.PI / 180);

    if (this.active) {
      this.lines.add(new Line(new Point(this.x, this.y), new Point(x, y)));
    }

    this.x = x;
    this.y = y;

    return this;
  },

  /**
   *
   * @param {Number} angle
   * @returns {Turtle}
   */
  right: function (angle) {
    this.angle = (this.angle + angle) % 360;

    return this;
  },

  /**
   *
   * @param {Number} angle
   * @returns {Turtle}
   */
  left: function (angle) {
    angle = (this.angle - angle) % 360;
    this.angle = angle < 0 ? 360 + angle : angle;

    return this;
  },

  /**
   *
   * @returns {Turtle}
   */
  penup: function () {
    this.active = false;

    return this;
  },

  /**
   *
   * @returns {Turtle}
   */
  pendown: function () {
    this.active = true;

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

