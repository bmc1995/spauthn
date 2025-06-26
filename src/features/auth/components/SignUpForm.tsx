import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { InfoOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Typography,
} from '@mui/joy';

import formSchema from '../utils/zod/SignupSchema';
import { z } from 'zod';
import SignupFormSchema from '../utils/zod/SignupSchema';
import { useLinkClickHandler, useNavigate } from 'react-router-dom';
import { APIRequest } from '../../../common/notifications/utils/requests';
import { dispatchToast } from '../../../common/notifications/utils/dispatchToast';

export const SignUpForm = () => {
  const navigator = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      confirmPassword: '',
      password: '',
      displayName: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof SignupFormSchema>> = data => {
    APIRequest.Auth.createAccount(data)
      .then(res => {
        if (res.data) {
          dispatchToast(res.data.message, 'success');
          reset();
          navigator('/');
        }
      })
      .catch(err => dispatchToast(err.message, 'danger'));
  };

  const cancelClick = useLinkClickHandler('/');
  return (
    <Card>
      <CardContent>
        <Typography level='title-lg' startDecorator={<InfoOutlined />}>
          Create Account
        </Typography>
        <Divider inset='none' />
        <Box
          width={'600px'}
          component={'form'}
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: 'repeat(2, minmax(80px, 1fr))' },
            gap: '1.5rem',
          }}
          onSubmit={e => {
            void handleSubmit(onSubmit, console.error)(e);
          }}
        >
          <FormControl error={!!errors.email}>
            <FormLabel>Email Address</FormLabel>
            <Controller
              name='email'
              control={control}
              render={({ field }) => <Input {...field} type='email' autoComplete='email' />}
            />
            {errors.email && (
              <FormHelperText>
                <InfoOutlined />
                {errors.email.message?.toString()}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.displayName}>
            <FormLabel>Display Name</FormLabel>
            <Controller name='displayName' control={control} render={({ field }) => <Input {...field} />} />
            {errors.displayName && (
              <FormHelperText>
                <InfoOutlined />
                {errors.displayName.message?.toString()}
              </FormHelperText>
            )}
          </FormControl>
          <Stack sx={{ gridColumn: '1' }} justifyContent={'space-between'}>
            <FormControl error={!!errors.password}>
              <FormLabel>Create Password</FormLabel>
              <Controller
                name='password'
                control={control}
                render={({ field }) => <Input {...field} type='password' autoComplete='new-password' />}
              />
              {errors.password && (
                <FormHelperText>
                  <InfoOutlined />
                  {errors.password.message?.toString()}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl error={!!errors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <Controller
                name='confirmPassword'
                control={control}
                render={({ field }) => <Input {...field} type='password' autoComplete='new-password' />}
              />
              {errors.confirmPassword && (
                <FormHelperText>
                  <InfoOutlined />
                  {errors.confirmPassword.message?.toString()}
                </FormHelperText>
              )}
            </FormControl>
          </Stack>
          <CardActions buttonFlex={1} sx={{ gridColumn: '1/-1' }}>
            <Button variant='outlined' type='submit'>
              Submit
            </Button>
            <Button color='danger' variant='outlined' onClick={cancelClick}>
              Cancel
            </Button>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};
