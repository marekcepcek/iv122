/**
 *
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
var getRandom = function (a, b) {
  return a + Math.floor(Math.random() * ((b - a) + 1));
};

/* A */
(function () {

  var pointsInput = document.querySelector('.js__section-a__points-input');
  var imageOutput = document.querySelector('.js__section-a__image-output');

  var getLinear = function (points) {
    var sx = 0;
    var sy = 0;
    var sxx = 0;
    var sxy = 0;
    var n = points.length;

    for (var i in points) {
      var point = points[i];

      sx += point.x;
      sy += point.y;
      sxx += point.x * point.x;
      sxy += point.x * point.y;
    }

    var a = (n * sxy - sx * sy) / (n * sxx - sx * sx);
    var b = sy / n - a * (sx / n);

    var minX = Math.min.apply(Math, points.map(function (point) { return point.x;  } ));
    var maxX = Math.max.apply(Math, points.map(function (point) { return point.x;  } ));

    return new Line(new Point(minX, a * minX + b), new Point(maxX, a * maxX + b));
  };

  var work = function () {
    var points = [];

    pointsInput.value.split(/\n/).forEach(function (point) {
      var parts = point.split(' ', 2);

      if (parts.length == 2) {
        var x = parseFloat(parts[0]);
        var y = parseFloat(parts[1]);

        points.push(new Point(x, y));
      }
    });

    var image = new VectorImage();

    image.add(points);
    image.add(getLinear(points));

    imageOutput.innerHTML = image.drawSvg();
  };


  var generateLinear = function (minX, maxX, a, b, noise) {

    var points = [];
    for (var i = minX; i <= maxX; i+=2) {
      var y = a * i + b;

      points.push([i, getRandom(y - noise / 2, y + noise / 2)]);
    }

    pointsInput.value = points.map(function (point) {
      return point.join(' ');
    }).join('\n');
  };

  pointsInput.addEventListener('change', work);

  /* tlacitko na generovanie */
  document.querySelector('.js__section-a__generate-button').addEventListener('click', function (event) {
    event.preventDefault();
    generateLinear(0, 700, -0.5, 2, 200);
    work();
  });

  generateLinear(0, 700, -0.5, 2, 200);
  work();
})();


/* B */
(function () {

  var kInput = document.querySelector('.js__section-b__k-input');
  var pointsInput = document.querySelector('.js__section-b__points-input');
  var imageOutput = document.querySelector('.js__section-b__image-output');


  var kMeans = function (points, clustersCount) {
    var centers = [];
    var clusters = [];

    /* inicializujeme nahodnymi bodmi */
    for (var i = 0; i < clustersCount; i++) {
      var point = points.splice(getRandom(0, points.length - 1), 1)[0];
      centers.push(point);
      clusters.push([point]);
    }

    /* rozdelime do clusterov */
    for (var i in points) {
      var minDist = centers[0].distanceSq(points[i]);
      var minDistIndex = 0;

      for (var j = 1; j < centers.length; j++) {
        var dist = centers[j].distanceSq(points[i]);
        if (dist < minDist) {
          minDist = dist;
          minDistIndex = j;
        }
      }

      clusters[minDistIndex].push(points[i]);
    }

    var change = true;
    while (change) {
      change = false;

      /* prepocita stredove body  */
      var temp = [];
      for (var i in clusters) {
        var sumX = 0;
        var sumY = 0;

        for (var j in clusters[i]) {
          sumX += clusters[i][j].x;
          sumY += clusters[i][j].y;
        }

        centers[i] = new Point(sumX / clusters[i].length, sumY / clusters[i].length);
        temp.push([]);
      }


      /* upravy prehodi body z clusterov */

      for (var i in clusters) {
        for (var j in clusters[i]) {

          var minDist = centers[i].distanceSq(clusters[i][j]);
          var minDistIndex = i;

          for (var k in centers) {
            var dist = centers[k].distanceSq(clusters[i][j]);
            if (dist < minDist) {
              minDist = dist;
              minDistIndex = k;
            }
          }

          if (minDistIndex != i) {
            change = true;
          }

          temp[minDistIndex].push(clusters[i][j]);
        }
      }

      clusters = temp;
    }

    return {
      centers: centers,
      clusters: clusters
    };
  };

  var work = function () {
    var points = [];

    pointsInput.value.split(/\n/).forEach(function (point) {
      var parts = point.split(' ', 2);

      if (parts.length == 2) {
        var x = parseFloat(parts[0]);
        var y = parseFloat(parts[1]);

        points.push(new Point(x, y));
      }
    });

    var image = new VectorImage();
    image.add(points);

    var clusters = kMeans(points, parseInt(kInput.value));

    /* zafarbnie bodov podla zhluku */
    for (var i in clusters.clusters) {
      var color = 'rgb(' + getRandom(0, 255) + ',' + getRandom(0, 255) + ',' + getRandom(0, 255) + ')';
      for (var j in clusters.clusters[i]) {
        clusters.clusters[i][j].style.fill = color;
      }
    }

    /* vykreslenie VD */

//    var minX = points[0].x;
//    var minY = points[0].y;
//
//    for (var i in points) {
//      minX = Math.min(minX, points[i].x);
//      minY = Math.min(minY, points[i].y);
//    }
//
//    var vd = new VoronoiDiagram(clusters.centers, minX, minY, image.getWidth(), image.getHeight());
//
//    image.add(vd.lines);
//

    /* pridanie stredov */
    image.add(clusters.centers);

    imageOutput.innerHTML = image.drawSvg();
  };

  var generatePolygonal = function (n, size, noise) {

    var points = [];
    var polygon = Polygon.getRegularPolygon(n ,size);

    var vertices = polygon.getVertices();

    var count = getRandom(100, 300);

    for (var i = 0; i < count; i++) {
      var index = getRandom(0, vertices.length - 1);

      var x = getRandom(vertices[index].x - noise / 2, vertices[index].x + noise / 2);
      var y = getRandom(vertices[index].y - noise / 2, vertices[index].y + noise / 2);

      points.push([x, y]);

    }

    pointsInput.value = points.map(function (point) {
      return point.join(' ');
    }).join('\n');
  };

  /* tlacitko na generovanie */
  document.querySelector('.js__section-b__generate-button').addEventListener('click', function (event) {
    event.preventDefault();
    generatePolygonal(parseInt(kInput.value), 200, 200);
    work();
  });

  pointsInput.addEventListener('change', work);
  kInput.addEventListener('change', work);

  generatePolygonal(parseInt(kInput.value), 200, 200);
  work();
})();