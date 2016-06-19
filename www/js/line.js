
/**
 *
 * @param {Point} a
 * @param {Point} b
 * @returns {Line}
 */
var Line = function (a, b) {
  this.a = a;
  this.b = b;

  this.style = {
    color: {
      r: 0,
      g: 0,
      b: 0
    },
    width: 1
  };
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
    context.moveTo(this.a.x, this.a.y);
    context.lineTo(this.b.x, this.b.y);
    context.stroke();
    context.restore();
  },

  drawSvg: function () {
    return '<line x1="' + this.a.x + '" y1="' + this.a.y + '" x2="' + this.b.x + '" y2="' + this.b.y + '" style="stroke:rgb(' + this.style.color.r + ',' + this.style.color.g + ',' + this.style.color.b + ');stroke-width:' + this.style.width + '" />';
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

  getIntersect: function (line) {
    var epsilon = 0.0001;

    var v1 = new Vector(this.a, this.b);
    var a1 = v1.y;
    var b1 = -v1.x;
    var c1 = -a1 * this.a.x - b1 * this.a.y;

    var v2 = new Vector(line.a, line.b);
    var a2 = v2.y;
    var b2 = -v2.x;
    var c2 = -a2 * line.a.x - b2 * line.a.y;

    try {
      if (a1 == 0) {
        var x = ((c1 / b1) - (c2 / b2)) / ((a2 / b2) - (a1 / b1));
        var y = (-a1 * x - c1) / b1;
      } else {
        var y = ((c1 / a1) - (c2 / a2)) / ((b2 / a2) - (b1 / a1));
        var x = (-b1 * y - c1) / a1;
      }

      var box1 = this.getBox();
      var box2 = line.getBox();

      if ((x > box1.left - epsilon && x < box1.right + epsilon && y < box1.top + epsilon && y > box1.bottom - epsilon) &&
        (x > box2.left - epsilon && x < box2.right + epsilon && y < box2.top + epsilon && y > box2.bottom - epsilon)
      ) {
        return new Point(x, y);
      }
    } catch (e) { // delenie nulou - nema riesenie
    };

    return null;
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
