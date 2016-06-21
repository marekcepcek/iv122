
/**
 *
 * @returns {VectorImage}
 */
var VectorImage = function () {
  this.objects = [];

  this.padding = 4;

  this.box = null;
};

VectorImage.prototype = {

  /**
   *
   * @param {Array|Object} objects
   * @returns {VectorImage}
   */
  add: function (objects) {
    if (objects instanceof Array) {
      for (var i in objects) {
        this.addObject(objects[i]);
      }
    } else {
      this.addObject(objects);
    }

    return this;
  },

  /**
   *
   * @param {Object} object
   * @returns {VectorImage}
   */
  addObject: function (object) {
    this.objects.push(object);

    var box = object.getBox();

    if (this.box === null) {
      this.box = box;
    } else {
      this.box.top = Math.max(this.box.top, box.top);
      this.box.right = Math.max(this.box.right, box.right);
      this.box.bottom = Math.min(this.box.bottom, box.bottom);
      this.box.left = Math.min(this.box.left, box.left);
    }

    return this;
  },

  /**
   *
   * @returns {String}
   */
  drawSvg: function () {
    return this.objects.length > 0 ? '<svg width="' + this.getWidth() + '" height="' + this.getHeight() + '"><g transform="translate(' + (-this.box.left + this.padding) + ',' + (-this.box.bottom + this.padding) + ')" >' + this.objects.map(function (object) { return object.drawSvg(); }).join('') + '</g></svg>' : '<svg></svg>';
  },

  /**
   *
   * @returns {Number}
   */
  getWidth: function () {
    return Math.ceil(this.box.right - this.box.left + 2 * this.padding);
  },

  /**
   *
   * @returns {Number}
   */
  getHeight: function () {
    return Math.ceil(this.box.top - this.box.bottom + 2 * this.padding);
  }
};


