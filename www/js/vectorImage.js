var VectorImage = function () {
  this.objects = [];

  this.padding = 4;

  this.box = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
};

VectorImage.prototype = {
  
  add: function (objects) {
    if (objects instanceof Array) {
      for (var i in objects) {
        this.addObject(objects[i]);
      }
    } else {
      this.addObject(objects);
    }
  },

  addObject: function (object) {
    this.objects.push(object);

    var box = object.getBox();
    this.box.top = Math.max(this.box.top, box.top);
    this.box.right = Math.max(this.box.right, box.right);
    this.box.bottom = Math.min(this.box.bottom, box.bottom);
    this.box.left = Math.min(this.box.left, box.left);
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
    return '<svg width="' + this.getWidth() + '" height="' +  this.getHeight() + '"><g transform="translate(' + (-this.box.left + this.padding) + ',' + (-this.box.bottom + this.padding) + ')" >' + this.objects.map(function (object) { return object.drawSvg(); }).join('') + '</g></svg>';
  },

  getWidth: function () {
    return this.box.right - this.box.left + 2 * this.padding;
  },

  getHeight: function () {
    return this.box.top - this.box.bottom + 2 * this.padding;
  }
};


