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

var win = $(this);

// TODO: One beautiful day we may use syncStorage instead of localStorage, but
//       browser support cannot be an issue.

// Important: Do this check before anything else, to open the expanded version
// of the page as fast as possible if that is what the user desires.
// If "always expand" is already checked, open window immediately.
if (localStorage.expandInput === 'true') {
  // localStorage.pleaseExpand is used to detect whether this page was
  // opened by the popup or directly by the user. Prevents making infinite
  // BrowseIts. Although infinite BrowseIt tabs is a quite desirable outcome.
  if (localStorage.pleaseExpand === 'pending') {
    // Welcome to the expanded page
    localStorage.pleaseExpand = 'handled';
    // Important: We check "pending" first and set it to "handled" before
    // we check window size to figure out if this is actually the right
    // page. This may seem like a logical error at first glance, but is by
    // design: It prevents BrowseIt from opening infinite BrowseIt tabs if
    // the browser window is smaller than the popup. TODO: Or we could just
    // improve the check for whether this is a popup? Maybe some other day.
  } else if (win.width() <= 800 && win.height() <= 600) {
    // Sending you to the expanded page, kthxbye
    localStorage.pleaseExpand === 'pending'
    window.open(document.URL);
  }
}

/**
 * Use this string as a jQuery selector for finding all the nooblist checkboxes.
 * As you may notice, we put `data-nope="noCount"` on non-nooblist checkboxes
 * to make life easy and fast for ourselves.
 */
const noobCheckBoxes = 'input[type="checkbox"]:not(input[data-nope="noCount"])';

// Count finished tasks and add to title
var countFinished = function(doSlide) {
  var total = $(noobCheckBoxes).length;
  var checked = $(noobCheckBoxes).filter((i,box) => box.checked).length;
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

// Open / close game
$('#gameButton').click(function(event) {
  event.preventDefault();
  $('#home').hide();
  $('#game').show();
  $("#mapmarker").hide();
  enterGame();
});
$('#homeButton').click(function(event) {
  event.preventDefault();
  $('#game').hide();
  $('#home').show();
  $("#mapmarker").show();
  exitGame();
})

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
$(noobCheckBoxes).each(function(val, i) {
  let checked = localStorage[this.id] === 'true';
  $(this).attr('checked', checked);
});

// Hook up checkboxes
$(noobCheckBoxes).click(function() {
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

// Hook up "always expand" checkbox (only visible in expanded mode)
$('input#expandInput').change(function() {
  console.log('Always expand changed', this.id, $(this).val());
  localStorage[this.id] = this.checked;
});
// Restore check to "always expand" input
if (localStorage.expandInput === 'true') {
  $('input#expandInput').attr('checked', true);
}

// Hook up window resizer (only for when the window is shown in a full page)
var resizer = function(){
  if (win.width() <= 800 && win.height() <= 600) {
    $('span#alwaysExpand').hide();
    $('div#leftblock').hide();
    $('div#rightblock').hide();
  }
  else {
    $('a#expandLink').hide();

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
  // TODO: Test that all fields have a time field (except the tough section)
})();
