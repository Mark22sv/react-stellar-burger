import React from 'react';
import './index.css';
import App from './components/app/app'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './services/store'
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={ store }>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
