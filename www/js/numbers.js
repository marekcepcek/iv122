$(function () {

  /* A1 */
  (function () {
    var canvas = document.getElementById('canvasA1');
    var context = canvas.getContext('2d');

    var width = canvas.width;
    var height = canvas.height;

    var image = new BitmapImage(width, height);

    var draw = function () {
      for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
          image.set(x, y, 255 / width * x, 0, 255 / height * y, 255);
        }
      }

      image.draw(context, 0, 0);
    };

    draw();

  })();

  /* A2 */
  (function () {
    var canvas = document.getElementById('canvasA2');
    var context = canvas.getContext('2d');

    var sectionWidth = canvas.width / 2;
    var sectionHeight = canvas.height / 2;

    var drawSection = function (width, height, splitCount, flipX, flipY) {

      var stepX = width / splitCount;
      var stepY = height / splitCount;

      for (var i = 0; i <= splitCount; i++) {
        (new Line(new Point(width + flipX * i * stepX, height), new Point(width, height + flipY * (height - i * stepY)))).draw(context);
      }
    };

    var draw = function () {
      var splitCount = $('.js-split-count-input').val();

      drawSection(sectionWidth, sectionHeight, splitCount, 1, 1);
      drawSection(sectionWidth, sectionHeight, splitCount, 1, -1);
      drawSection(sectionWidth, sectionHeight, splitCount, -1, 1);
      drawSection(sectionWidth, sectionHeight, splitCount, -1, -1);
    };

    $('.js-split-count-input').on('change', function () {
      context.clearRect(0, 0, canvas.width, canvas.height)
      draw();
    });

    draw();
  })();

  /* B */
  (function () {

    var collatz = function (n) {
      var numbers = [];
      while (n != 1) {
        numbers.push(n);
        n = (n % 2 == 0) ? n / 2 : 3 * n + 1;
      }
      numbers.push(1);

      return numbers;
    };

    var drawCollatz = function (number, valueGetCallback, context, canvas) {
      var stack = [];

      for (var i = 2; i <= number; i++) {
        stack.push(valueGetCallback(collatz(i)));
      }

      var maxValue = Math.max.apply(null, stack);

      stack.forEach(function (el, index) {
        context.beginPath();
        context.arc(canvas.width / number * index, canvas.height - canvas.height / maxValue * el, 2, 0, 2 * Math.PI, false);
        context.fill();
      });
    };

    /* B1 */
    (function () {
      var canvas = document.getElementById('canvasB1');
      var context = canvas.getContext('2d');

      var number = 6000;
      var draw = function () {
        drawCollatz(number, function (collatz) {
          return collatz.length;
        }, context, canvas);
      };

      $('.js-collatz-max-number-input').on('change', function () {
        number = $(this).val();
        context.clearRect(0, 0, canvas.width, canvas.height)
        draw();
      });

      draw();
    })();

    /* B2 */
    (function () {
      var canvas = document.getElementById('canvasB2');
      var context = canvas.getContext('2d');

      var number = 6000;
      var draw = function () {
        drawCollatz(number, function (collatz) {
          return Math.max.apply(null, collatz);
        }, context, canvas);
      };

      $('.js-collatz-max-number-input').on('change', function () {
        number = $(this).val();
        context.clearRect(0, 0, canvas.width, canvas.height)
        draw();
      });

      draw();
    })();


  })();

  /* C */
  (function () {
    var canvas = document.getElementById('canvasC');
    var context = canvas.getContext('2d');

    var image = new BitmapImage(canvas.width, canvas.height);

    var variantButtons = $('.js-variant-button');
    
    var draw = function () {

      var x = Math.floor(canvas.width / 2);
      var y = Math.floor(canvas.height / 2);

      var move = 1;
      var n = 1;
      var phase = 0;


      var variant = variantButtons.filter('.active').attr('data-variant');

      var validNumber = function (n) {

        switch (variant) {
          case 'prime':
            return isPrimeNumber(n);
          case 'mod-3':
            return n % 3 == 0;
          case 'mod-7':
            return n % 7 == 0;
        }

        return false;
      };

      while (n < canvas.width * canvas.height) {

        for (var i = 0; i < move; i++) {
          if (validNumber(n++)) {
            image.set(x, y, 0, 0, 0, 255);
          }
          switch (phase) {
            case 0:
              x++;
              break;
            case 1:
              y--;
              break;
            case 2:
              x--;
              break;
            case 3:
              y++;
              break;
          }
        }

        if (phase == 1 || phase == 3) {
          move++;
        }

        phase = (phase + 1) % 4;
      }

      image.draw(context, 0, 0);
    };

    variantButtons.on('click', function () {
      variantButtons.removeClass('active');
      $(this).addClass('active');
      image.fill(0, 0, 0, 0);
      draw();
    });

    draw();

  })();

  (function () {
    var canvas = document.getElementById('canvasD');
    var context = canvas.getContext('2d');

    var width = canvas.width;
    var height = canvas.height;

    var image = new BitmapImage(width, height);


    var nsdMod = function (a, b) {
      if (b == 0) {
        return a;
      }

      return nsdMod(b, a % b);
    };

    var draw = function () {
      
      var number = parseInt($('.js-nsd-number-input').val());

      for (var x = 1; x <= number; x++) {
        for (var y = 1; y <= number; y++) {
          var nsd = nsdMod(x, y);
          image.set(Math.round(width / number * (x - 1)), height - Math.round(height / number * (y - 1)), 255 - 255 / x * nsd, 255 - 255 / y * nsd, 255, 255);
        }
      }

      image.draw(context, 0, 0);
    };

    $('.js-nsd-number-input').on('change', function () {
      context.clearRect(0, 0, canvas.width, canvas.height);
      draw();
    });

    draw();

  })();

});

function isPrimeNumber(n) {
  if (n <= 1) {
    return false;
  }

  if (n <= 3) {
    return true;
  }

  if (n % 2 == 0 || n % 3 == 0) {
    return false;
  }

  for (var i = 5; i * i < n; i += 6) {
    if (n % i == 0 || n % (i + 2) == 0) {
      return false;
    }
  }

  return true;
}