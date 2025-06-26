import { User } from './user';

type APIResponse<Data, Error> = {
  data: Data | null;
  error: Error | null;
};

export type AuthResponse = APIResponse<
  {
    user: User;
    token: string | null;
  },
  {
    message: string;
    code?: string;
  }
>;

export type CreateAccountResponse = APIResponse<
  {
    email: string;
    message: string;
  },
  {
    message: string;
  }
>;
