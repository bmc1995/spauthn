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
  Select,
  Stack,
  Typography,
} from '@mui/joy';

import formSchema from '../utils/zod/SignupSchema';
import { generateOptionsFromEnumRHF } from '../utils/generateOptionsFromEnum';
import { z } from 'zod';
import SignupFormSchema from '../utils/zod/SignupSchema';
import { useLinkClickHandler } from 'react-router-dom';

export const SignUpForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      cellPhone: '',
      country: '',
      confirmPassword: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof SignupFormSchema>> = data => {
    console.log(data);
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
          <Divider sx={{ gridColumn: '1/-1' }}>Optional</Divider>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Controller name='firstName' control={control} render={({ field }) => <Input {...field} />} />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Controller name='lastName' control={control} render={({ field }) => <Input {...field} />} />
          </FormControl>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Controller
              name='country'
              control={control}
              render={({ field }) => (
                <Select
                  // {...field}
                  color='neutral'
                  disabled={false}
                  placeholder='Choose Country…'
                  variant='outlined'
                >
                  {generateOptionsFromEnumRHF(field)}
                </Select>
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Cell Phone</FormLabel>
            <Controller
              name='cellPhone'
              control={control}
              render={({ field }) => <Input {...field} placeholder='(555) 555-5555' />}
            />
          </FormControl>
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
