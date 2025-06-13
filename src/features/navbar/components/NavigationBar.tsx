import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Person from '@mui/icons-material/Person';
import ViteLogo from '/vite.svg';
import { ModeToggle } from '../../../common/Buttons/ModeToggle';
import { useLinkClickHandler, useSubmit } from 'react-router-dom';
import { LogoutRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/redux/store';

export default function NavigationBar() {
  const homeClickHandler = useLinkClickHandler('/');
  const personClickHandler = useLinkClickHandler('/dashboard');
  const logout = useSubmit();
  const logoutClickHandler = () => {
    logout(null, { method: 'post', action: '/auth/logout' });
  };
  const authenticated = useSelector((state: RootState) => !!state.auth.user);
  return (
    <Box
      component='nav'
      aria-label='Vreact Template'
      sx={{
        flexGrow: 1,
      }}
    >
      <List role='menubar' orientation='horizontal' sx={{ paddingLeft: 0, paddingRight: '1rem', height: '55px' }}>
        <ListItem role='none'>
          <ListItemButton role='menuitem' component='a' href='#NavHomeBtn' onClick={homeClickHandler} aria-label='Home'>
            <img src={ViteLogo} className='logo' alt='Vite logo' />
          </ListItemButton>
        </ListItem>
        <ListDivider sx={{ margin: 0 }} />
        <ListDivider sx={{ marginLeft: 'auto', visibility: { sm: 'initial', xs: 'hidden' } }} />
        <ListItem role='none' sx={{ marginY: 'auto' }}>
          <ModeToggle />
        </ListItem>

        {authenticated && (
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
                <Person />
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
                <LogoutRounded />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
}
