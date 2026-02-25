const SETTINGS_KEYS = ['enabled', 'hideRecommended', 'hideComments', 'hideSidebar'];

function updateStatus(enabled) {
  const status = document.getElementById('status');
  status.textContent = enabled ? 'Focus Tube is active.' : 'Focus Tube is disabled.';
}

function saveSettings(settings) {
  chrome.storage.sync.set(settings);
}

function applySettings(settings) {
  document.getElementById('enableToggle').checked = !!settings.enabled;
  document.getElementById('hideRecommended').checked = !!settings.hideRecommended;
  document.getElementById('hideComments').checked = !!settings.hideComments;
  document.getElementById('hideSidebar').checked = !!settings.hideSidebar;
  updateStatus(!!settings.enabled);
}

function notifyContentScript(settings) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].url && tabs[0].url.includes('youtube.com')) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'SETTINGS_UPDATED', settings });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(SETTINGS_KEYS, (settings) => {
    applySettings(settings);
  });

  SETTINGS_KEYS.forEach((key) => {
    const id = key === 'enabled' ? 'enableToggle' : key;
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', () => {
        const updated = { [key]: el.checked };
        saveSettings(updated);
        if (key === 'enabled') updateStatus(el.checked);
        chrome.storage.sync.get(SETTINGS_KEYS, (settings) => {
          notifyContentScript(settings);
        });
      });
    }
  });
});
