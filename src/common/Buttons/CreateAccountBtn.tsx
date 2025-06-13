import { Button } from '@mui/joy';
import viteLogo from '/vite.svg';
import { useLinkClickHandler } from 'react-router-dom';

export const CreateAccountBtn = ({ to }: { to: string }) => {
  const handleClick = useLinkClickHandler(to);
  return (
    <Button
      startDecorator={<img alt='vite' width={'25px'} height={'25'} src={viteLogo} />}
      variant='outlined'
      color='neutral'
      onClick={handleClick}
      size='sm'
      sx={{
        justifyContent: 'space-between',
      }}
    >
      Create Account
    </Button>
  );
};
