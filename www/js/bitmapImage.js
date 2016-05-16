var BitmapImage = function (width, height) {
  this.imageData = new ImageData(width, height);
};

BitmapImage.prototype = {
  get: function (x, y) {
    var index = this.getIndex(x, y);

    return this.imageData.data.slice(index, index + 4);
  },
  set: function (x, y, r, g, b, a) {
    var index = this.getIndex(x, y);
    this.imageData.data[index] = r;
    this.imageData.data[index + 1] = g;
    this.imageData.data[index + 2] = b;
    this.imageData.data[index + 3] = a;

    return this;
  },
//	setRed : function (x, y, value) {
//		var index = x *
//		this.imageData.data
//	},
  getWidth: function () {
    return this.imageData.width;
  },
  getHeight: function () {
    return this.imageData.height;
  },
  getIndex: function (x, y) {
    return (x + y * this.imageData.width) * 4;
  },
  fill: function (r, g, b, a) {
    for (var x = 0; x < this.imageData.width; x++) {
      for (var y = 0; y < this.imageData.height; y++) {
        this.set(x, y, r, g, b, a);
      }
    }
  },
  draw: function (context, left, top) {
    context.putImageData(this.imageData, left, top);
  }
}


