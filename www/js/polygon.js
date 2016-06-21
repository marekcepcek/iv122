
/**
 *
 * @returns {Polygon}
 */
var Polygon = function () {
  this.points = [];
  this.lines = [];

  this.endPoint = null;

  this.box = {
    top: null,
    right: null,
    bottom: null,
    left: null
  };

  this.style = {
    fill: 'none',
    stroke: 'black',
    'stroke-width': 1
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
    }

    this.endPoint = point;

    this.recountBox();

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
   * @returns {Polygon}
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
   * @param {Matrix} transformation
   * @returns {Polygon}
   */
  transform: function (transformation) {
    for (var i in this.points) {
      this.points[i].transform(transformation);
    }

    this.recountBox();

    return this;
  },

  /**
   *
   * @returns {Polygon}
   */
  clone: function () {
    var polygon = new Polygon();

    for (var i in this.points) {
      polygon.add(this.points[i].clone());
    }

    return polygon;
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

  /**
   *
   * @returns {String}
   */
  drawSvg: function () {
    return '<polygon points="' + this.points.map(function (point) {
      return point.x + ',' + point.y;
    }).join(' ') + '" style="' + this.getStyle() + '" />';
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
