function getYearLabel(year) {
  return `${year}年度`;
}

function createCards(data, year) {
  var img = `./assets/images/${year}/${data.index}/logo.jpg`;
  var card = $('<a>')
    .addClass('thumbnail our-team')
    .attr('href', `./intro.html?team=${data.index}&year=${year}`)
    .attr('aria-label', `查看${data.name}團隊介紹`);
  $('<img>').attr('src', img).attr('alt', `${data.name} logo`).appendTo(card);
  var content = $('<div>').addClass('team-content').appendTo(card);
  $('<h2>').addClass('title').text(data.name).appendTo(content);
  $('<span>').addClass('post').text(TAGS[data.tags]).appendTo(content);
  return card;
}

function createMobileList(data, year) {
  var img = `./assets/images/${year}/${data.index}/logo.jpg`;
  var item = $('<a>')
    .addClass('list-item')
    .attr('href', `./intro.html?team=${data.index}&year=${year}`)
    .attr('aria-label', `查看${data.name}團隊介紹`);
  var avatar = $('<div>').addClass('list-item-avatar');
  $('<img>').addClass('avatar').attr('src', img).attr('alt', `${data.name} logo`).appendTo(avatar);
  var content = $('<h2>').addClass('list-item-content').text(data.name);
  var chevron = $('<div>').addClass('list-item-chevron').attr('aria-hidden', 'true');
  $('<i>').addClass('fa fa-chevron-right').appendTo(chevron);
  item.append(avatar);
  item.append(content);
  item.append(chevron);
  return item;
}

function initPage(years) {
  var list = $('#team-list');
  var row = $('<div>').addClass('row form-group d-none d-md-flex');
  var mobile = $('<div>').addClass('d-block d-md-none');
  var teamCount = 0;
  list.attr('aria-busy', 'true').empty();
  years.forEach((y) => {
    var data = TEAMS[y] || [];
    data.filter(team => !team.hidden).forEach(function (team) {
      var col = $('<div>').addClass('col-12 col-sm-6 col-md-4 col-lg-3').appendTo(row);
      col.append(createCards(team, y));
      mobile.append(createMobileList(team, y));
      teamCount++;
    });
  });
  list.append(row);
  list.append(mobile);
  $('.cv-spinner').hide();
  $('#team-list').attr('aria-busy', 'false').show();
  $('#team-status').text(
    years.length === 1
      ? `已載入${getYearLabel(years[0])}，共${teamCount}個團隊。`
      : `已載入全部團隊，共${teamCount}個團隊。`
  );
}

function loadYouTube(year) {
  if (!YOUTUBE[year]) return;

  var list = $('#team-list');
  var title = `觀看${getYearLabel(year)}團隊介紹影片`;
  var videoId = encodeURIComponent(YOUTUBE[year]);
  var thumbnailSources = [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  ];
  var thumbnailIndex = 0;
  var link = $('<a>')
    .addClass('youtube-link-card')
    .attr({
      href: `https://www.youtube.com/watch?v=${videoId}`,
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': `${title}（YouTube，另開新視窗）`,
    });
  var thumbnail = $('<img>')
    .attr({
      src: thumbnailSources[thumbnailIndex],
      alt: '',
    })
    .on('error', function () {
      thumbnailIndex += 1;
      if (thumbnailIndex < thumbnailSources.length) {
        this.src = thumbnailSources[thumbnailIndex];
      } else {
        thumbnail.off('error');
        this.src = './assets/images/sme.jpg';
      }
    });
  $('<span>').addClass('youtube-thumbnail').append(thumbnail).appendTo(link);
  $('<span>').addClass('youtube-link-title').text(title).appendTo(link);
  $('<div>').addClass('video').append(link).appendTo(list);
}

function clearOverviewVideo() {
  $('#team-list .video').remove();
}

function refreshOverviewVideo() {
  clearOverviewVideo();
  if (selectedTeam.length === 1) {
    loadYouTube(selectedTeam[0]);
  }
}

var selectedTeam = ['115'];

$(document).ready(function () {
  var TOTALYEAR = ['108', '109', '110', '111', '112', '113', '114', '115'];
  $('#team-select').val(selectedTeam[0]);
  initPage(selectedTeam);
  $('#team-select').on('change', function () {
    var selection = $(this).val();
    selectedTeam = selection === 'all' ? TOTALYEAR : [selection];
    initPage(selectedTeam);
    refreshOverviewVideo();
  });
  refreshOverviewVideo();
});
