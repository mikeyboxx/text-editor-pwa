// install button
const butInstall = document.getElementById('buttonInstall');

// before the app is installed, make install button visible
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;
  butInstall.classList.toggle('hidden', false);
});

// event is launched after the app install
window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null;
});

// install button event listener, checks whether the app has been installed. 
// if installed, then do nothing, otherwise prompt user to install app
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
   return;
  }

  promptEvent.prompt();
  window.deferredPrompt = null;
  butInstall.classList.toggle('hidden', true);
});