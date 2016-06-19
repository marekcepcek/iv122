
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

  this.style = {
    color: {
      r: 255,
      g: 0,
      b: 0
    },
    size: 4
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
    return '<rect x="' + (this.x - this.style.size / 2) + '" y="' + (this.y - this.style.size / 2)+ '" width="' + this.style.size + '" height="' + this.style.size + '" style="fill:rgb(' + this.style.color.r + ',' + this.style.color.g + ',' + this.style.color.b + ');" />';
  },

  getBox: function () {
    return {
      top: this.y + this.style.size / 2,
      right: this.x + this.style.size / 2,
      bottom: this.y - this.style.size / 2,
      left: this.x - this.style.size / 2
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
