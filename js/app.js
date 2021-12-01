document.addEventListener('DOMContentLoaded', function() {
  // Navigationsleiste
  var nav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(nav, {edge: 'right'});
  // Einklappbare Textboxen
  var collapse = document.querySelectorAll('.collapsible');
  M.Collapsible.init(collapse);
});

// Service Worker registrierung
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

// Installations-button und -befehl speichern
const installApp = document.getElementById('installApp');
installApp.style.display = 'none'
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
    deferredPrompt = event;
      installApp.style.display = 'block';
});

// Installationsbefehl ausführen
installApp.addEventListener('click', async () => {
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        installApp.style.display = 'none';
      }
      deferredPrompt = null;
    });
});
