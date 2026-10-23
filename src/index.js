import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Kroger loads its product container after the initial page document.
setTimeout(() => {
  const productDetails = document.querySelector('.ProductDetails');
  if (!productDetails || document.querySelector('#custom-app-wrapper')) return;
  // Preserve the existing product tabs rather than replace their content.
  if (productDetails.querySelector('.TabableContent-container')) return;
  const container = document.createElement('div');
  container.className = 'TabableContent-container';
  const tabs = document.createElement('ul');
  tabs.className = 'TabableContent-tabs Tabs';
  const tab = document.createElement('li');
  tab.className = 'Tab is-selected';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'Tab-button';
  const label = document.createElement('span');
  label.className = 'Tab-buttonText';
  label.textContent = 'Nutrition Info';
  button.appendChild(label);
  tab.appendChild(button);
  tabs.appendChild(tab);
  const content = document.createElement('div');
  content.className = 'TabableContent-content';
  const app = document.createElement('div');
  app.id = 'custom-app-wrapper';
  content.appendChild(app);
  container.append(tabs, content);
  productDetails.appendChild(container);
  createRoot(app).render(<App />);
}, 2000);
