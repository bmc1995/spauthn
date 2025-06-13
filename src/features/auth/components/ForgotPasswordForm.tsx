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
  ModalClose,
  Typography,
} from '@mui/joy';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';

const ForgotPwSchema = z.object({ email: z.string().email() });
type ForgotPwSchemaType = z.infer<typeof ForgotPwSchema>;

export const ForgotPasswordForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ForgotPwSchemaType>({
    resolver: zodResolver(ForgotPwSchema),
  });

  const onSubmit: SubmitHandler<ForgotPwSchemaType> = ({ email }) => {
    console.log('Password Reset email sent to: ', email);
  };
  return (
    <Card>
      <CardContent>
        <ModalClose variant='soft' color='danger' />
        <Typography sx={{ userSelect: 'none' }} level='title-lg' startDecorator={<InfoOutlined />}>
          Password Reset
        </Typography>
        <Divider inset='context' />
        <Box
          component={'form'}
          sx={{
            display: 'grid',
            gap: '1.5rem',
          }}
          onSubmit={e => void handleSubmit(onSubmit)(e)}
        >
          <Typography sx={{ userSelect: 'none' }} fontSize={'sm'}>
            You will receive a link to reset your password
          </Typography>
          <FormControl sx={{ marginTop: 'auto' }} error={!!errors.email}>
            <FormLabel>Email Address</FormLabel>
            <Controller
              name='email'
              control={control}
              defaultValue=''
              render={({ field }) => <Input {...field} type='email' autoComplete='email' />}
            />
            {errors.email && <FormHelperText>{errors.email.message?.toString()}</FormHelperText>}
          </FormControl>
          <CardActions>
            <Button variant='outlined' type={'submit'} disabled={!isValid}>
              Send Reset Link
            </Button>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};
