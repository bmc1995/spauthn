import { Person, LogoutRounded, LoginRounded, Dashboard, DashboardRounded } from '@mui/icons-material';
import { ListItem, ListItemButton, Typography } from '@mui/joy';
import { useLinkClickHandler, useSubmit } from 'react-router-dom';

interface NavigationBarProps {
  authenticated: boolean;
}

export default function NavigationBarUserCntrls({ authenticated }: NavigationBarProps) {
  const personClickHandler = useLinkClickHandler('/dashboard');
  const loginClickHandler = useLinkClickHandler('/auth');
  const logout = useSubmit();
  const logoutClickHandler = () => {
    logout(null, { method: 'post', action: '/auth/logout' });
  };
  if (authenticated) {
    return (
      <>
        <ListItem role='none' sx={{ marginY: 'auto' }}>
          <ListItemButton
            sx={{ borderRadius: '25px', marginX: { sm: '1rem', xs: '0' } }}
            variant='outlined'
            role='menuitem'
            component='a'
            onClick={personClickHandler}
            aria-label='Profile'
          >
            <DashboardRounded titleAccess='Dashboard' />
            <Typography sx={{ fontSize: { md: 14, lg: 16 }, display: { xs: 'none', md: 'initial' } }}>
              Dashboard
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ marginY: 'auto' }}>
          <ListItemButton
            variant='outlined'
            sx={{ borderRadius: '25px' }}
            role='menuitem'
            component='a'
            onClick={logoutClickHandler}
            aria-label='Logout'
          >
            <LogoutRounded titleAccess='Logout' />
            <Typography sx={{ fontSize: { md: 14, lg: 16 }, display: { xs: 'none', md: 'initial' } }}>
              Logout
            </Typography>
          </ListItemButton>
        </ListItem>
      </>
    );
  } else {
    return (
      <ListItem sx={{ marginY: 'auto' }}>
        <ListItemButton
          variant='outlined'
          sx={{ borderRadius: '25px' }}
          role='menuitem'
          component='a'
          onClick={loginClickHandler}
          aria-label='Login'
        >
          <LoginRounded titleAccess='Login' />
          <Typography sx={{ fontSize: { md: 14, lg: 16 } }}>Login</Typography>
        </ListItemButton>
      </ListItem>
    );
  }
}
