import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { RouterProvider } from 'react-router-dom';

import ErrorBoundary from '../features/error-boundary/components/ErrorBoundary';

import { NetworkDetector } from '../features/network-detector/NetworkDetector';
import { ToastContainer } from '../common/notifications/ToastContainer';

import '../styles/App.css';
import { router } from './routing/routes';

function App() {
  return (
    <CssVarsProvider defaultMode={'system'}>
      <CssBaseline>
        <NetworkDetector>
          <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
            <ToastContainer />
            <RouterProvider router={router} fallbackElement={<p>...</p>} />
          </ErrorBoundary>
        </NetworkDetector>
      </CssBaseline>
    </CssVarsProvider>
  );
}

export default App;
