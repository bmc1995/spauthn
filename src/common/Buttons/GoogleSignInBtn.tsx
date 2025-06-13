import { Button } from '@mui/joy';
import Google from '../../assets/google-emblem.svg';

export const GoogleSignInBtn = () => {
  return (
    <Button
      startDecorator={<img alt='Google' width={'25px'} height={'25px'} src={Google} />}
      variant='outlined'
      color='neutral'
      size='sm'
      sx={{
        justifyContent: 'space-between',
      }}
    >
      Continue with Google
    </Button>
  );
};
