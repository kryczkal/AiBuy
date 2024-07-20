import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import App from 'src/pages/App/App';
import 'src/index.scss';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
