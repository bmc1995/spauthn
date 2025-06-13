import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { fakeAuthProvider } from './fakeauthprovider';

export function protectedLoader({ request }: LoaderFunctionArgs) {
  if (fakeAuthProvider.getUser() == null) {
    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/auth?' + params.toString());
  }
  return null;
}
