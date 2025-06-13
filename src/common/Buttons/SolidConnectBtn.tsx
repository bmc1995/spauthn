import { Button } from '@mui/joy';
import Solid from '../../assets/solid-emblem.svg';

export const SolidConnectBtn = () => {
  return (
    <Button
      startDecorator={<img alt='Solid protocol' height={'25px'} width={'27px'} src={Solid} />}
      variant='outlined'
      color='neutral'
      size='sm'
      sx={{
        justifyContent: 'space-between',
      }}
    >
      Connect Solid Pod
    </Button>
  );
};
