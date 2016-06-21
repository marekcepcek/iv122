
/**
 *
 * @param {String} text
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @returns {Text}
 */
var Text = function (text, x, y, width, height) {
  this.text = String(text).trim();

  this.x = x;
  this.y = y;

  this.width = width;
  this.height = height;

  this.style = {};
};

Text.prototype = {

  /**
   *
   * @returns {String}
   */
  drawSvg: function () {
    return '<text x="' + this.x + '" y="' + this.y + '" style="' + this.getStyle() + '">' + this.text + '</text>';
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
      top: this.y,
      right: this.x + this.width,
      bottom: this.y + this.height,
      left: this.x
    };
  }
};
