import { Image } from './image';
import { Role } from './role';

export interface User {
  id: number;
  email: string;
  newEmail: string | null;
  role: Role;
  firstName: string;
  lastName: string;
  activatedAt: string | null;
  profilePicture: Image | null;
  createdAt: Date;
  updatedAt: Date;
}
