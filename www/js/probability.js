/* A */
(function () {

  var inputs = document.querySelectorAll('.js__section-a__input');
  var randomOutput = document.querySelector('.js__section-a__random-output');
  var changeOutput = document.querySelector('.js__section-a__change-output');
  var stayOutput = document.querySelector('.js__section-a__stay-output');

  var METHOD_CHANGE = 'change';
  var METHOD_RANDOM = 'random';
  var METHOD_STAY = 'stay';

  var getRandom = function (a, b) {
    return a + Math.floor(Math.random() * ((b - a) + 1));
  };

  var symulateMontyHall = function (method) {
    var win, select, open;

    win = getRandom(0, 2); // 0,1,2
    select = getRandom(0, 2);

    for (var i = 0; i < 3; i++) {
      if (win != i && select != i) {
        open = i;
        break;
      }
    }

    var change = function (select, open) {
      for (var i = 0; i < 3; i++) {
        if (open != i && select != i) {
          return i;
        }
      }
    };

    switch (method) {
      case METHOD_CHANGE:
        select = change(select, open);
        break;
      case METHOD_RANDOM:
        if (getRandom(0, 1)) {
          select = change(select, open);
        }
        break;
      case METHOD_STAY:
        // nerob nic
        break;
    }

    return select == win ? 0 : 1;
  };

  var work = function () {
    var values = {};

    for (var i = 0; i < inputs.length; i++) {
      values[inputs[i].getAttribute('data-name')] = inputs[i].value;
    }

    var iterationsCount = parseInt(values['iterationsCount']);

    var randomWins = 0;
    var changeWins = 0;
    var stayWins = 0;

    for (var i = 0; i < iterationsCount; i++) {
      changeWins += symulateMontyHall(METHOD_CHANGE);
      randomWins += symulateMontyHall(METHOD_RANDOM);
      stayWins += symulateMontyHall(METHOD_STAY);
    }

    randomOutput.innerHTML = (randomWins / iterationsCount * 100).toFixed(2) + ' %';
    changeOutput.innerHTML = (changeWins / iterationsCount * 100).toFixed(2) + ' %';
    stayOutput.innerHTML = (stayWins / iterationsCount * 100).toFixed(2) + ' %';
  };

  document.querySelector('.js__section-a__symulate-button').addEventListener('click', function (event) {
    event.preventDefault();
    work();
  });

  work();
})();
