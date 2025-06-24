import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ViteLogo from '/vite.svg';
import { ModeToggle } from '../../../common/Buttons/ModeToggle';
import { useLinkClickHandler } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/redux/store';
import NavigationBarUserCntrls from './NavigationBarUserCntrls';

export default function NavigationBar() {
  const homeClickHandler = useLinkClickHandler('/');
  const authenticated = useSelector((state: RootState) => !!state.auth.user);
  return (
    <Box component='nav' aria-label='Navigation Bar' sx={{ flexGrow: 1 }}>
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
        <NavigationBarUserCntrls authenticated={authenticated} />
      </List>
    </Box>
  );
}
