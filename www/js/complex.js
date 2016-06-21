
/* A */
(function () {

  var inputs = document.querySelectorAll('.js__section-a__input');
  var imageOutput = document.querySelector('.js__section-a__image-output');

  var TYPE_NEWTON = 'newton';
  var TYPE_MENDELBROT = 'mendelbrot';
  var TYPE_JULIAN = 'julian';

  /**
   *
   * @param {Number} ratio [0, 1]
   * @returns {Object}
   */
  var getColor = function(ratio) {
    return colorsys.hsv_to_rgb(ratio * 360, 100, 100);
  };

  var getNewtonFractal = function (moveX, moveY, ratio, width, height, iterationsCount) {

    var image = new BitmapImage(width, height);

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var xx = (x / ratio + moveX / ratio);
        var yy = (y / ratio + moveY / ratio);

        var z = math.complex(xx, yy);

        var distance = 0;
        var iterations = 0;
        for (var i = 0; i < iterationsCount; i++) {
          try {
            z = z.sub((z.mul(z).mul(z).sub(1).div(z.mul(z).mul(3))));
            distance += z.abs();
            iterations++;
          } catch (e) {//delenie 0
            break;
          }
        }

        var r = 255 - 255 / 2 * z.sub(1).abs();
        var g = 255 - 255 / 2 * z.sub(math.complex(-0.5, Math.sqrt(3) / 2)).abs();
        var b = 255 - 255 / 2 * z.sub(math.complex(-0.5, -Math.sqrt(3) / 2)).abs();

        image.set(x, y, r, g, b, 255);
      }
    }

    return image;
  };

  var getMendelbrotFractal = function (moveX, moveY, ratio, width, height, iterationsCount, constant) {

    var image = new BitmapImage(width, height);

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var xx = (x / ratio + moveX / ratio);
        var yy = (y / ratio + moveY / ratio);

        var z = math.complex(constant);
        var c = math.complex(xx, yy);

        var distance = 0;
        var iterations = 0;
        var out = false;
        for (var i = 0; i < iterationsCount; i++) {
          z = z.mul(z).add(c);
          distance += z.abs();
          iterations++;

          if (z.abs() > 2) {
            out = true;
            break;
          }
        }

        if (out) {
          var color = getColor(iterations / iterationsCount);
          image.set(x, y, color.r, color.g, color.b, 255);
        } else {
          var color = getColor(distance / 2);
          image.set(x, y, color.r, color.g, color.b, 255);
        }

      }
    }

    return image;
  };

  var getJulianFractal = function (moveX, moveY, ratio, width, height, iterationsCount, constant) {

    var image = new BitmapImage(width, height);

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var xx = (x / ratio + moveX / ratio);
        var yy = (y / ratio + moveY / ratio);

        var c = math.complex(constant);
        var z = math.complex(xx, yy);

        var distance = 0;
        var iterations = 0;
        var out = false;
        for (var i = 0; i < iterationsCount; i++) {
          z = z.mul(z).add(c);
          distance += z.abs();
          iterations++;

          if (z.abs() > 2) {
            out = true;
            break;
          }
        }

        if (out) {
          var color = getColor(iterations / iterationsCount);
          image.set(x, y, color.r, color.g, color.b, 255);
        } else {
          var color = getColor(distance / iterationsCount);
          image.set(x, y, color.r, color.g, color.b, 255);
        }

      }
    }

    return image;
  };

  var work = function () {

    var values = {};
    for (var i = 0; i < inputs.length; i++) {
      values[inputs[i].getAttribute('data-name')] = inputs[i].value;
    }

    var width = parseInt(values['width']);
    var height = parseInt(values['height']);

    var moveX = parseFloat(values['moveX']);
    var moveY = parseFloat(values['moveY']);

    var ratio = parseFloat(values['ratio']);

    var iterationsCount = parseFloat(values['iterationsCount']);
    var constant = values['constant'].trim();

    var fractal = null;
    switch (values['type']) {
      case TYPE_NEWTON:
        fractal = getNewtonFractal(moveX, moveY, ratio, width, height, iterationsCount);
        break;
      case TYPE_MENDELBROT:
        fractal = getMendelbrotFractal(moveX, moveY, ratio, width, height, iterationsCount, constant);
        break;
      case TYPE_JULIAN:
        fractal = getJulianFractal(moveX, moveY, ratio, width, height, iterationsCount, constant);
        break
    }

    imageOutput.width = width;
    imageOutput.height = height;
    
    fractal.draw(imageOutput.getContext('2d'), 0, 0);
  };

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', work);
  }

  work();
})();