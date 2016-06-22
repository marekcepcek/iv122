/**
 *
 * @param {Number} width
 * @param {Number} height
 * @returns {BitmapImage}
 */
var BitmapImage = function (width, height) {
  this.imageData = new ImageData(width, height);
};

BitmapImage.prototype = {

  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @returns {Array}
   */
  get: function (x, y) {
    var index = this.getIndex(x, y);

    return index !== null ? this.imageData.data.slice(index, index + 4) : null;
  },

  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} r
   * @param {Number} g
   * @param {Number} b
   * @param {Number} a
   * @returns {BitmapImage}
   */
  set: function (x, y, r, g, b, a) {
    var index = this.getIndex(x, y);

    if (index !== null) {
      this.imageData.data[index] = Math.max(0, Math.min(255, Math.round(r)));
      this.imageData.data[index + 1] = Math.max(0, Math.min(255, Math.round(g)));
      this.imageData.data[index + 2] = Math.max(0, Math.min(255, Math.round(b)));
      this.imageData.data[index + 3] = Math.max(0, Math.min(255, Math.round(a)));
    }

    return this;
  },

  /**
   *
   * @returns {Number}
   */
  getWidth: function () {
    return this.imageData.width;
  },

  /**
   *
   * @returns {Number}
   */
  getHeight: function () {
    return this.imageData.height;
  },

  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @returns {Number}
   */
  getIndex: function (x, y) {
    x = Math.round(x);
    y = Math.round(y);

    return x >= 0 && y >= 0 && x < this.imageData.width && y < this.imageData.height ? (x + y * this.imageData.width) * 4 : null;
  },

  /**
   *
   * @param {Number} r
   * @param {Number} g
   * @param {Number} b
   * @param {Number} a
   * @returns {BitmapImage}
   */
  fill: function (r, g, b, a) {
    for (var x = 0; x < this.imageData.width; x++) {
      for (var y = 0; y < this.imageData.height; y++) {
        this.set(x, y, r, g, b, a);
      }
    }

    return this;
  },

  /**
   *
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x2
   * @param {Number} y2
   * @param {Number} r
   * @param {Number} g
   * @param {Number} b
   * @param {Number} a
   * @returns {BitmapImage}
   */
  line: function (x1, y1, x2, y2, r, g, b, a) {
    x1 = Math.round(x1);
    x2 = Math.round(x2);

    y1 = Math.round(y1);
    y2 = Math.round(y2);
    
    var dx = x2 - x1;
    var dy = y2 - y1;
    
    if (Math.abs(dx) >= Math.abs(dy)) {
      if (x1 <= x2) {
        for (var x = x1; x <= x2; x++) {
          this.set(x, y1 + dy * (x - x1) / dx, r, g, b, a);
        }
      } else {
        for (var x = x2; x <= x1; x++) {
          this.set(x, y2 + dy * (x - x2) / dx, r, g, b, a);
        }
      }
    } else {
      if (y1 <= y2) {
        for (var y = y1; y <= y2; y++) {
          this.set(x1 + dx * (y - y1) / dy, y, r, g, b, a);
        }
      } else {
        for (var y = y2; y <= y1; y++) {
          this.set(x2 + dx * (y - y2) / dy, y, r, g, b, a);
        }
      }
    }

    return this;
  },

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {Number} left
   * @param {Number} top
   * @returns {BitmapImage}
   */
  draw: function (context, left, top) {
    context.putImageData(this.imageData, left, top);

    return this;
  }
};


