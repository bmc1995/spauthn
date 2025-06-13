import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
  FormHelperText,
  Modal,
  ModalDialog,
} from '@mui/joy';
import { InfoOutlined } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Controller, FieldError } from 'react-hook-form';

import { SolidConnectBtn } from '../../../common/Buttons/SolidConnectBtn';
import { GoogleSignInBtn } from '../../../common/Buttons/GoogleSignInBtn';
import { CreateAccountBtn } from '../../../common/Buttons/CreateAccountBtn';
import formSchema from '../utils/zod/LoginSchema';
import { useEffect, useState } from 'react';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { z } from 'zod';
import { useActionData, useLocation, useSubmit } from 'react-router-dom';
import { dispatchToast } from '../../../common/notifications/utils/dispatchToast';

export const LoginForm = () => {
  const from = new URLSearchParams(useLocation().search).get('from') || '/protected';
  const routerSubmit = useSubmit();
  const serverErrors = useActionData() as FieldError | undefined;
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = data => {
    routerSubmit({ ...data, from }, { method: 'post', encType: 'application/json' });
  };

  useEffect(() => {
    serverErrors?.message && dispatchToast(serverErrors.message, 'danger');
  }, [serverErrors]);

  return (
    <Card>
      <CardContent>
        <Typography level='title-lg' startDecorator={<InfoOutlined />}>
          Login
        </Typography>
        <Divider inset='none' />
        <Box
          component={'form'}
          width={'300px'}
          sx={{
            display: 'grid',
            gap: '1.5rem',
          }}
          onSubmit={e => {
            void handleSubmit(onSubmit)(e);
          }}
        >
          {serverErrors && <Typography color='danger'>{serverErrors.message}</Typography>}
          <input type='hidden' name='redirectTo' value={from}></input>
          <FormControl error={!!errors.email}>
            <FormLabel>Email Address</FormLabel>
            <Controller
              name='email'
              control={control}
              defaultValue=''
              render={({ field }) => <Input {...field} type='email' autoComplete='email' />}
            />
            {errors.email && <FormHelperText>{errors.email.message?.toString()}</FormHelperText>}
          </FormControl>
          <FormControl error={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Controller
              name='password'
              control={control}
              defaultValue=''
              render={({ field }) => <Input {...field} type='password' autoComplete='current-password' />}
            />
            {errors.password && <FormHelperText>{errors.password.message?.toString()}</FormHelperText>}
          </FormControl>
          <CardActions buttonFlex={1} sx={{ gridColumn: '1/-1' }}>
            <Button variant='outlined' type='submit'>
              Submit
            </Button>
          </CardActions>
        </Box>
        <Typography
          onClick={() => {
            setShowForgotModal(true);
          }}
          marginTop={'1rem'}
          fontSize={'sm'}
          sx={{ cursor: 'pointer' }}
        >
          Forgot password?
        </Typography>
        <Divider inset='none'>OR</Divider>
        <Stack spacing={1} justifyContent={'space-around'}>
          <CreateAccountBtn to='/auth/signup' />
          <SolidConnectBtn />
          <GoogleSignInBtn />
        </Stack>
      </CardContent>
      <Modal
        open={showForgotModal}
        onClose={() => {
          setShowForgotModal(false);
        }}
      >
        <ModalDialog variant='plain'>
          <ForgotPasswordForm />
        </ModalDialog>
      </Modal>
    </Card>
  );
};
