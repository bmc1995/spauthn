import { LightMode, ModeNight } from '@mui/icons-material';
import { useColorScheme, ListItemButton } from '@mui/joy';

export function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <ListItemButton
      title='Theme Toggle'
      sx={{ borderRadius: '25px' }}
      color='neutral'
      variant='outlined'
      role='menuitem'
      onClick={() => {
        setMode(mode === 'dark' ? 'light' : 'dark');
      }}
    >
      {mode === 'dark' ? <LightMode color='warning' /> : <ModeNight />}
    </ListItemButton>
  );
}
