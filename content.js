const SELECTORS = {
  recommended: '#related',
  comments: '#comments',
  sidebar: '#secondary',
};

function applyStyles(settings) {
  Object.entries(SELECTORS).forEach(([key, selector]) => {
    const settingKey = 'hide' + key.charAt(0).toUpperCase() + key.slice(1);
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      if (settings.enabled && settings[settingKey]) {
        el.style.display = 'none';
      } else {
        el.style.display = '';
      }
    });
  });
}

function init() {
  chrome.storage.sync.get(
    ['enabled', 'hideRecommended', 'hideComments', 'hideSidebar'],
    (settings) => {
      applyStyles(settings);
    }
  );
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'SETTINGS_UPDATED') {
    applyStyles(message.settings);
  }
});

init();
