import { z } from 'zod';

const UserSettingsSchema = z.object({
  email: z.string().email(),
  displayName: z.string() || z.null(),
});

export default UserSettingsSchema;
