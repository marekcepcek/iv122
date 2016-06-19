
/**
 *
 * @returns {Polygon}
 */
var Polygon = function () {
  this.points = [];
  this.lines = [];

  this.endPoint = null;

  this.box = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
};

Polygon.prototype = {

  /**
   *
   * @param {Point} point
   * @returns {Polygon}
   */
  add: function (point) {
    this.points.push(point);

    if (this.endPoint !== null) {
      this.lines.pop();
      this.lines.push(new Line(this.endPoint, point));
      this.lines.push(new Line(point, this.points[0]));

      this.box.top = Math.max(this.box.top, point.y);
      this.box.right = Math.max(this.box.right, point.x);
      this.box.bottom = Math.min(this.box.bottom, point.y);
      this.box.left = Math.min(this.box.left, point.x);
    } else {
      this.box.top = this.box.bottom = point.y;
      this.box.right = this.box.left = point.x;
    }

    this.endPoint = point;

    return this;
  },

  /**
   *
   * @param {Point} point
   * @returns {Boolean}
   */
  inside: function (point) {
    var box = this.getBox();

    var right = 0;
    var left = 0;

    var line = new Line(new Point(box.left, point.y), new Point(box.right, point.y));

    for (var i in this.lines) {
      var intersect = line.getIntersect(this.lines[i]);
      if (intersect !== null) {
        if (intersect.x >= point.x) {
          right++;
        } else {
          left++;
        }
      }
    }
    
    return (right > 0 && left > 0) && (right % 2 != 0 || left % 2 != 0);
  },

  getEdges: function () {
    return this.lines;
  },

  getEdgesCount: function () {
    return this.lines.length;
  },

  getVertices: function () {
    return this.points;
  },

  getVerticesCount: function () {
    return this.points.length;
  },

  getBox: function () {
    return this.box;
  },

  getWidth: function () {
    return this.box.right - this.box.left;
  },

  getHeight: function () {
    return this.box.bottom - this.box.top;
  },
  
  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @returns {undefined}
   */
  draw: function (context) {
    if (this.points.length > 0) {
      context.save();
      context.beginPath();
      context.moveTo(this.points[0].x, this.points[0].y);

      for (var i = 0; i < this.points.length; i++) {
        context.lineTo(this.points[i].x, this.points[i].y);
      }

      context.closePath();
      context.stroke();
      context.restore();
    }

    return this;
  },

  drawSvg: function () {
    var image = new VectorImage();

    image.add(this.lines);

    return image.drawSvg();
  }
};

  /**
   *
   * @param {Number} n
   * @param {Number} size
   * @returns {Polygon}
   */
  Polygon.getRegularPolygon = function (n, size) {

    var polygon = new Polygon();

    var angleStep = 2 * Math.PI / n;

    for (var i = 0; i < n; i++) {
      polygon.add(new Point(size * Math.sin(i * angleStep), size * Math.cos(i * angleStep)));
    }

    return polygon;
  };
