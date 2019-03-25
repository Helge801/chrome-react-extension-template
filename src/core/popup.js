import browser from 'webextension-polyfill';

browser.runtime.getBackgroundPage().then(x => {
  const container = document.getElementById('popup');
  const subscription = x.manager.renderPopup(container).subscribe();

  window.addEventListener('unload', event => {
    subscription.unsubscribe();
  });
});
