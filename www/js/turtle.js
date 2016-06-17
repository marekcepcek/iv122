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
   * @returns {undefined}
   */
  forward: function (step) {
    this.move(step, 1);
  },

  /**
   *
   * @param {Number} step
   * @returns {undefined}
   */
  back: function (step) {
    this.move(step, -1);
  },

  /**
   *
   * @param {Number} step
   * @param {Number} direction 1 | -1
   * @returns {undefined}
   */
  move: function (step, direction) {
    var x = this.x + direction * step * Math.cos(this.angle * Math.PI / 180);
    var y = this.y + direction * step * Math.sin(this.angle * Math.PI / 180);

    if (this.active) {
      this.lines.add(new Line(new Point(this.x, this.y), new Point(x, y)));
    }

    this.x = x;
    this.y = y;
  },

  /**
   *
   * @param {Number} angle
   * @returns {undefined}
   */
  right: function (angle) {
    this.angle = (this.angle + angle) % 360;
  },

  /**
   *
   * @param {Number} angle
   * @returns {undefined}
   */
  left: function (angle) {
    angle = (this.angle - angle) % 360;
    this.angle = angle < 0 ? 360 + angle : angle;
  },

  /**
   *
   * @returns {undefined}
   */
  penup: function () {
    this.active = false;
  },

  /**
   *
   * @returns {undefined}
   */
  pendown: function () {
    this.active = true;
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

