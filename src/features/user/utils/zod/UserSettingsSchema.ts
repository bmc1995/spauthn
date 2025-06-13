import { z } from "zod";

const UserSettingsSchema = z.object({
  email: z.string().email(),
  cellPhone: z.string(),
  country: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export default UserSettingsSchema;
