self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('medimanage-v1').then((cache) => cache.addAll([
      '/',
      '/index.html'
    ]))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

// Placeholder push handler
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'Reminder', body: 'Time to take your medication.' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/vite.svg',
      actions: [
        { action: 'taken', title: 'Taken' },
        { action: 'snooze', title: 'Snooze' }
      ]
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  // You can route actions here
  event.waitUntil(
    clients.openWindow('/')
  );
});
