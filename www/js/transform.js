/* A */
(function () {

  var inputs = document.querySelectorAll('.js__section-a__input');
  var output = document.querySelector('.js__section-a__output');

  var work = function () {

    var image = new VectorImage();

    var values = {};

    for (var i = 0; i < inputs.length; i++) {
      values[inputs[i].getAttribute('data-name')] = inputs[i].value;
    }

    var transformations = [];
    values['transformation'].split(';').map(function (item) {
      try {
        transformations.push(eval('Transformation.' + item.trim()));
      } catch(e) {
      }
    });

    var polygon = Polygon.getRegularPolygon(parseFloat(values['n']), parseFloat(values['size']));
    var iterationsCount = parseInt(values['iterationsCount']);

    var transformation = Transformation.combine(transformations);

    image.add(polygon);
    if (transformation) {
      for (var i = 0; i < iterationsCount; i++) {
        polygon.transform(transformation);
        image.add(polygon.clone());
      };
    }

    output.innerHTML = image.drawSvg();
  };

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', work);
  }

  work();
})();


/**
 *
 * @param {Object} object
 * @param {Array} transformations
 * @param {type} iterationsCount
 * @returns {VectorImage}
 */
var mrcm = function (object, transformations, iterationsCount) {
  var stack = transformations.slice(0);

  for (var n = 0; n < iterationsCount; n++) {
    var temp = [];
    for (var i in stack) {
      for (var j in transformations) {
        temp.push(Transformation.combine([transformations[j], stack[i]]));
      }
    }
    stack = temp;
  }

  var image = new VectorImage();

  for (var i in stack) {
    image.add(object.clone().transform(stack[i]));
  }

  return image;
};

/* B */
(function () {

  var inputs = document.querySelectorAll('.js__section-b__input');
  var output = document.querySelector('.js__section-b__output');

  var work = function () {

    var values = {};

    for (var i = 0; i < inputs.length; i++) {
      values[inputs[i].getAttribute('data-name')] = inputs[i].value;
    }

    var transformations = [];
    values['transformation'].split(';').map(function (item) {
      try {
        transformations.push(eval('Transformation.' + item.trim()));
      } catch(e) {
      }
    });

    var polygon = Polygon.getRegularPolygon(parseFloat(values['n']), parseFloat(values['size']));
    var iterationsCount = parseInt(values['iterationsCount']);

    output.innerHTML = mrcm(polygon, transformations, iterationsCount).drawSvg();//image.drawSvg();
  };

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', work);
  }

  work();
})();

/* C */
(function () {

  var inputs = document.querySelectorAll('.js__section-c__input');
  var output = document.querySelector('.js__section-c__output');

  var work = function () {

    var values = {};

    for (var i = 0; i < inputs.length; i++) {
      values[inputs[i].getAttribute('data-name')] = inputs[i].value;
    }

    var transformations = [];
    values['transformation'].split(';').map(function (item) {
      try {
        transformations.push(eval('Transformation.' + item.trim()));
      } catch(e) {
      }
    });

    var operationsMap = {
      'F': LSystem.OPERATION_FORWARD,
      '+': LSystem.OPERATION_RIGHT
    };

    var lSystem = LSystem.create('FF+FFF+FF+FFF', {}, operationsMap, 90, 500, 0);
    var iterationsCount = parseInt(values['iterationsCount']);
    
    output.innerHTML = mrcm(lSystem, transformations, iterationsCount).drawSvg();
  };

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', work);
  }

  work();
})();
