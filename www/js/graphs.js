
/**
 *
 * @param {String} mazeString
 * @returns {Matrix}
 */
var parseMaze = function (mazeString) {
  var maze = [];

  mazeString.split(/\n/).map(function (rowString) {
    if (rowString.trim() != '') {
      var row = [];
      rowString.split(' ').map(function (col) {
        row.push(parseInt(col));
      });

      maze.push(row);
    }
  });

  return new Matrix(maze);
};


/* A */
(function () {

  var inputs = document.querySelectorAll('.js__section-a__input');
  var imageOutput = document.querySelector('.js__section-a__image-output');
  var textOutput = document.querySelector('.js__section-a__text-output');

  var numberMaze = function (maze, startX, startY, endX, endY, size) {
    var width = maze.getN();
    var height = maze.getM();

    var visited = Matrix.create(height, width, false);
    var paths = [];

    var dfs = function (x, y, path) {
      visited.set(y, x, true);

      if (x == endX && y == endY) { // ciel
        paths.push(path);
        visited.set(y, x, false);
        return;
      }

      var move = maze.get(y, x);

      checkMove(x + move, y, path.slice(0));
      checkMove(x - move, y, path.slice(0));
      checkMove(x, y + move, path.slice(0));
      checkMove(x, y - move, path.slice(0));
    };

    var checkMove = function(x, y, path) {
      if (x >= 0 && x < width && y >= 0 && y < height && !visited.get(y, x)) {
        path.push([x, y]);
        dfs(x, y, path);
        visited.set(y, x, false);
      }
    };

    try {
      if (typeof maze.get(startY, startX) != 'undefined' && typeof maze.get(endY, endX) != 'undefined') { // validny vstup
        dfs(startX, startY, [[startX, startY]]);
      }
    } catch (e) {
    }

    /* vykreslenie */

    var image = new VectorImage();

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var square = new Polygon();
        square.add(new Point(size * x - size / 2, size * y - size / 2));
        square.add(new Point(size * x - size / 2, size * y + size / 2));
        square.add(new Point(size * x + size / 2, size * y + size / 2));
        square.add(new Point(size * x + size / 2, size * y - size / 2));

        if (x == startX && y == startY) {
          square.style.fill = 'red';
        }

        if (x == endX && y == endY) {
          square.style.fill = 'yellow';
        }

        image.add([
          square,
          new Text(maze.get(y, x), size * x - 5, size * y + 5 , 20, 20)
        ]);
      }
    }

    /* analyza ciest */
    var lengths = [];
    var minLength = null;

    for (var i = 0; i < paths.length; i++) {
      var length = 0;

      for (var j = 1; j < paths[i].length; j++) {
        length += Math.abs(paths[i][j][0] - paths[i][j - 1][0]);
        length += Math.abs(paths[i][j][1] - paths[i][j - 1][1]);
      }

      minLength = minLength !== null ? Math.min(minLength, length) : length;
      
      lengths.push(length);
    }

    /* vyselektovanie najkratsich ciest */
    var minPaths = [];

    for (var i in paths) {
      if (minLength == lengths[i]) {
        minPaths.push(paths[i]);
      }
    }

    /* vykreslenie najkratsich ciest */
    var step = size / (minPaths.length + 1);

    for (var i = 0; i < minPaths.length; i++) {

      var move = -size / 2 + step * (i + 1);
      var color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
      for (var j = 1; j < minPaths[i].length; j++) {

        var line = new Line(new Point(minPaths[i][j][0] * size + move, minPaths[i][j][1] * size + move), new Point(minPaths[i][j - 1][0] * size + move, minPaths[i][j - 1][1] * size + move));
        line.style['stroke'] = color;
        line.style['opacity'] = 0.5;
        line.style['stroke-width'] = 2;

        image.add(line);
      }
    }

    return {
      image: image,
      minPaths: minPaths,
      minLength: minLength
    };
  };

  var work = function () {

    var values = {};
    for (var i = 0; i < inputs.length; i++) {
      values[inputs[i].getAttribute('data-name')] = inputs[i].value;
    }
 
    try {

      var maze = numberMaze(parseMaze(values['maze']), parseInt(values['startX']), parseInt(values['startY']), parseInt(values['endX']), parseInt(values['endY']), parseInt(values['size']));

      textOutput.innerHTML = 'Počet riešení: ' + maze.minPaths.length + '<br><br>Dĺžka: ' + maze.minLength + '<br><br>' + maze.minPaths.map(function (path) {
        return path.map(function (point) {
          return '(' + point[0] + ', ' + point[1] + ')';
        }).join(', ');
      }).join('<br><br>');

      imageOutput.innerHTML = maze.image.drawSvg();
    } catch (e) {
      imageOutput.innerHTML = textOutput.innerHTML = 'Neplatný vstup!';
    }
  };

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', work);
  }

  work();
})();


/* B */
(function () {

  var inputs = document.querySelectorAll('.js__section-b__input');
  var imageOutput = document.querySelector('.js__section-b__image-output');

  var getMazeSolution = function (maze, startX, startY, endX, endY, size) {

    var width = maze.getN();
    var height = maze.getM();

    var visited = Matrix.create(height, width, false);

    var paths = [];

    var dfs = function (x, y, prevX, prevY, path) {
      visited.set(y, x, true);

      if (x == endX && y == endY) { // ciel
        paths.push(path);
        visited.set(y, x, false);
        return;
      }

      var checkMove = function(x, y, moveX, moveY, path) {
        var newX = x + moveX;
        var newY = y + moveY;

        if (newX >= 0 && newX < width && newY >= 0 && newY < height && // nnei mimo plochu
          ((x - prevX) * moveY <= 0 && (y - prevY) * moveX >= 0) && // povoli iba pohyb vlavo a rovno
          !visited.get(newY, newX) && // navstiveny
          maze.get(newY, newX) != 0 // neni border
        ) {
          path.push([newX, newY]);
          dfs(newX, newY, x, y, path);
          visited.set(newY, newX, false);
        }
      };

      checkMove(x, y, 1, 0, path.slice(0));
      checkMove(x, y, -1, 0, path.slice(0));
      checkMove(x, y, 0, 1, path.slice(0));
      checkMove(x, y, 0, -1, path.slice(0));
    };

    try {
      if (maze.get(startY, startX) == 1 && maze.get(endY, endX) == 1) { // validny vstup
        dfs(startX, startY, startX, startY, [[startX, startY]]);
      }
    } catch (e) {
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
      new Point(- size / 2, (height - 1) * size + size / 2),
      new Point((width - 1) * size + size / 2, (height - 1) * size + size / 2),
      new Point((width - 1) * size + size / 2, - size / 2),
      'none',
      'black'
    );

    image.add(square);

    /* bludisko */
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {

        var p1 = new Point(x * size - size / 2, y * size - size / 2);
        var p2 = new Point(x * size - size / 2, y * size + size / 2);
        var p3 = new Point(x * size + size / 2, y * size + size / 2);
        var p4 = new Point(x * size + size / 2, y * size - size / 2);

        if (maze.get(y, x) == 1) {

          if (x == startX && y == startY) {
            fillSquare(p1, p2, p3, p4, 'red', 'none');
          } else if (x == endX && y == endY) {
            fillSquare(p1, p2, p3, p4, 'yellow', 'none');
          }

          if (x == 0 || maze.get(y, x - 1) == 0) { // border zlava
            image.add(new Line(p1, p2));
          }

          if (x == width - 1 || maze.get(y, x + 1) == 0) { // border zprava
            image.add(new Line(p3, p4));
          }

          if (y == 0 || maze.get(y - 1, x) == 0) { // border zdola
            image.add(new Line(p4, p1));
          }

          if (y == height - 1 || maze.get(y + 1, x) == 0) { // border zhora
            image.add(new Line(p2, p3));
          }
        } else {
          fillSquare(p1, p2, p3, p4, 'rgb(240,240,240)', 'none');
        }
      }
    }

    /* vykreslenie ciest */

    var step = size / (paths.length + 1);

    for (var i = 0; i < paths.length; i++) {
      var move = -size / 2 + step * (i + 1);
      var color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
      for (var j = 1; j < paths[i].length; j++) {

        var line = new Line(new Point(paths[i][j][0] * size + move, paths[i][j][1] * size + move), new Point(paths[i][j - 1][0] * size + move, paths[i][j - 1][1] * size + move));
        line.style['stroke'] = color;
        line.style['opacity'] = 0.7;
        line.style['stroke-width'] = 2;

        image.add(line);
      }
    }

    return image;
  };

  var work = function () {

    var values = {};
    for (var i = 0; i < inputs.length; i++) {
      values[inputs[i].getAttribute('data-name')] = inputs[i].value;
    }

    try {
      var mazeSolution = getMazeSolution(parseMaze(values['maze']), parseInt(values['startX']), parseInt(values['startY']), parseInt(values['endX']), parseInt(values['endY']), parseInt(values['size']));

      imageOutput.innerHTML = mazeSolution.drawSvg();
    } catch (e) {
      imageOutput.innerHTML = 'Neplatný vstup!';
    }
  };

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', work);
  }

  work();
})();