
/**
 *
 * @param {Number} x
 * @param {Number} y
 * @returns {Point}
 */
var Point = function (x, y) {
  this.x = parseFloat(x);
  this.y = parseFloat(y);
  this.selected = false;

  this.size = 4;

  this.style = {
    fill: 'red'
  };
};

Point.prototype = {

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @returns {undefined}
   */
  draw: function (context) {
    context.save();
    if (this.selected) {
      context.strokeStyle = "#FF0000";
    }
    context.beginPath();
    context.rect(this.x - 4, this.y - 4, 8, 8);
    context.stroke();
    context.restore();
  },

  /**
   *
   * @returns {String}
   */
  drawSvg: function () {
    return '<rect x="' + (this.x - this.size / 2) + '" y="' + (this.y - this.size / 2)+ '" width="' + this.size + '" height="' + this.size + '" style="' + this.getStyle() + '" />';
  },

  /**
   *
   * @returns {String}
   */
  getStyle: function () {
    var style = '';

    for (var name in this.style) {
      style += name + ':' + this.style[name] + ';';
    }

    return style;
  },

  getBox: function () {
    return {
      top: this.y + this.size / 2,
      right: this.x + this.size / 2,
      bottom: this.y - this.size / 2,
      left: this.x - this.size / 2
    };
  },

  /**
   *
   * @param {Point} point
   * @returns {Number}
   */
  distance: function (point) {
    return Math.sqrt(this.distanceSq(point));
  },

  /**
   *
   * @param {Point} point
   * @returns {Number}
   */
  distanceSq: function (point) {
    return (this.x - point.x) * (this.x - point.x) + (this.y - point.y) * (this.y - point.y);
  },

  /**
   *
   * @param {Matrix} transformation
   * @returns {Point}
   */
  transform: function (transformation) {
    var result = transformation.product(new Matrix([[this.x], [this.y], [1]]));

    this.x = result.get(0, 0);
    this.y = result.get(1, 0);

    return this;
  },

  /**
   *
   * @returns {Point}
   */
  clone: function () {
    return new Point(this.x, this.y);
  }
};

/**
 *
 * @param {Point} p1
 * @param {Point} p2
 * @param {Point} p3
 * @returns {Number}
 */
Point.crossProduct = function (p1, p2, p3) {
  var u1 = p2.x - p1.x;
  var v1 = p2.y - p1.y;
  var u2 = p3.x - p1.x;
  var v2 = p3.y - p1.y;

  return u1 * v2 - v1 * u2;
};
