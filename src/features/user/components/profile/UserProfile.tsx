import { Email, MyLocation, Phone } from '@mui/icons-material';
import { AspectRatio, Avatar, Box, Card, CardContent, CardOverflow, Divider, Grid, Stack, Typography } from '@mui/joy';
import { useMemo } from 'react';
import { generateUUID } from '../../../../common/utils/generateUUID';

function CardGenerator(images: { desc: string; src: string; name: string }[]) {
  return (
    <Grid
      aria-label='uploads list'
      container
      justifyContent={'flex-start'}
      alignItems={'flex-start'}
      margin={'0 auto'}
      spacing={2}
    >
      {images.map(({ desc, src, name }) => (
        <Grid xs={12} sm={6} md={4} lg={3} key={generateUUID()}>
          <Card variant='outlined' sx={{ width: '300px', margin: 'auto' }}>
            <CardOverflow>
              <AspectRatio ratio='1'>
                <img src={src} loading='lazy' alt={desc} />
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <Typography textAlign={'left'} level='title-lg'>
                {name}
              </Typography>
              <Typography textAlign={'left'} level='body-sm'>
                {desc}
              </Typography>
            </CardContent>
            <CardOverflow variant='soft' sx={{ bgcolor: 'background.level1' }}>
              <Divider inset='context' />
              <CardContent orientation='horizontal'>
                <Typography level='body-xs' fontWeight='md' textColor='text.secondary'>
                  6.3k views
                </Typography>
                <Divider orientation='vertical' />
                <Typography level='body-xs' fontWeight='md' textColor='text.secondary'>
                  1 hour ago
                </Typography>
              </CardContent>
            </CardOverflow>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default function UserProfile() {
  const images = useMemo(() => {
    return Array<{ src: string; name: string; desc: string }>(10).fill({
      src: '/vite.svg',
      name: 'Vite',
      desc: 'The Vite logo.',
    });
  }, []);

  return (
    <Box>
      <Stack marginBottom={2} flexDirection={'row'}>
        <Box flexGrow={1}>
          <Avatar
            aria-label='profile picture'
            sx={{
              width: { md: '200px' },
              margin: 'auto',
              height: { md: '270px' },
            }}
            variant='outlined'
            alt='ACCOUNT NAME'
          />
          <Typography aria-label='full name' fontSize={{ sm: 24, md: 34 }}>
            Testerson McTester
          </Typography>
          <Stack direction={{ sm: 'column' }} justifyContent={'center'} alignItems={'center'} gap={2}>
            <Typography aria-label='email address' startDecorator={<Email />}>
              test@example.com
            </Typography>
            <Typography aria-label='phone number' startDecorator={<Phone />}>
              +1 (555) 555-5555
            </Typography>
            <Typography aria-label='country' startDecorator={<MyLocation />}>
              United States
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Divider inset='context' />
      <Stack alignItems={'center'}>{CardGenerator(images)}</Stack>
    </Box>
  );
}
