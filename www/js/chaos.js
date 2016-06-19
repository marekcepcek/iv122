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

  var OPERATION_FORWARD = 'forward';
  var OPERATION_BACK = 'back';

  var OPERATION_LEFT = 'left';
  var OPERATION_RIGHT = 'right';

  var OPERATION_PUSH = 'push';
  var OPERATION_POP = 'pop';

  var OPERATION_PEN_UP = 'up';
  var OPERATION_PEN_DOWN = 'down';

  var axiomInput = document.querySelector('.js__section-b__axiom-input');
  var rulesInput = document.querySelector('.js__section-b__rules-input');
  var angleInput = document.querySelector('.js__section-b__angle-input');
  var moveInput = document.querySelector('.js__section-b__move-input');
  var stepsCountInput = document.querySelector('.js__section-b__steps-count-input');

  var operationInputs = document.querySelectorAll('.js__section-b__operation-input');

  var lSystemOutput = document.querySelector('.js__section-b__l-system-output');

  var getLSystem = function (axiom, rules, operationsMap, angle, move, stepsCount) {
    var turtle = new Turtle();

    var letter, newAxiom;
    for (var i = 0; i < stepsCount; i++) {
      newAxiom = '';
      axiomLoop: for (var j = 0; j < axiom.length; j++) {
        var letter = axiom[j];
        for (var key in rules) {
          if (letter == key) {
            newAxiom += rules[key];
            continue axiomLoop;
          }
        }
        newAxiom += letter;
      }
      axiom = newAxiom;
    }

    for (var i = 0; i < axiom.length; i++) {
      switch (operationsMap[axiom[i]]) {
        case OPERATION_FORWARD:
          turtle.forward(move);
          break;
        case OPERATION_BACK:
          turtle.back(move);
          break;
        case OPERATION_LEFT:
          turtle.left(angle);
          break;
        case OPERATION_RIGHT:
          turtle.right(angle);
          break;
        case OPERATION_PUSH:
          turtle.push();
          break;
        case OPERATION_POP:
          turtle.pop();
          break;
        case OPERATION_PEN_UP:
          turtle.penup();
          break;
        case OPERATION_PEN_DOWN:
          turtle.pendown();
          break;
      }
    }

    return turtle;
  };

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

    lSystemOutput.innerHTML = getLSystem(axiom, rules, operationsMap, angle, move, stepsCount).drawSvg();
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