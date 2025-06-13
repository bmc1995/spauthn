import { LoaderFunctionArgs, Route, redirect } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { fakeAuthProvider } from '../../app/routing/fakeauthprovider';

async function loginAction({ request }: LoaderFunctionArgs) {
  const { email, password, from } = (await request.json()) as { email: string; password: string; from: string };
  try {
    await fakeAuthProvider.signin({ email, password });
  } catch (error) {
    return error;
  }
  return redirect(from || '/protected');
}
async function logoutAction() {
  await fakeAuthProvider.signout();
  return redirect('/');
}

function loginLoader() {
  const user = !!fakeAuthProvider.getUser();
  if (user) return redirect('/protected');
  return null;
}

export default (
  <Route path='/auth/*'>
    <Route index loader={loginLoader} action={loginAction} element={<LoginPage />} />
    <Route path='signup' element={<SignUpPage />} />
    <Route path='logout' action={logoutAction} />
  </Route>
);
