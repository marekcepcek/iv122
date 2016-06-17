/* A */
(function () {

  var countInput = document.querySelector('.js__section-a__count-input');
  var sizeInput = document.querySelector('.js__section-a__size-input');

  var polygonOutput = document.querySelector('.js__section-a__polygon-output');
  var starOutput = document.querySelector('.js__section-a__star-output');

  /**
   *
   * @param {Number} n
   * @param {Number} size
   * @returns {Turtle}
   */
  var regularPolygon = function (n, size) {
    var turtle = new Turtle();
    var angle = 180 - (1 - 2 / n) * 180;

    for (var i = 0; i < n; i++) {
      turtle.forward(size);
      turtle.right(angle);
    }

    return turtle;
  };


  /**
   *
   * @param {Number} n
   * @param {Number} size
   * @returns {Turtle}
   */
  var regularStar = function (n, size, multipler) {
    var turtle = new Turtle();
    var angle = 180 - (1 - 2 * multipler / n) * 180;

    for (var i = 0; i < n; i++) {
      turtle.forward(size * 2);
      turtle.right(angle);
    }

    return turtle;
  };

  var work = function () {
    polygonOutput.innerHTML = regularPolygon(countInput.value, sizeInput.value).drawSvg();
    starOutput.innerHTML = regularStar(countInput.value, sizeInput.value, 5).drawSvg();
  };

  countInput.addEventListener('change', work);
  sizeInput.addEventListener('change', work);

  work();
})();

/* A */
(function () {

  var relativeOutput = document.querySelector('.js__section-b__relative-output');
  var absoluteOutput = document.querySelector('.js__section-b__absolute-output');

  /**
   * @returns {Turtle}
   */
  var relativePentagram = function () {
    var turtle = new Turtle();
    var length = 100;
    var angle = 180 - (3 / 5) * 180;

    for (var i = 0; i < 5; i++) {
      turtle.left(angle);
      turtle.forward(length);
    }

    length = length * (1 + Math.sqrt(5)) / 2; // gold ration
    angle = 180 - (1 - 4 / 5) * 180;

    turtle.left(angle);
    for (var i = 0; i < 5; i++) {
      turtle.forward(length);
      turtle.right(angle);
    }

    return turtle;
  };

  /**
   *
   * @returns {VectorImage}
   */
  var absolutePentagram = function () {
    var pentagram = new VectorImage();

    var length = 100;
    var angle = 180 - (3 / 5) * 180;

    var points = [new Point(0,0)];

    for (var i = 0; i < 4; i++) {
      var x = points[i].x - length * Math.cos(angle * i * Math.PI / 180);
      var y = points[i].y - length * Math.sin(angle * i * Math.PI / 180);

      points.push(new Point(x, y));
    }

    for (var i = 0; i < 5; i++) {
      for (var j = i; j < 5; j++) {
        pentagram.add(new Line(points[i], points[j]));
      }
    }

    return pentagram;
  };

  var work = function () {
    relativeOutput.innerHTML = relativePentagram().drawSvg();
    absoluteOutput.innerHTML = absolutePentagram().drawSvg();
  };

  work();
})();
