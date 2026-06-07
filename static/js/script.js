function renderPage() {
  var site = CONFIG.site;
  var profile = CONFIG.profile;

  document.title = site.title;
  document.getElementById('page-favicon').href = site.favicon;
  document.getElementById('page-description').content = site.description;
  document.getElementById('page-keywords').content = site.keywords;

  console.log('%c' + site.console.copyright,
    'background-color: #ff00ff; color: white; font-size: 24px; font-weight: bold; padding: 10px;');
  site.console.cat.forEach(function (line) {
    console.log('%c' + line, 'color: #8B4513; font-size: 20px;');
  });

  document.getElementById('profile-avatar').style.backgroundImage = 'url(' + profile.avatar + ')';
  document.getElementById('index-logo').style.backgroundImage = 'url(' + profile.avatar + ')';
  document.getElementById('index-logo').style.setProperty('--index-logo-avatar', 'url(' + profile.avatar + ')');
  document.querySelectorAll('#profile-avatar-frame, #index-logo img').forEach(function (el) {
    el.src = profile.avatarFrame;
  });

  document.getElementById('welcome-name').textContent = profile.name;
  var roleWords = profile.role.split(' ');
  var lastWord = roleWords.pop();
  document.getElementById('profile-role').innerHTML = '<span class="descriptionIcon">' + SOCIAL_ICONS.profile + '</span><span class="purpleText">' + roleWords.join(' ') + '</span> ' + lastWord;
  document.getElementById('profile-motto').innerHTML = '<span class="descriptionIcon">' + SOCIAL_ICONS.motto + '</span>' + profile.motto.replace(/great/g, '<span class="purpleText textBackground">great</span>').replace(/love/g, '<span class="purpleText textBackground">love</span>');

  var infoHtml = '';
  infoHtml += '<div class="left-des-item">' + SOCIAL_ICONS.location + profile.location + '</div>';
  infoHtml += '<div class="left-des-item">' + SOCIAL_ICONS.organization + profile.organization + '</div>';
  document.getElementById('profile-info').innerHTML = infoHtml;

  var tagsHtml = '';
  profile.tags.forEach(function (tag) {
    tagsHtml += '<div class="left-tag-item">' + tag + '</div>';
  });
  document.getElementById('profile-tags').innerHTML = tagsHtml;

  var lineEl = document.getElementById('line');
  var timelineHtml = '';
  CONFIG.timeline.forEach(function (item) {
    timelineHtml += '<li><div class="focus"></div><div>' + item.text + '</div><div>' + item.date + '</div></li>';
  });
  lineEl.innerHTML = timelineHtml;

  var socialHtml = '';
  CONFIG.socialLinks.forEach(function (link) {
    var iconSvg = SOCIAL_ICONS[link.type] || '';
    var onclick = link.popup ? ' onclick="pop(\'' + link.popup + '\')"' : '';
    socialHtml += '<a class="iconItem"' + onclick + ' href="' + link.url + '">' + iconSvg + '<div class="iconTip">' + link.tip + '</div></a>';
  });
  socialHtml += '<a class="switch" href="javascript:void(0)"><div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked><label class="onoffswitch-label" for="myonoffswitch"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label></div></a>';
  document.getElementById('social-links').innerHTML = socialHtml;

  document.getElementById('sites-title').innerHTML = SOCIAL_ICONS.site + '个人网站';
  document.getElementById('projects-title').innerHTML = SOCIAL_ICONS.project + 'Github项目';
  document.getElementById('sites-list').innerHTML = renderProjectItems(CONFIG.sites, 'a');
  document.getElementById('projects-list').innerHTML = renderProjectItems(CONFIG.projects, 'b');

  document.getElementById('page-footer').innerHTML = site.copyright + ' | <a href="' + site.icp.url + '">' + site.icp.text + '</a>';
}

function renderProjectItems(items, cls) {
  var html = '';
  items.forEach(function (item) {
    html += '<a class="projectItem ' + cls + '" target="_blank" href="' + item.url + '"><div class="projectItemLeft"><h1>' + item.title + '</h1><p>' + item.description + '</p></div><div class="projectItemRight"><img src="' + item.image + '" alt=""></div></a>';
  });
  return html;
}

function toggleClass(selector, className) {
  var elements = document.querySelectorAll(selector);
  elements.forEach(function (element) {
    element.classList.toggle(className);
  });
}

function pop(imageURL) {
  var tcMainElement = document.querySelector(".tc-img");
  if (imageURL) {
    tcMainElement.src = imageURL;
  }
  toggleClass(".tc-main", "active");
  toggleClass(".tc", "active");
}

var tc = document.getElementsByClassName('tc');
var tc_main = document.getElementsByClassName('tc-main');
tc[0].addEventListener('click', function () {
  pop();
});
tc_main[0].addEventListener('click', function (event) {
  event.stopPropagation();
});

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) == 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

renderPage();

document.addEventListener('DOMContentLoaded', function () {
  var html = document.querySelector('html');
  var themeState = getCookie("themeState") || "Light";
  var tanChiShe = document.getElementById("tanChiShe");

  function changeTheme(theme) {
    tanChiShe.src = CONFIG.theme.snakePath + theme + ".svg";
    html.dataset.theme = theme;
    setCookie("themeState", theme, CONFIG.theme.cookieExpireDays);
    themeState = theme;
  }

  var Checkbox = document.getElementById('myonoffswitch')
  Checkbox.addEventListener('change', function () {
    if (themeState == "Dark") {
      changeTheme("Light");
    } else if (themeState == "Light") {
      changeTheme("Dark");
    } else {
      changeTheme("Dark");
    }
  });

  if (themeState == "Dark") {
    Checkbox.checked = false;
  }

  if (CONFIG.theme && CONFIG.theme.background) {
    document.body.style.backgroundImage = 'url(' + CONFIG.theme.background + ')';
  }

  changeTheme(themeState);

  var fpsElement = document.createElement('div');
  fpsElement.id = 'fps';
  fpsElement.style.zIndex = '10000';
  fpsElement.style.position = 'fixed';
  fpsElement.style.left = '0';
  document.body.insertBefore(fpsElement, document.body.firstChild);

  var showFPS = (function () {
    var requestAnimationFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    var fps = 0,
      last = Date.now(),
      offset, step, appendFps;

    step = function () {
      offset = Date.now() - last;
      fps += 1;

      if (offset >= 1000) {
        last += offset;
        appendFps(fps);
        fps = 0;
      }

      requestAnimationFrame(step);
    };

    appendFps = function (fpsValue) {
      fpsElement.textContent = 'FPS: ' + fpsValue;
    };

    step();
  })();

  var buttons = document.querySelectorAll('.projectItem');
  buttons.forEach(function (button) {
    button.addEventListener('mousedown', handlePress);
    button.addEventListener('mouseup', handleRelease);
    button.addEventListener('mouseleave', handleCancel);
    button.addEventListener('touchstart', handlePress);
    button.addEventListener('touchend', handleRelease);
    button.addEventListener('touchcancel', handleCancel);
  });
});

document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

function handlePress() {
  this.classList.add('pressed');
}

function handleRelease() {
  this.classList.remove('pressed');
}

function handleCancel() {
  this.classList.remove('pressed');
}

var pageLoading = document.querySelector("#zyyo-loading");
window.addEventListener('load', function () {
  setTimeout(function () {
    pageLoading.style.opacity = '0';
  }, 100);
});

var analytics = CONFIG && CONFIG.analytics && CONFIG.analytics['51la'];
if (analytics) {
  var s = document.createElement('script');
  s.src = '//sdk.51.la/js-sdk-pro.min.js';
  s.onload = function () {
    if (window.LA && window.LA.init) {
      window.LA.init({ id: analytics.id, ck: analytics.ck });
    }
  };
  document.body.appendChild(s);
}
