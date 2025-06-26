import { User } from './user';

export type APIResponse<Data, Error> = {
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
