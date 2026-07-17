function countMentorBackgrounds(mentors) {
  var counts = {};
  mentors.forEach(function (mentor) {
    var key = mentor.background || '其他背景';
    counts[key] = (counts[key] || 0) + 1;
  });
  return counts;
}

function createBackgroundItem(name, count) {
  return $('<div>')
    .addClass('mentor-background-item')
    .append($('<div>').addClass('mentor-background-name').text(name))
    .append($('<div>').addClass('mentor-background-count').text(count + ' 位'));
}

function createMentorCard(mentor) {
  var photo = mentor.photo || './assets/images/sme.jpg';
  var col = $('<div>').addClass('col-12 col-sm-6 col-lg-3 mb-4');
  var card = $('<a>').addClass('mentor-card').attr('href', mentor.link || 'javascript:;').appendTo(col);
  var imageWrap = $('<div>').addClass('mentor-photo-wrap').appendTo(card);
  $('<div>').addClass('mentor-year-badge').text(mentor.year || '2026').appendTo(imageWrap);
  $('<img>')
    .addClass('mentor-photo')
    .attr('src', photo)
    .attr('alt', mentor.name)
    .attr('onerror', 'this.src="./assets/images/sme.jpg"')
    .appendTo(imageWrap);
  var body = $('<div>').addClass('mentor-body').appendTo(card);
  $('<h3>').addClass('mentor-name').text(mentor.name).appendTo(body);
  $('<div>').addClass('mentor-role').text(`${mentor.organization} ${mentor.title}`).appendTo(body);
  $('<p>').addClass('mentor-description').text(mentor.intro).appendTo(body);
  var footer = $('<div>').addClass('mentor-footer').appendTo(body);
  $('<div>').addClass('mentor-join-tag').text(mentor.tag || '2026 新加入').appendTo(footer);
  $('<div>').addClass('mentor-link-label').text('個人頁 ↗').appendTo(footer);
  return col;
}

$(document).ready(function () {
  var list = $('#mentor-list');
  var empty = $('#mentor-empty');
  var backgroundList = $('#mentor-background-list');
  $('#mentor-total').text('· ' + MENTORS.length + ' 位');

  if (!MENTORS || MENTORS.length === 0) {
    empty.show();
    return;
  }

  var backgroundCounts = countMentorBackgrounds(MENTORS);
  Object.keys(backgroundCounts).forEach(function (background) {
    backgroundList.append(createBackgroundItem(background, backgroundCounts[background]));
  });

  MENTORS.forEach(function (mentor) {
    list.append(createMentorCard(mentor));
  });
});
