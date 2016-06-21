var LSystem = {

  OPERATION_FORWARD: 'forward',
  OPERATION_BACK: 'back',

  OPERATION_LEFT: 'left',
  OPERATION_RIGHT: 'right',

  OPERATION_PUSH: 'push',
  OPERATION_POP: 'pop',

  OPERATION_PEN_UP: 'up',
  OPERATION_PEN_DOWN: 'down',

  /**
   *
   * @param {String} axiom
   * @param {Object} rules
   * @param {Object} operationsMap
   * @param {Number} angle
   * @param {Number} move
   * @param {Number} stepsCount
   * @returns {Turtle}
   */
  create: function (axiom, rules, operationsMap, angle, move, stepsCount) {
    var turtle = new Turtle();

    for (var i = 0; i < stepsCount; i++) {
      var newAxiom = '';
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
        case LSystem.OPERATION_FORWARD:
          turtle.forward(move);
          break;
        case LSystem.OPERATION_BACK:
          turtle.back(move);
          break;
        case LSystem.OPERATION_LEFT:
          turtle.left(angle);
          break;
        case LSystem.OPERATION_RIGHT:
          turtle.right(angle);
          break;
        case LSystem.OPERATION_PUSH:
          turtle.push();
          break;
        case LSystem.OPERATION_POP:
          turtle.pop();
          break;
        case LSystem.OPERATION_PEN_UP:
          turtle.penup();
          break;
        case LSystem.OPERATION_PEN_DOWN:
          turtle.pendown();
          break;
      }
    }

    return turtle;
  }
};
