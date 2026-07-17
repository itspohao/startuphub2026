function getYearLabel(year) {
  return `${year}年度`;
}

var player = null;

function initYearDropdown() {
  var trigger = $('#team-select');
  var menu = $('.dropdown-menu');

  menu.hide();

  trigger.on('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    menu.toggle();
  });

  menu.on('click', function (event) {
    event.stopPropagation();
  });

  $(document).on('click', function () {
    menu.hide();
  });
}

function createCards(data, year) {
  var img = `./assets/images/${year}/${data.index}/logo.jpg`;
  var card = $('<div>')
    .addClass('thumbnail our-team')
    .attr('data-index', data.index)
    .attr('data-year', year);
  $('<img>').attr('src', img).attr('alt', 'test').appendTo(card);
  var content = $('<div>').addClass('team-content').appendTo(card);
  $('<h3>').addClass('title').text(data.name).appendTo(content);
  $('<span>').addClass('post').text(TAGS[data.tags]).appendTo(content);
  return card;
}

function createSideMenu(data) {
  var item = $('<div>').text(data.name).attr('data-index', data.index);
  return item;
}

function createMobileList(data, year) {
  var img = `./assets/images/${year}/${data.index}/logo.jpg`;
  var item = $('<div>')
    .addClass('list-item')
    .attr('data-index', data.index)
    .attr('data-year', year);
  var avatar = $('<div>').addClass('list-item-avatar');
  $('<img>').addClass('avatar').attr('src', img).appendTo(avatar);
  var content = $('<div>').addClass('list-item-content').text(data.name);
  var chevron = $('<div>').addClass('list-item-chevron');
  $('<i>').addClass('fa fa-chevron-right').appendTo(chevron);
  item.append(avatar);
  item.append(content);
  item.append(chevron);
  return item;
}

function initPage(years) {
  var list = $('#team-list');
  var sideMenu = $('.side-menu');
  var row = $('<div>').addClass('row form-group d-none d-md-flex');
  var mobile = $('<div>').addClass('d-block d-md-none');
  years.forEach((y) => {
    var data = TEAMS[y] || [];
    data.filter(team => !team.hidden).forEach(function (team) {
      var col = $('<div>').addClass('col-12 col-sm-6 col-md-4 col-lg-3').appendTo(row);
      col.append(createCards(team, y));
      sideMenu.append(createSideMenu(team));
      mobile.append(createMobileList(team, y));
    });
  });
  list.append(row);
  list.append(mobile);
  $('.cv-spinner').hide();
  $('#team-list').show();
  // bind click event
  $('div.thumbnail').click(navgation);
  $('.side-menu div').click(navgation);
  $('.list-item').click(navgation);
}

function navgation() {
  var team = $(this).attr('data-index');
  var year = $(this).attr('data-year');
  console.info(`${year}, ${team}`);
  window.location = `./intro.html?team=${team}&year=${year}`;
}

function loadYouTube(year) {
  if (YOUTUBE[year]) {
    var list = $('#team-list');
    var video = $('<div>').addClass('video');
    $('<div>').attr('id', 'player').appendTo(video);
    list.append(video);
    player = new YT.Player('player', {
      videoId: YOUTUBE[year],
    });
  }
}

function clearOverviewVideo() {
  if (player && typeof player.destroy === 'function') {
    player.destroy();
  }
  player = null;
  $('#team-list .video').remove();
}

function refreshOverviewVideo() {
  clearOverviewVideo();
  if (selectedTeam.length === 1) {
    loadYouTube(selectedTeam[0]);
  }
}

// 確保影片會事先載入
function onYouTubeIframeAPIReady() {
  refreshOverviewVideo();
  if (selectedTeam.length > 0) {
    initPage(selectedTeam);
  }
}

var selectedTeam = ['114'];

$(document).ready(function () {
  var TOTALYEAR = ['108', '109', '110', '111', '112', '113', '114', '115'];
  $('#team-select').html(getYearLabel(selectedTeam[0])).append('<span class="caret"></span>');
  initYearDropdown();
  $('.float').hover(
    function () {
      $(this).stop().animate({ right: '0' }, 'medium');
    },
    function () {
      $(this).stop().animate({ right: '-20vw' }, 'medium');
    },
    500
  );
  $('.dropdown-menu>li>a').click(function () {
    var list = $('#team-list');
    var sideMenu = $('.side-menu');
    $('.cv-spinner').show();
    list.hide();
    list.empty();
    sideMenu.empty();
    var selection = $(this).attr('data-value');
    var select = $('#team-select');
    select.html(selection === 'all' ? $(this).text() : getYearLabel(selection)).append('<span class="caret"></span>');
    $('.dropdown-menu').hide();
    selectedTeam = selection === 'all' ? TOTALYEAR : [selection];

    setTimeout(() => {
      if (YT.loaded) {
        refreshOverviewVideo();
      }
      initPage(selectedTeam);
    }, 500);
  });
});
