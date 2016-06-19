/* A */
(function () {

  var linesOutput = document.querySelector('.js__section-a__lines-output');

  var getRandomLines = function (x1, y1, width, height, size, count) {

    var lines = [];

    for (var i = 0; i < count; i++) {
      var x = x1 + Math.random() * width;
      var y = y1 + Math.random() * height;
      var angle = Math.random() * (Math.PI * 2);

      var p1 = new Point(x, y);
      var p2 = new Point(x + size * Math.cos(angle), y + size * Math.sin(angle));

      lines.push(new Line(p1, p2));
    }

    return lines;
  };

  /**
   *
   * @param {Array} lines
   * @returns {Array}
   */
  var getIntersects = function (lines) {
    var intersects = [];

    for (var i = 0; i < lines.length; i ++) {
      for (var j = i + 1; j < lines.length; j ++) {
        var intersect = lines[i].getIntersect(lines[j]);

        if (intersect !== null) {
          intersects.push(intersect);
        }
      }
    }

    return intersects;
  };

  var work = function () {

    var image = new VectorImage();

    var lines = getRandomLines(0, 0, 512, 256, 100, Math.ceil(10 + Math.random() * 30));

    image.add(lines);

    var intersects = getIntersects(lines);
    image.add(intersects);

    linesOutput.innerHTML = image.drawSvg();
    
  };

  document.querySelector('.js__section-a__generate-button').addEventListener('click', function (event) {
    event.preventDefault();
    work();
  });
  work();
})();
