import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Layout } from '../../common/Layout/Layout';
import UserDashboard from '../../features/user/components/dashboard/UserDashboard';
import { protectedLoader } from './authLoader';
import AuthRoutes from '../../features/auth/Routes';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path='/' loader={protectedLoader} element={<h3>protected</h3>} />
      <Route path='/dashboard' loader={protectedLoader} element={<UserDashboard />} />
      <Route path='/protected' loader={protectedLoader} element={<h3>protected</h3>} />
      {AuthRoutes}
    </Route>,
  ),
);
