
/**
 *
 * @param {Point} a
 * @param {Point} b
 * @returns {Line}
 */
var Line = function (a, b) {
  this.a = a;
  this.b = b;
};

Line.prototype = {

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @returns {undefined}
   */
  draw: function (context) {
    context.save();
    context.beginPath();
    context.moveTo(this.a.x, -1 * this.a.y);
    context.lineTo(this.b.x, -1 * this.b.y);
    context.stroke();
    context.restore();
  },

  drawSvg: function () {
    return '<line x1="' + this.a.x + '" y1="' + this.a.y + '" x2="' + this.b.x + '" y2="' + this.b.y + '" style="stroke:rgb(' + 0 + ',' + 0 + ',' + 0 + ');stroke-width:' + 2 + '" />';
  },
  
  getBox: function () {
    return {
      top: Math.max(this.a.y, this.b.y),
      right: Math.max(this.a.x, this.b.x),
      bottom: Math.min(this.a.y, this.b.y),
      left: Math.min(this.a.x, this.b.x)
    };
  },

  /**
   *
   * @param {Line} line
   * @returns {Boolean}
   */
  equals: function (line) {
    return this.a === line.a && this.b === line.b;
  },

  /**
   *
   * @param {Point} point
   * @returns {Boolean}
   */
  left: function (point) {
    return (new Vector(this.a, this.b)).crossProduct(new Vector(this.a, point)) < 0;
  },

  /**
   *
   * @returns {Line}
   */
  reverse: function () {
    return new Line(this.b, this.a);
  },

  /**
   * 
   * @returns {Point}
   */
  center: function () {
    return new Point((this.a.x + this.b.x) / 2, (this.a.y + this.b.y) / 2);
  },

  /**
   *
   * @param {Point} point
   * @returns {Number}
   */
  delaunayDistance: function (point) {
    var circle = Circle.createCircle(this.a, this.b, point);

    return circle.radius * (this.left(circle.center) ? 1 : -1);
  }
};
