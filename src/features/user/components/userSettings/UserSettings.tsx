import { Sheet } from '@mui/joy';
import { UserSettingsForm } from '../forms/UserSettingsForm';

export default function UserSettings() {
  return (
    <Sheet sx={{ xs: { justifyContent: 'center' } }}>
      <UserSettingsForm />
    </Sheet>
  );
}
