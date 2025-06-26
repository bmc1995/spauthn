import { Sheet, Typography } from '@mui/joy';
import { User } from '../../../../common/models/user';

type UserAdminPanelProps = {
  authUser: User;
};

export const AdminPanel = ({ authUser }: UserAdminPanelProps) => {
  return (
    <Sheet>
      <Typography>Admin Panel</Typography>
      <Typography>Hello, {authUser.email}</Typography>
    </Sheet>
  );
};
