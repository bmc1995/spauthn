import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import UserSettings from '../userSettings/UserSettings';
import UserProfile from '../profile/UserProfile';
import UserUploads from '../upload/UserUploads';
import { AdminPanel } from '../admin/adminPanel';
import { useRBAC } from '../../../rbac/useRbac';
import { Role } from '../../../../common/models/role';
import { useLoaderData } from 'react-router-dom';
import { ProtectedLoaderData } from '../../../../app/routing/authLoader';

export default function UserDashboard() {
  const { authUser } = useLoaderData<ProtectedLoaderData>();
  return (
    <Tabs defaultValue={0} aria-label='User dashboard tabs' sx={{ minHeight: '100vh' }}>
      <TabList variant='soft' underlinePlacement='bottom'>
        <Tab indicatorPlacement='bottom' aria-label='User profile tab'>
          Profile
        </Tab>
        <Tab indicatorPlacement='bottom' aria-label='User settings tab'>
          Settings
        </Tab>
        <Tab indicatorPlacement='bottom' aria-label='User uploads tab'>
          Uploads
        </Tab>
        {useRBAC(
          <Tab indicatorPlacement='bottom' aria-label='Admin tab'>
            Admin
          </Tab>,
          [Role.ADMIN],
        )}
      </TabList>
      <TabPanel aria-label='User profile panel' value={0}>
        <UserProfile authUser={authUser} />
      </TabPanel>
      <TabPanel aria-label='User settings panel' value={1}>
        <UserSettings authUser={authUser} />
      </TabPanel>
      <TabPanel aria-label='User uploads panel' value={2}>
        <UserUploads />
      </TabPanel>
      {useRBAC(
        <TabPanel aria-label='Admin panel' value={3}>
          <AdminPanel authUser={authUser} />
        </TabPanel>,
        [Role.ADMIN],
      )}
    </Tabs>
  );
}
