import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './frontend/theme/global.css'; // Import global styles
import App from './App';
import { ThemeProvider } from './frontend/theme/ThemeProvider';
import store from './frontend/store'; // Assuming your Redux store is configured in './store/index.js'

// Create a div for modals if it doesn't exist
let modalRoot = document.getElementById('modal-root');
if (!modalRoot) {
  modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// Register service worker for offline + push scaffolding
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        console.log('Service worker registered', reg.scope);
      })
      .catch(err => console.warn('Service worker registration failed', err));
  });
}