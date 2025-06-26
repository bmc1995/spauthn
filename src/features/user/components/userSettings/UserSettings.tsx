import { Sheet } from '@mui/joy';
import { UserSettingsForm } from '../forms/UserSettingsForm';
import { authProvider } from '../../../../app/routing/authproviders';
import { User } from '../../../../common/models/user';

type UserSettingsProps = {
  authUser: User;
};

export default function UserSettings({ authUser }: UserSettingsProps) {
  if (authUser)
    return (
      <Sheet sx={{ xs: { justifyContent: 'center' } }}>
        <UserSettingsForm authUser={authUser} />
      </Sheet>
    );
}
