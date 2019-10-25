// Log a love letter
const bigBlack = 'color: white; font-size:20pt;';
const bigPink = 'color: hotpink; font-size:20pt; font-weight: bold; line-height: 40px;';
const smallBlack = 'font-size:10pt;';
const smallPinkLink = 'color: hotpink; font-size: 10pt; font-weight: bold;';
console.log('%cHello Cutie.', bigPink);
console.log('%cHvis du har funnet veien hit så vil du være med i 🕸 Web Chapter.', smallBlack);
console.log('%cSend en søt epost til en av lederne da vel. Du finner oss i medlemslisten.', smallBlack);
console.log('%cFinn oss da ❤️ %chttps://projects.knowit.no/display/FAG/Web+Chapter', smallBlack, smallPinkLink);
console.log('');

// Count finished tasks and add to title
var countFinished = function(doSlide) {
  var total = $('input[type="checkbox"]').length;
  var checked = $('input[type="checkbox"]:checked').length;
  $('span#noob_counter').text('(' + checked + '/' + total + ')');
  $('footer #counter').text(checked + '/' + total);
  if (total === checked) {
    if (doSlide)
      $('div#fry').slideDown();
    else
      $('div#fry').show();
  }
  else {
    if (doSlide)
      $('div#fry').slideUp();
    else
      $('div#fry').hide();
  }
};

// go to page
var enterGame = document.createEvent("Event");
var exitGame = document.createEvent("Event");
enterGame.initEvent('enterGame', true, true);
exitGame.initEvent('exitGame', true, true);

$('button').click(function(event) {
  event.preventDefault();
  if(event.target.value == "game") {
    $('#home').hide();
    $('#game').show();
    $('#gameContainer').load("game.html");
    document.dispatchEvent(enterGame);
  } else {
    document.dispatchEvent(exitGame);
    $('#gameContainer').empty();
    $('#game').hide();
    $('#home').show();
  }
  
});

// Add map toggle
const toggleMap = () => $('div#map').slideToggle();
$('img#mapmarker').click(toggleMap);
$('div#map img').click(toggleMap);

// Add version number
$('span.version').text(chrome.app.getDetails().version);

// Hook up links
$('a').click(function(event) {
  event.preventDefault();
  console.log('Link clicked:', this.href);
  Browser.openTab(this.href);
});

// Restore checks to boxes
$('input[type="checkbox"]').each(function(val, i) {
  let checked = localStorage[this.id] === 'true';
  $(this).attr('checked', checked);
});

// Hook up checkboxes
$('input[type="checkbox"]').click(function() {
  console.log('Checkbox clicked:', this.id);
  localStorage[this.id] = this.checked;
  countFinished(true);
});

// Restore text to fields
$('input[type="text"]').each(function(val, i) {
  let text = localStorage[this.id];
  $(this).val(text);
});

// Hook up inputfields
$('input[type="text"]').change(function() {
  console.log('Textfield changed', this.id);
  localStorage[this.id] = $(this).val();
});

// Hook up window resizer (only for when the window is shown in a full page)
var resizer = function(){
  var win = $(this);

  if (win.width() <= 800 && win.height() <= 600) {
    $('img#expand').show();
    $('div#leftblock').hide();
    $('div#rightblock').hide();
  }
  else {
    $('img#expand').hide();

    var mainPadding = Number($('main').css('padding').match(/\d+/g)[1]);
    var mainOffset = (win.width() - $('main').width()) / 2 - mainPadding; // The last -1 is the border of the sideblocks

    // Move main to center
    $('main').css('left', mainOffset + 'px');

    // Pad main with sideblocks
    $('div#leftblock').show().width(mainOffset + 100); // The block starts 100px off-screen due to box-shadow
    $('div#rightblock').show().width(mainOffset + 100); // The block starts 100px off-screen due to box-shadow

    // Move footer too
    $('footer').css('left', mainOffset + 'px');
  }
};
$(window).on('resize', resizer);

// Run now
resizer();
countFinished(false);

// Simple tests
(function() {
  // Test that there are no duplicate IDs
  var individualIds = [];
  $('input[type="checkbox"]').each(function(val, i) {
    individualIds.push(this.id);
  });
  var checkLength = individualIds.length;
  individualIds = individualIds.filter(function(item, index, inputArray) {
    return inputArray.indexOf(item) === index;
  });
  if (checkLength !== individualIds.length) {
    console.error('There is a duplicate checkbox ID somewhere');
  }
  // Test that all fields have a time field (except the tough section)
  // TODO
})();
