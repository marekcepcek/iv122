/* A */
(function () {

  var listInput = document.querySelector('.js__section-a__list-input');
  var numberInput = document.querySelector('.js__section-a__number-input');

  var permutationsOutput = document.querySelector('.js__section-a__permutations-output');
  var combinationsOutput = document.querySelector('.js__section-a__combinations-output');
  var variationsOutput = document.querySelector('.js__section-a__variations-output');

  var variate = function(items, repeat, unique, k) {
    if (k === 1) {
      return items.map(function (item) {
        return [item];
      });
    } else {
      var left = [];
      var right = items.slice(0);
      var variations = [];

      var item = null;

      do {
        var item = right.shift();

        var subvariations = variate(left.concat(repeat ? [item] : []).concat(right), repeat, unique, k - 1);

        variations = variations.concat(subvariations.map(function (variation) {
          return [item].concat(variation);
        }));

        if (unique) {
          left.push(item);
        }
      } while (right.length);

      return variations;
    }
  };

  var format = function (result) {
    return result.map(function (item) {
      return item.join('');
    }).join(', ') + ' (' +  result.length + ')';
  };

  var work = function () {
    var list = listInput.value.split(',').map(function (item) {
      return item.trim();
    }).filter(function (item) {
      return item !== '';
    });

    var k = parseInt(numberInput.value);

    if (list.length) {
      if (k > 0 && k <= list.length) {
        combinationsOutput.innerHTML = format(variate(list, true, false, k));
        variationsOutput.innerHTML = format(variate(list, true, true, k));
      } else {
        combinationsOutput.innerHTML = variationsOutput.innerHTML = 'Neplatný vstup!';
      }

      permutationsOutput.innerHTML = format(variate(list, false, true, list.length));
    } else {
      combinationsOutput.innerHTML = variationsOutput.innerHTML = permutationsOutput.innerHTML = 'Neplatný vstup!';
    }
  };

  listInput.addEventListener('change', work);
  numberInput.addEventListener('change', work);

  work();
})();

/* B */
(function () {

  var canvas = document.querySelector('.js__section-b__pascal-output');
  var context = canvas.getContext('2d');

  var nInput = document.querySelector('.js__section-b__n-input');
  var dInput = document.querySelector('.js__section-b__d-input');

  var pascal = function (n) {
    var line = [1];
    for (var i = 0; i < n; i++) {
      line.push(line[i] * (n - i) / (i + 1));
    }
    return line;
  };

  var work = function () {
    var n = parseInt(nInput.value);
    var d = parseInt(dInput.value);

    var size = 4;
    
    var width = canvas.width = n * size;
    var height = canvas.height = n * size;

    var image = new BitmapImage(width, height);

    image.fill(255, 255, 255, 255);

    for (var i = 0; i < n; i++) {
      var line = pascal(i);
      var count = Math.ceil(line.length / 2);
      var move = line.length % 2 == 0 ? 0 : size / 2;

      for (var j = 0; j < count; j++) {
        var color = 255 / d * (line[count - j - 1] % d);
        for (var x = 0; x < size; x++) {
          for (var y = 0; y < size; y++) {
            image.set(width / 2 + j * size + x - move , i * size + y, color, color, color, 255);
            image.set(width / 2 - j * size - x + move, i * size + y, color, color, color, 255);
          }
        }   
      }
    };

    image.draw(context, 0, 0);
  };

  nInput.addEventListener('change', work);
  dInput.addEventListener('change', work);

  work();
})();

/* D */
(function () {

  var glOutput = document.querySelector('.js__section-d__gl-output');
  var aOutput = document.querySelector('.js__section-d__a-output');
  var mcOutput = document.querySelector('.js__section-d__mc-output');

  var GL = function () {
    var pi = 0;

    var k = 0;
    var sign = 1;

    var start = Date.now();
    while (Date.now() - start < 1000) {
      pi += 4 * sign / (2 * k + 1);
      sign *= -1;
      k++;
    }

    return pi;
  };

  var A = function () {
    var a = 2 * Math.sqrt(3);
    var b = 3;

    var start = Date.now();
    while (Date.now() - start < 1000) {
      a = 2 * a * b / (a + b);
      b = Math.sqrt(a * b);
    }

    return b;
  };

  var MC = function () {
    var start = Date.now();

    var m = 0;
    var n = 0;

    while (Date.now() - start < 1000) {
      var a = Math.random();
      var b = Math.random();

      if (a * a + b * b < 1) {
        m++;
      }
      n++;
    }

    return 4 * m / n;
  };

  var format = function (result) {
    return result.toString() + '<br>Chyba: (' + Math.abs(Math.PI - result) + ')';
  };

  var work = function () {
    glOutput.innerHTML = format(GL());
    aOutput.innerHTML = format(A());
    mcOutput.innerHTML = format(MC());
  };

  document.querySelector('.js__section-d__start-button').addEventListener('click', function (event) {
    event.preventDefault();
    work();
  });
})();

