/* A */
(function () {

  var circleOutput = document.querySelector('.js__section-a__circle-output');
  var circleFilledOutput = document.querySelector('.js__section-a__circle-filled-output');
  var spiralOutput = document.querySelector('.js__section-a__spiral-output');
  var triangleOutput = document.querySelector('.js__section-a__triangle-output');

  /**
   *
   * @param {Number} r
   * @returns {BitmapImage}
   */
  var getCircle = function (r) {
    var image = new BitmapImage(2 * r, 2 * r);

    for (var x = 0; x <= r; x++) {
      var y = Math.round(Math.sqrt(r * r - x * x));

      image.set(r + x - 1, r + y - 1, 0, 0, 0, 255);
      image.set(r + x - 1, r - y, 0, 0, 0, 255);
      image.set(r - x, r + y - 1, 0, 0, 0, 255);
      image.set(r - x, r - y, 0, 0, 0, 255);

      image.set(r + y - 1, r + x - 1, 0, 0, 0, 255);
      image.set(r + y - 1, r - x, 0, 0, 0, 255);
      image.set(r - y, r + x - 1, 0, 0, 0, 255);
      image.set(r - y, r - x, 0, 0, 0, 255);
    }

    return image;
  };

  /**
   *
   * @param {Number} r
   * @returns {BitmapImage}
   */
  var getCircleFilled = function (r) {
    var image = new BitmapImage(2 * r, 2 * r);

    for (var x = 0; x <= r; x++) {
      for (var y = 0; y <= r; y++) {
        if (x * x + y * y <= r * r) {
          image.set(r + x - 1, r + y - 1, 0, 0, 0, 255);
          image.set(r + x - 1, r - y, 0, 0, 0, 255);
          image.set(r - x, r + y - 1, 0, 0, 0, 255);
          image.set(r - x, r - y, 0, 0, 0, 255);
        }
      }
    }

    return image;
  };

  /**
   *
   * @param {Number} r
   * @param {Number} step
   * @param {Number} deep
   * @returns {BitmapImage}
   */
  var getSpiral = function (r, step, deep) {
    var image = new BitmapImage(2 * r, 2 * r);

    var prevX = r;
    var prevY = r;

    var angleSum = deep * 360 / step;

    for (var i = 0; i <= angleSum; i++) {
      var angle = i * Math.PI / 180 * step;

      var cos = Math.cos(angle);
      var sin = Math.sin(angle);

      var x = r + angle * cos;
      var y = r + angle * sin;

      image.line(prevX, prevY, x, y, Math.abs(255 * sin), 0, 255 * cos, 255);

      prevX = x;
      prevY = y;
    }

    return image;
  };

  /**
   *
   * @param {Number} r
   * @returns {BitmapImage}
   */
  var getTriangle = function (r) {
    var image = new BitmapImage(2 * r, 2 * r);

    var d = r * 3 / Math.sqrt(3);

    var x = d / 2;
    var y = Math.sqrt(r * r - x * x);

    var polygon = new Polygon();

    polygon.add(new Point(r, 0)).add(new Point(x + r, y + r)).add(new Point(r - x, y + r));

    var ratio = r * 2 / 255;
    for (var x = 0; x < image.getWidth(); x++) {
      for (var y = 0; y < image.getHeight(); y++) {
        if (polygon.inside(new Point(x, y))) {
          image.set(x, y, x / ratio, 255 - x / ratio, y / ratio, 255);
        }
      }
    }

    return image;
  };

  var work = function () {
    getCircle(64).draw(circleOutput.getContext('2d'), 0, 0);
    getCircleFilled(64).draw(circleFilledOutput.getContext('2d'), 0, 0);
    getSpiral(64, 0.1, 8).draw(spiralOutput.getContext('2d'), 0, 0);
    getTriangle(64).draw(triangleOutput.getContext('2d'), 0, 0);
  };

  work();
})();


/* B */
(function () {

  var polygonOutput = document.querySelector('.js__section-b__polygon-output');

  var getPolygon = function (points) {
    var l1 = new Line(new Point(10, 10), new Point(100, 110));
    var l2 = new Line(new Point(20, 0), new Point(30, 100));

    l1.draw(polygonOutput.getContext('2d'));
    l2.draw(polygonOutput.getContext('2d'));
    l1.getIntersect(l2).draw(polygonOutput.getContext('2d'));

    var polygon = new Polygon();

    for (var i in points) {
      polygon.add(points[i]);
    }

    var image = new BitmapImage(256, 256);
    for (var x = 0; x < image.getWidth(); x++) {
      for (var y = 0; y < image.getHeight(); y++) {
        if (polygon.inside(new Point(x, y))) {
          image.set(x, y, 0, 0, 0, 255);
        }
      }
    }

    return image;
  };

  var work = function () {
    getPolygon([new Point(10, 10), new Point(180, 20), new Point(160, 150), new Point(100, 50), new Point(20, 180)]).draw(polygonOutput.getContext('2d'), 0, 0);
  };

  work();
})();


/* C */
(function () {

  var chessOutput = document.querySelector('.js__section-c__chess-output');
  var wavesOutput = document.querySelector('.js__section-c__waves-output');
  var colorsOutput = document.querySelector('.js__section-c__colors-output');

  var getChess = function (width, height, step, radialStep) {

    var center = new Point(width / 2, height / 2);

    var image = new BitmapImage(width, height);
    for (var x = 0; x < image.getWidth(); x++) {
      for (var y = 0; y < image.getHeight(); y++) {
        var color = (Math.floor((x / step)) % 2 + Math.floor((y / step) % 2) + Math.floor((center.distance(new Point(x, y)) / radialStep) % 2)) % 2 == 0 ? 255 : 0;
        image.set(x, y, color, color, color, 255);
      }
    }

    return image;
  };

  var getWaves = function (width, height, step, radialStep) {

    var center = new Point(width / 2, height / 2);

    var image = new BitmapImage(width, height);
    for (var x = 0; x < image.getWidth(); x++) {
      for (var y = 0; y < image.getHeight(); y++) {
        var distance = center.distance(new Point(x, y));
        var color = Math.cos(distance / radialStep) * 255;

        if ((Math.floor(Math.abs(center.x - x) / step)) % 2 != 0 || (Math.floor(Math.abs(center.y - y) / step)) % 2 != 0) {
          color = 255 - color;
        }
        
        image.set(x, y, color, color, color, 255);
      }
    }

    return image;
  };

  var getColorWaves = function (width, height, step) {

    var image = new BitmapImage(width, height);
    for (var x = 0; x < image.getWidth(); x++) {
      for (var y = 0; y < image.getHeight(); y++) {
        image.set(x, y, 255 * Math.cos(x / step), 255 * Math.cos((y + x) / step), 255 * Math.cos(y / step), 255);
      }
    }

    return image;
  };

  var work = function () {
    getChess(256, 256, 16, 50).draw(chessOutput.getContext('2d'), 0, 0);
    getWaves(256, 256, 100, 5).draw(wavesOutput.getContext('2d'), 0, 0);
    getColorWaves(256, 256, 8).draw(colorsOutput.getContext('2d'), 0, 0);
  };

  work();
})();