
var Transformation = {

  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @returns {Matrix}
   */
  translate: function (x, y) {
    return new Matrix([
      [1, 0, x],
      [0, 1, y],
      [0, 0, 1]
    ]);
  },

  /**
   *
   * @param {Number} angle in deg
   * @returns {Matrix}
   */
  rotate: function (angle) {
    var angleRad = angle * Math.PI / 180;
    return new Matrix([
      [Math.cos(angleRad), -Math.sin(angleRad), 0],
      [Math.sin(angleRad), Math.cos(angleRad), 0],
      [0, 0, 1]
    ]);
  },

  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @returns {Matrix}
   */
  scale: function (x, y) {
    return new Matrix([
      [x, 0, 0],
      [0, y, 0],
      [0, 0, 1]
    ]);
  },

  /**
   *
   * @param {Array} values 3 x 3
   * @returns {Metrix}
   */
  custom: function (values) {
    return new Matrix(values);
  },

  /**
   *
   * @param {Array} transformations
   * @returns {Matrix}
   */
  combine: function (transformations) {
    var result = transformations[transformations.length - 1];

    for (var i = transformations.length - 2; i >= 0; i--) {
      result = result.product(transformations[i]);
    }

    return result;
  }
};
