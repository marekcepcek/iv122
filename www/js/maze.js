/* B */
(function () {

  var inputs = document.querySelectorAll('.js__section-a__input');
  var imageOutput = document.querySelector('.js__section-a__image-output');
  var textOutput = document.querySelector('.js__section-a__text-output');
  
  /**
   * 
   * @param {Number} a
   * @param {Number} b
   * @returns {Number}
   */
  var getRandom = function (a, b) {
    return a + Math.floor(Math.random() * ((b - a) + 1));
  };

  var getMaze = function (width, height, size) {

    var visited = Matrix.create(height, width, false);

    var fWidth = width * 2 - 1;
    var fHeight = height * 2 - 1;

    var maze = Matrix.create(fHeight, fWidth, 1);

    var change = true;

    var getOptions = function (x, y) {
      var open = [];
      var closed = [];

       if (x != 0) { // neni hrana zlava
        if (maze.get(y * 2, x * 2 - 1) != 0) {
          open.push([-1, 0]);
        } else {
          closed.push([-1, 0]);
        }
      }

      if (x != width - 1) { // neni hrana zlava
        if (maze.get(y * 2, x * 2 + 1) != 0) {
          open.push([1, 0]);
        } else {
          closed.push([1, 0]);
        }
      }

      if (y != 0) { // neni hrana zlava
        if (maze.get(y * 2 - 1, x * 2) != 0) {
          open.push([0, -1]);
        } else {
          closed.push([0, -1]);
        }
      }

      if (y != height - 1) { // neni hrana zlava
        if (maze.get(y * 2 + 1, x * 2) != 0) {
          open.push([0, 1]);
        } else {
          closed.push([0, 1]);
        }
      }

      return {
        open: open,
        closed: closed
      };
    };

    var iterate = function (x, y) {

      var options = getOptions(x, y);

      if (options.open.length > 2) { // ma este 2 cesty
        var valid = options.open.filter(function (option) { // vyberieme cesty kde nevznikne slepy roh
          return getOptions(x + option[0], y + option[1]).open.length > 2;
        });

        if (valid.length > 0) {
          var option = valid[getRandom(0, valid.length - 1)];

          maze.set(y * 2 + option[1], x * 2 + option[0], 0);

          visited.set(y + option[1], x + option[0], false);
        }
      }

      for (var i in options.open) {
        if (visited.get(y + options.open[i][1], x + options.open[i][0])) {
          visited.set(y, x, true);
          return;
        }
      }
      
      for (var i in options.closed) {
        if (visited.get(y + options.closed[i][1], x + options.closed[i][0])) {
          maze.set(y * 2 + options.closed[i][1], x * 2 + options.closed[i][0], 1);
          return;
        }
      }
    };

    
    while (change) {
      change = false;

      visited.set(0, 0, true);

      for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
          if (!visited.get(y, x)) {
            change = true;
            iterate(x, y);
          }
        }
      }
    }

    /* nastavenie stredovych hranic */

    for (var x = 1; x < fWidth; x+=2) {
      for (var y = 1; y < fHeight; y+=2) {
        maze.set(y, x, 0);
      }
    }

    /* vykreslenie */

    var image = new VectorImage();

    var fillSquare = function(p1, p2, p3, p4, fill, stroke) {
      var square = new Polygon();
      square.add(p1)
        .add(p2)
        .add(p3)
        .add(p4);

      square.style.fill = fill;
      square.style.stroke = stroke;

      image.add(square);
    };

    /* okraj */
    var square = new Polygon();

    fillSquare(
      new Point(- size / 2, - size / 2),
      new Point(- size / 2, (fHeight - 1) * size + size / 2),
      new Point((fWidth - 1) * size + size / 2, (fHeight - 1) * size + size / 2),
      new Point((fWidth - 1) * size + size / 2, - size / 2),
      'none',
      'black'
    );

    image.add(square);

    /* bludisko */
    for (var x = 0; x < fWidth; x++) {
      for (var y = 0; y < fHeight; y++) {

        var p1 = new Point(x * size - size / 2, y * size - size / 2);
        var p2 = new Point(x * size - size / 2, y * size + size / 2);
        var p3 = new Point(x * size + size / 2, y * size + size / 2);
        var p4 = new Point(x * size + size / 2, y * size - size / 2);

        if (maze.get(y, x) == 1) {

          if (x == 0 || maze.get(y, x - 1) == 0) { // border zlava
            image.add(new Line(p1, p2));
          }

          if (x == fWidth - 1 || maze.get(y, x + 1) == 0) { // border zprava
            image.add(new Line(p3, p4));
          }

          if (y == 0 || maze.get(y - 1, x) == 0) { // border zdola
            image.add(new Line(p4, p1));
          }

          if (y == fHeight - 1 || maze.get(y + 1, x) == 0) { // border zhora
            image.add(new Line(p2, p3));
          }
        } else {
          fillSquare(p1, p2, p3, p4, 'rgb(240,240,240)', 'none');
        }
      }
    }

    return {
      image: image,
      maze: maze
    };
  };

  var work = function () {

    var values = {};
    for (var i = 0; i < inputs.length; i++) {
      values[inputs[i].getAttribute('data-name')] = inputs[i].value;
    }

    var maze = getMaze(parseInt(values['width']), parseInt(values['height']), parseInt(values['size']));

    imageOutput.innerHTML = maze.image.drawSvg();
    textOutput.innerHTML = maze.maze.toString();
  };

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', work);
  }

  work();
})();