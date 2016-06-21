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
    polygonOutput.innerHTML = (new VectorImage()).add(regularPolygon(countInput.value, sizeInput.value)).drawSvg();
    starOutput.innerHTML = (new VectorImage()).add(regularStar(countInput.value, sizeInput.value, 5)).drawSvg();
  };

  countInput.addEventListener('change', work);
  sizeInput.addEventListener('change', work);

  work();
})();

/* B */
(function () {

  var relativeOutput = document.querySelector('.js__section-b__relative-output');
  var absoluteOutput = document.querySelector('.js__section-b__absolute-output');

  var bOutput = document.querySelector('.js__section-b__b-output');
  var cOutput = document.querySelector('.js__section-b__c-output');
  var dOutput = document.querySelector('.js__section-b__d-output');
  var eOutput = document.querySelector('.js__section-b__e-output');
  
  var countInput = document.querySelector('.js__section-b__count-input');
  var sizeInput = document.querySelector('.js__section-b__size-input');

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
   * @returns {Array}
   */
  var absolutePentagram = function () {
    var pentagram = [];

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
        pentagram.push(new Line(points[i], points[j]));
      }
    }

    return pentagram;
  };

  var getSpiral = function (n, size) {
    var spiral = new Turtle();

    var ratio = 0.1;

    for (var i = 0; i < n; i++) {
      for (var j = 0; j < 4; j++) {
        spiral.forward(size);
        spiral.right(90);
      }

      var a = size * ratio;

      size = Math.sqrt(a * a + (size - a) * (size - a));
      spiral.forward(a);
      spiral.right(Math.asin(a / size) * 180 / Math.PI);
    }

    return spiral;
  };

  var getGrid = function (n, size) {
    var grid = [];

    size /= 2;
    
    var x, y;
    var step = size / n;

    for (var i = 0; i < n; i++) {
      x = step * i;
      y = Math.sqrt(size * size - x * x);

      grid.push(new Line(new Point(x, y), new Point(x, -y)));
      grid.push(new Line(new Point(-x, y), new Point(-x, -y)));

      grid.push(new Line(new Point(y, x), new Point(-y, x)));
      grid.push(new Line(new Point(y, -x), new Point(-y, -x)));
    }

    return grid;
  };

  var getTriangles = function (n, size) {
    var triangles = new Turtle();
    
    var step = size / 2 / Math.cos(Math.PI / 6) / n;

    for (var i = 0; i < n; i++) {
      for (var j = 0; j < 3; j++) {
        triangles.forward(size - size * i / n);
        triangles.right(120);
      }

      triangles.penup().right(30).forward(step).left(30).pendown();
    }

    return triangles;
  };

  var getDiamonds = function (n, size) {
    size /= n;

    var diamonds = new Turtle();
    var angle = 180 - (1 - 2 / n) * 180;

    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        diamonds.forward(size);
        diamonds.right(angle);
      }
      diamonds.right(angle);
    }

    return diamonds;
  };

  var work = function () {
    var n = countInput.value;
    var size = sizeInput.value;

    relativeOutput.innerHTML = (new VectorImage()).add(relativePentagram()).drawSvg();
    absoluteOutput.innerHTML = (new VectorImage()).add(absolutePentagram()).drawSvg();

    bOutput.innerHTML = (new VectorImage()).add(getSpiral(n, size)).drawSvg();
    cOutput.innerHTML = (new VectorImage()).add(getGrid(n, size)).drawSvg();
    dOutput.innerHTML = (new VectorImage()).add(getTriangles(n, size)).drawSvg();
    eOutput.innerHTML = (new VectorImage()).add(getDiamonds(n, size)).drawSvg();
  };

  countInput.addEventListener('change', work);
  sizeInput.addEventListener('change', work);
  
  work();
})();

/* A */
(function () {

  var countInput = document.querySelector('.js__section-c__count-input');
  var sizeInput = document.querySelector('.js__section-c__size-input');

  var kochOutput = document.querySelector('.js__section-c__koch-output');
  var treeOutput = document.querySelector('.js__section-c__tree-output');
  var triangleOutput = document.querySelector('.js__section-c__triangle-output');
  var pentaflakeOutput = document.querySelector('.js__section-c__pentaflake-output');

  var scaleFactor = function (n) {
    var sum = 0;
    for (var i = Math.floor(n/4); i >= 1; i--) {
      sum += Math.cos(2 * Math.PI * i / n);
    }

    return 1 / (2 * (1 + sum));
  };

  /**
   *
   * @param {Number} n
   * @param {Number} size
   * @returns {Turtle}
   */
  var nflake = function (n, deep, size) {
    var flake = new Turtle();

    var scale = scaleFactor(n);
    var angle = 180 - (1 - 2 / n) * 180;

    var step = function (deep, size) {
      if (deep <= 0) {
        for (var i = 0; i < n; i++) {
          flake.forward(size)
            .left(angle);
        }
      } else {
        for (var i = 0; i < n; i++) {
          step(deep - 1, size * scale);
          flake.penup()
            .forward(size)
            .left(angle)
            .pendown();
        }
      }
    };

    step(deep, size);

    return flake;
  };

  /**
   *
   * @param {Number} n
   * @param {Number} size
   * @returns {Turtle}
   */
  var kochFractal = function (n, size) {
    var turtle = new Turtle();

    var step = function (n, size) {
      size /= 3;
      if (n <= 1) {
        turtle.forward(size)
          .left(60)
          .forward(size)
          .right(120)
          .forward(size)
          .left(60)
          .forward(size);
      } else {
        step(n - 1, size);
        turtle.left(60);
        step(n - 1, size);
        turtle.right(120);
        step(n - 1, size);
        turtle.left(60);
        step(n - 1, size);
      }
    };

    for (var i = 0; i < 3; i++) {
      step(n, size);
      turtle.right(120);
    }

    return turtle;
  };

   /**
   *
   * @param {Number} n
   * @param {Number} size
   * @returns {Turtle}
   */
  var treeFractal = function (n, size) {
    var turtle = new Turtle();
    turtle.left(90);
    var step = function (n, size) {
      size *= 0.6;
      turtle.forward(size);

      if (n >= 1) {
        turtle.left(45);
        step(n - 1, size);
        turtle.right(90);
        step(n - 1, size);
        turtle.left(45);
      }

      turtle.penup()
        .back(size)
        .pendown();
    };

    step(n, size);

    return turtle;
  };


  var work = function () {
    var count = countInput.value;
    var size = sizeInput.value;
    
    kochOutput.innerHTML = (new VectorImage()).add(kochFractal(count, size)).drawSvg();
    treeOutput.innerHTML = (new VectorImage()).add(treeFractal(count, size)).drawSvg();
    triangleOutput.innerHTML = (new VectorImage()).add(nflake(3, count, size)).drawSvg();
    pentaflakeOutput.innerHTML = (new VectorImage()).add(nflake(5, count, size)).drawSvg();
  };

  countInput.addEventListener('change', work);
  sizeInput.addEventListener('change', work);

  work();
})();
