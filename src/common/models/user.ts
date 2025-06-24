import { ZodBoolean } from 'zod/v4';
import { Image } from './image';
ZodBoolean;

export interface User {
  id: string;
  email: string;
  pwResetToken: string | null;
  friendlyName: string | null;
  isActive: boolean;
  isAdmin: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAi: Date | null;
}
