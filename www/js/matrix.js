
/**
 *
 * @param {Array} values
 * @returns {Matrix}
 */
var Matrix = function (values) {
  this.values = values;
};

Matrix.prototype = {

  /**
   *
   * @param {Number} m
   * @param {Number} n
   * @returns {Number}
   */
  get: function (m, n) {
    return this.values[m][n];
  },

  /**
   *
   * @param {Number} m
   * @param {Number} n
   * @param {Number} value
   * @returns {Matrix}
   */
  set: function (m, n, value) {
    this.values[m][n] = value;

    return this;
  },

  /**
   *
   * @returns {Number}
   */
  getN: function () {
    return this.values[0].length;
  },

  /**
   *
   * @returns {Number}
   */
  getM: function () {
    return this.values.length;
  },

  /**
   *
   * @returns {Array}
   */
  toArray: function () {
    return this.values;
  },

  /**
   *
   * @returns {String}
   */
  toString: function () {
    return JSON.stringify(this.values);
  },

  /**
   *
   * @param {Matrix} matrix
   * @returns {Matrix}
   */
  product: function (matrix) {
    var m1 = this.getM();
    var n1 = this.getN();

    var m2 = matrix.getM();
    var n2 = matrix.getN();

    if (n1 !== m2) {
      throw 'Incompatible sizes!';
    }

    var result = Matrix.create(m1, n2);

    for (var m = 0; m < m1; m++) {
      for (var n = 0; n < n2; n++) {
        var sum = 0;
        for (var i = 0; i < n1; i++) {
          sum += this.get(m, i) * matrix.get(i, n);
        }
        result.set(m, n, sum);
      }
    }

    return result;
  }
};

/**
 *
 * @param {Matrix} m
 * @param {Matrix} n
 * @param {Matrix} fill
 * @returns {Matrix}
 */
Matrix.create = function (m, n, fill) {
  var values = [];

  for (var i = 0; i < m; i++) {
    values.push((new Array(n)).fill(fill));
  }

  return new Matrix(values);
};


