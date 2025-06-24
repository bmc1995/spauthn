import { Sheet } from '@mui/joy';
import { UserSettingsForm } from '../forms/UserSettingsForm';
import { authProvider } from '../../../../app/routing/authproviders';

export default function UserSettings() {
  const authUser = authProvider.getUser();
  if (authUser)
    return (
      <Sheet sx={{ xs: { justifyContent: 'center' } }}>
        <UserSettingsForm authUser={authUser} />
      </Sheet>
    );
}
