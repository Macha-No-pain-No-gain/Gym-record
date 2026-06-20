// Gym Timer Service Worker
// Handles notification clicks to bring the app to foreground

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      // Focus existing tab if open
      for (const client of list) {
        if (client.url.includes('gym.html') && 'focus' in client) return client.focus();
      }
      // Otherwise open a new tab
      return self.clients.openWindow('./gym.html');
    })
  );
});
