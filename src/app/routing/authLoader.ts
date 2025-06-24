import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { authProvider } from './authproviders';

export function protectedLoader({ request }: LoaderFunctionArgs) {
  const authUser = authProvider.getUser();
  if (!authUser) {
    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    console.log(`User not authenticated. Redirecting to login at /auth`);
    return redirect(`/auth?${params.toString()}`);
  }
  console.log(`User authenticated. Proceeding to protected route.`);
  return { authUser };
}
