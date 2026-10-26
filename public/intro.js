function initIntro(team) {
  var description = $('.project_description');
  var buttonGroup = $('#social-link');
  $('#team_name .team-name').text(team.name);
  buttonGroup.attr('aria-label', `${team.name}相關連結`);
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
  var label = '';
  switch (type) {
    case 0:
      icon = 'fa fa-globe';
      label = '官方網站';
      break;
    case 1:
      icon = 'fa fa-facebook';
      label = 'Facebook 官方頁面';
      break;
    case 2:
      icon = 'fa fa-instagram';
      label = 'Instagram 官方頁面';
      break;
    case 3:
      icon = 'fa fa-bullhorn';
      label = 'Podcast';
      break;
    default:
      return;
  }
  var link = $('<a>')
    .addClass('btn')
    .attr({
      href: url,
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': `${label}（另開新視窗）`,
    });
  $('<i>').addClass(icon).attr('aria-hidden', 'true').appendTo(link);
  $('<span>').addClass('sr-only').text(`${label}（另開新視窗）`).appendTo(link);
  return link;
}

function createYouTubeLink(videoId, title) {
  var encodedVideoId = encodeURIComponent(videoId);
  var thumbnailSources = [
    `https://img.youtube.com/vi/${encodedVideoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${encodedVideoId}/sddefault.jpg`,
    `https://img.youtube.com/vi/${encodedVideoId}/hqdefault.jpg`,
  ];
  var thumbnailIndex = 0;
  var link = $('<a>')
    .addClass('youtube-link-card')
    .attr({
      href: `https://www.youtube.com/watch?v=${encodedVideoId}`,
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
  return link;
}

function initImagesCarousel(team, year) {
  var list = $('.carousel-inner');
  var indicator = $('.carousel-indicators');
  var indicatorIndex = 0;
  var index = team.index;


  if (team.youtube) {
    var item = $('<div>').addClass('item').appendTo(list);
    createYouTubeLink(team.youtube, `觀看${team.name}團隊介紹影片`).appendTo(item);
    $('<li>')
      .append(
        $('<button>')
          .attr({
            type: 'button',
            'data-target': '#myCarousel',
            'data-slide-to': indicatorIndex,
            'aria-label': `顯示第 ${indicatorIndex + 1} 項媒體`,
          })
          .append($('<span>').addClass('sr-only').text(`顯示第 ${indicatorIndex + 1} 項媒體`))
      )
      .appendTo(indicator);
    indicatorIndex++;
  }
  for (var i = 0; i < 2; i++) {
    var item = $('<div>').addClass('item').appendTo(list);
    var img = `./assets/images/${year}/${index}/carousel${i + 1}.jpg`;
    $('<img>')
      .attr('src', img)
      .attr('alt', `${team.name} 團隊輪播圖片 ${i + 1}`)
      .attr('onerror', 'this.src="./assets/images/sme.jpg"')
      .css('width', '100%')
      .appendTo(item);
    $('<li>')
      .append(
        $('<button>')
          .attr({
            type: 'button',
            'data-target': '#myCarousel',
            'data-slide-to': indicatorIndex,
            'aria-label': `顯示第 ${indicatorIndex + 1} 張圖片`,
          })
          .append($('<span>').addClass('sr-only').text(`顯示第 ${indicatorIndex + 1} 張圖片`))
      )
      .appendTo(indicator);
    indicatorIndex++;
  }
  list.children().first().addClass('active');
  indicator.children().first().addClass('active').find('button').attr('aria-current', 'true');
}

function initTeamsCarousel(data, year) {
  var list = $('#carousel_list');
  $(data).each(function (index, team) {
    var img = `./assets/images/${year}/${index}/logo.jpg`;
    var card = $('<a>')
      .addClass('thumbnail our-team')
      .attr({
        href: `./intro.html?team=${team.index}&year=${year}`,
        'aria-label': `查看${team.name}團隊介紹`,
      });
    $('<img>').attr('src', img).attr('alt', `${team.name} logo`).appendTo(card);
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
  // 舊年度以 carousel1.jpg 作為封面，內容圖片從 carousel2.jpg 起算，避免重複顯示封面。
  var contentImageCount = hasNewContent ? imageCount : Math.max(imageCount - 1, 0);
  var sectionTitles = ['解決方案介紹', '解決痛點', '團隊介紹'];

  $('#team-page-title').text(team.name);
  document.title = `${team.name}｜新創基地團隊｜新創圓夢網`;

  if (team.youtube) {
    var vid = $('#sp-content-vid');
    vid.addClass('video');
    createYouTubeLink(team.youtube, `觀看${team.name}團隊介紹影片`).appendTo(vid);
  }

  var cover = $('.cover-photo');
  $('<img>')
    .attr('src', `./assets/images/${year}/${index}/${coverImage}`)
    .attr('alt', team.coverAlt || `${team.name} 封面圖片`)
    .attr('onerror', 'this.src="./assets/images/sme.jpg"')
    .css('width', '100%')
    .css('aspect-ratio', 'auto')
    .css('object-fit', 'cover')
    .appendTo($('.cover'));
  $('<p>')
    .text(`圖片來源：${team.imageSource || `由${team.name}提供`}`)
    .css('text-align', 'end')
    .css('color', '#767676')
    .css('font-size', '0.8rem')
    .appendTo(cover);

  var intro = $('.intro');
  appendTeamInfo(intro, '團隊名稱', team.name, '未提供');
  if (team.tagline) {
    appendTeamInfo(intro, '一句話形容自己', team.tagline, '');
  }
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
    $('<h2>')
      .addClass('sr-only')
      .text((team.sectionTitles && team.sectionTitles[i]) || sectionTitles[i] || '補充資訊')
      .appendTo(block);
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

    if (i < contentImageCount) {
      var imageName = hasNewContent ? `team_photo_${i + 1}.jpg` : `carousel${i + 2}.jpg`;
      $('<img>')
        .attr('src', `./assets/images/${year}/${index}/${imageName}`)
        .attr('alt', (team.imageAlts && team.imageAlts[i]) || `${team.name} 產品或團隊介紹圖片 ${i + 1}`)
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
      .attr({
        href: team.web,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `前往${team.name}官方網站（另開新視窗）`,
      })
      .text(team.web)
      .append($('<span>').addClass('sr-only').text('（另開新視窗）'))
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

  if (!data || !data[teamIndex]) {
    $('#team-page-title').text('找不到團隊資料');
    document.title = '找不到團隊資料｜新創基地｜新創圓夢網';
    return;
  }

  $('.intro-content').hide();
  initSpContent(data[teamIndex], teamYear);
  initTeamsCarousel(data, teamYear);

  if ($.fn.owlCarousel) {
    $('.owl-carousel').owlCarousel({
      startPosition: teamIndex,
      loop: true,
      margin: 10,
      nav: true,
      navText: [
        '<span class="sr-only">上一個團隊</span>',
        '<span class="sr-only">下一個團隊</span>',
      ],
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
    $('.owl-prev').attr('aria-label', '上一個團隊');
    $('.owl-next').attr('aria-label', '下一個團隊');
  }
});
