/* A */
(function () {

  var countInput = document.querySelector('.js__section-a__count-input');
  var ratioInput = document.querySelector('.js__section-a__ratio-input');
  var sizeInput = document.querySelector('.js__section-a__size-input');
  var iterationsCountInput = document.querySelector('.js__section-a__iterations-count-input');

  var chaosOutput = document.querySelector('.js__section-a__chaos-output');

  var getChaos = function (polygon, ratio, iterationsCount) {
    var image = new VectorImage();

    var box = polygon.getBox();

    var width = polygon.getWidth();
    var height = polygon.getHeight();

    var vertices = polygon.getVertices();

    var p, v, line;
    do { // najdeme bod vo vnutri
      p = new Point(Math.random() * width + box.left, Math.random() * height + box.top);
    } while (!polygon.inside(p));

    var i = 0;
    while (i < iterationsCount) {
      v = vertices[Math.floor(Math.random() * vertices.length)];

      line = new Line(v, p);

      p = line.getPoint(ratio);
      p.style.size = 1;
      image.add(p);
      i++;
    };

    return image;
  };

  var work = function () {
    chaosOutput.innerHTML = getChaos(Polygon.getRegularPolygon(countInput.value, sizeInput.value), ratioInput.value, iterationsCountInput.value).drawSvg();
  };

  countInput.addEventListener('change', work);
  sizeInput.addEventListener('change', work);
  ratioInput.addEventListener('change', work);
  iterationsCountInput.addEventListener('change', work);

  work();
})();

/* B */
(function () {

  var RULES_SEPARATOR = ',';
  var RULE_OPERATOR = '=>';

  var axiomInput = document.querySelector('.js__section-b__axiom-input');
  var rulesInput = document.querySelector('.js__section-b__rules-input');
  var angleInput = document.querySelector('.js__section-b__angle-input');
  var moveInput = document.querySelector('.js__section-b__move-input');
  var stepsCountInput = document.querySelector('.js__section-b__steps-count-input');

  var operationInputs = document.querySelectorAll('.js__section-b__operation-input');

  var lSystemOutput = document.querySelector('.js__section-b__l-system-output');

  var work = function () {

    var axiom = axiomInput.value.replace(/\s/g, '');

    var rules = {};
    rulesInput.value.replace(/\s/g, '').split(RULES_SEPARATOR).forEach(function (value) {
      var parts = value.split(RULE_OPERATOR, 2);
      
      if (parts.length == 2 && parts[0] != '') {
        rules[parts[0]] = parts[1];
      }
    });

    var operators, operator, operationsMap = {};
    for (var i = 0; i < operationInputs.length; i++) {
      operators = operationInputs[i].value.split(RULES_SEPARATOR);

      for (var j = 0; j < operators.length; j++) {
        operator = operators[j].trim();
        if (operator != '') {
          operationsMap[operator] = operationInputs[i].getAttribute('data-operation');
        }
      }
    }

    var angle = parseFloat(angleInput.value);
    var move = parseFloat(moveInput.value);
    var stepsCount = parseInt(stepsCountInput.value);

    var image = new VectorImage();

    image.add(LSystem.create(axiom, rules, operationsMap, angle, move, stepsCount));

    lSystemOutput.innerHTML = image.drawSvg();
  };

  axiomInput.addEventListener('change', work);
  rulesInput.addEventListener('change', work);
  angleInput.addEventListener('change', work);
  moveInput.addEventListener('change', work);
  stepsCountInput.addEventListener('change', work);

  for (var i = 0; i < operationInputs.length; i++) {
    operationInputs[i].addEventListener('change', work);
  }

  work();
})();