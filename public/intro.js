var player;

function initIntro(team) {
  var description = $('.project_description');
  var buttonGroup = $('#social-link');
  console.log(team)
  $('#team_name h4 span').text(team.name);
  team.intro.forEach((element) => {
    $('<p>').text(element).appendTo(description);
  });
  if (team.product && team.product.length > 0) {
    $('<h4>').text('產品與服務').appendTo(description);
    team.product.forEach((element) => {
      $('<p>').text(element).appendTo(description);
    });
  }
  if (team.web) {
    buttonGroup.append(initSocialButton(0, team.web));
  }
  if (team.fb) {
    buttonGroup.append(initSocialButton(1, team.fb));
  }
  if (team.ig) {
    buttonGroup.append(initSocialButton(2, team.ig));
  }
  if (team.podcast) {
    buttonGroup.append(initSocialButton(3, team.podcast));
  }
}
function initSocialButton(type, url) {
  var icon = '';
  switch (type) {
    case 0:
      icon = 'fa fa-globe';
      break;
    case 1:
      icon = 'fa fa-facebook';
      break;
    case 2:
      icon = 'fa fa-instagram';
      break;
    case 3:
      icon = 'fa fa-bullhorn';
      break;
    default:
      return;
  }
  var btn = $('<button>').attr('type', 'button').addClass('btn');
  $('<i>').addClass(icon).appendTo(btn);
  btn.on('click', function () {
    window.open(url, '_blank').focus();
  });
  return btn;
}
function initImagesCarousel(team, year) {
  var list = $('.carousel-inner');
  var indicator = $('.carousel-indicators');
  var indicatorIndex = 0;
  var index = team.index;


  if (team.youtube) {
    var item = $('<div>').addClass('item').appendTo(list);
    var container = $('<div>').addClass('video-container').appendTo(item);
    $('<div>').attr('id', 'player').appendTo(container);
    loadIFramePlayerAPI();
    $('<li>')
      .attr('data-target', '#myCarousel')
      .attr('data-slide-to', indicatorIndex)
      .appendTo(indicator);
    indicatorIndex++;
  }
  for (var i = 0; i < 2; i++) {
    var item = $('<div>').addClass('item').appendTo(list);
    var img = `./assets/images/${year}/${index}/carousel${i + 1}.jpg`;
    $('<img>')
      .attr('src', img)
      .attr('onerror', 'this.src="./assets/images/sme.jpg"')
      .css('width', '100%')
      .appendTo(item);
    $('<li>')
      .attr('data-target', '#myCarousel')
      .attr('data-slide-to', indicatorIndex)
      .appendTo(indicator);
    indicatorIndex++;
  }
  list.children().first().addClass('active');
  indicator.children().first().addClass('active');
}

function initTeamsCarousel(data, year) {
  var list = $('#carousel_list');
  $(data).each(function (index, team) {
    var img = `./assets/images/${year}/${index}/logo.jpg`;
    var card = $('<div>')
      .addClass('thumbnail our-team')
      .attr('data-index', team.index)
      .attr('data-year', year);
    $('<img>').attr('src', img).attr('alt', 'test').appendTo(card);
    var content = $('<div>').addClass('team-content').appendTo(card);
    $('<h3>').addClass('title').text(team.name).appendTo(content);
    $('<span>').addClass('post').text(TAGS[team.tags]).appendTo(content);
    list.append(card);
  });
}

function getTeamIndex() {
  var results = new RegExp('[?&]team=([^&#]*)').exec(window.location.search);
  return results !== null ? results[1] || 0 : false;
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    $('#myCarousel').carousel('pause');
  }
  if (event.data === YT.PlayerState.PAUSED) {
    $('#myCarousel').carousel('cycle');
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: TEAMS[getTeamYear()][getTeamIndex()].youtube,
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
}

function loadIFramePlayerAPI() {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function getTeamYear() {
  var results = new RegExp('[?&]year=([^&#]*)').exec(window.location.search);
  return results !== null ? results[1] || 0 : false;
}

function formatTeamValue(value, fallback) {
  if (Array.isArray(value)) {
    value = value.filter(Boolean).join('、');
  }
  return value || fallback;
}

function appendTeamInfo(container, label, value, fallback) {
  $('<div>')
    .text(`${label}：${formatTeamValue(value, fallback)}`)
    .appendTo(container);
}

function initSpContent(team, year) {
  var index = team.index;
  var hasNewContent = Array.isArray(team.section);
  var coverImage = hasNewContent ? 'cover.jpg' : 'carousel1.jpg';
  var detailTexts = hasNewContent ? team.section : team.intro || [];
  var imageCount = hasNewContent ? ('imgs' in team ? team.imgs : 2) : 2;

  if (team.youtube) {
    var vid = $('#sp-content-vid');
    vid.addClass('video');
    $('<div>').attr('id', 'player').appendTo(vid);
    loadIFramePlayerAPI();
  }

  var cover = $('.cover-photo');
  $('<img>')
    .attr('src', `./assets/images/${year}/${index}/${coverImage}`)
    .attr('alt', `${team.name} 團隊圖片`)
    .attr('onerror', 'this.src="./assets/images/sme.jpg"')
    .css('width', '100%')
    .css('aspect-ratio', 'auto')
    .css('object-fit', 'cover')
    .appendTo($('.cover'));
  $('<p>')
    .text(`圖片來源：由${team.name}提供`)
    .css('text-align', 'end')
    .css('color', '#787878')
    .css('font-size', '0.8rem')
    .appendTo(cover);

  var intro = $('.intro');
  appendTeamInfo(intro, '團隊名稱', team.name, '未提供');
  appendTeamInfo(intro, '產品服務', team.product, '未提供');
  appendTeamInfo(intro, '發展階段', team.stage, '未提供');
  appendTeamInfo(intro, '登記時間', team.found, '未提供');
  appendTeamInfo(intro, '募資階段', team.funding, '未提供');
  intro.addClass('label-text');

  var detail = $('.detail');
  detailTexts.forEach((text, i) => {
    var block = $('<div>')
      .css('margin-top', '24px')
      .css('text-align', 'center')
      .appendTo(detail);
    var description = $('<div>')
      .css('text-align', 'left')
      .css('line-height', '35px')
      .css('font-size', '1.2rem')
      .appendTo(block);

    if (hasNewContent) {
      description.html(text);
    } else {
      description.text(text);
    }

    if (i < imageCount) {
      var imageName = hasNewContent ? `team_photo_${i + 1}.jpg` : `carousel${i + 1}.jpg`;
      $('<img>')
        .attr('src', `./assets/images/${year}/${index}/${imageName}`)
        .attr('alt', `${team.name} 團隊圖片 ${i + 1}`)
        .attr('onerror', 'this.src="./assets/images/sme.jpg"')
        .css('margin-top', '16px')
        .css('width', '100%')
        .css('aspect-ratio', 'auto')
        .css('object-fit', 'cover')
        .appendTo(block);
    }
  });

  var remark = $('.remark').addClass('label-text');
  var link = $('<div>').text(`官方網站：`).appendTo(remark);
  if (team.web) {
    $('<a>')
      .attr({ href: team.web, target: '_blank', rel: 'noopener noreferrer' })
      .text(team.web)
      .appendTo(link);
  } else {
    $('<span>').text('建置中').appendTo(link);
  }

  $('<div>')
    .css({ display: 'flex' })
    .html(
      `<div style='white-space: nowrap;'>徵求資源：</div><div>${formatTeamValue(team.resource, '暫無')}</div>`
    )
    .appendTo(remark);
}

$(document).ready(function () {
  var teamIndex = getTeamIndex();
  var teamYear = getTeamYear();
  var data = TEAMS[teamYear];

  $('.intro-content').hide();
  initSpContent(data[teamIndex], teamYear);
  initTeamsCarousel(data, teamYear);

  $('.owl-carousel').owlCarousel({
    startPosition: teamIndex,
    loop: true,
    margin: 10,
    nav: true,
    navText: ['', ''],
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });  

  $('div.thumbnail').click(function () {
    var team = $(this).attr('data-index');
    var year = $(this).attr('data-year');
    window.location = `./intro.html?team=${team}&year=${year}`;
  });
});
