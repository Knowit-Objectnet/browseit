console.log('%cJoin us, we have cake.\n%cHello Cutie.', 'color: white; font-size:20pt;', 'color: hotpink; font-size:20pt; font-weight: bold; line-height: 40px;');
console.log('%cHvis du har funnet veien hit så vil du være med i The Web Chapter.', 'font-size:10pt;');
console.log('%cSend oss en kjærlighetsmail da vel: %cthe.web.chapter@knowit.no', 'font-size:10pt;', 'color: hotpink; font-size: 10pt; font-weight: bold;');
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

    var mainPadding = Number($('main').css('padding').match(/\d+/)[0]);
    var mainOffset = (win.width() - $('main').width()) / 2 - mainPadding; // The last -1 is the border of the sideblocks

    // Move main to center
    $('main').css('left', mainOffset + 'px');

    // Pad main with sideblocks
    $('div#leftblock').show().width(mainOffset + 100); // The block starts 100px off-screen due to box-shadow
    $('div#rightblock').show().width(mainOffset + 100); // The block starts 100px off-screen due to box-shadow

    // Move header+shadowbox and footer too
    $('header').css('left', mainOffset + 'px');
    $('div.shadowbox').css('left', mainOffset + 'px');
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
