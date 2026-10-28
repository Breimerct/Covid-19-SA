import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { useThemeStore } from './stores';

createRoot(document.getElementById('root')!).render(
  <MantineProvider defaultColorScheme={useThemeStore.getState().colorScheme}>
    <App />
  </MantineProvider>
);
