import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, Box, FormControl, FormLabel, Input, FormHelperText, CardActions, Button } from '@mui/joy';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

export const ChangeEmailDialog = () => {
  const PwSchema = z.string().trim().min(8);
  const EmailSchema = z.string().trim().email();
  const ChangeEmailFormSchema = z.object({ password: PwSchema, newEmail: EmailSchema });
  type ChangePwFormSchemaType = z.infer<typeof ChangeEmailFormSchema>;

  const onSubmit: SubmitHandler<ChangePwFormSchemaType> = data => {
    console.log(data);
  };
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<ChangePwFormSchemaType>({
    resolver: zodResolver(ChangeEmailFormSchema),
    defaultValues: {
      password: '',
      newEmail: '',
    },
  });

  return (
    <Card component={'form'} onSubmit={e => void handleSubmit(onSubmit)(e)} variant='plain'>
      <CardContent>
        <Box display={'grid'} gap={'1.5rem'}>
          <FormControl>
            <FormLabel>New Email</FormLabel>
            <Controller name='newEmail' control={control} render={({ field }) => <Input {...field} />} />
            {errors.newEmail && (
              <FormHelperText sx={theme => ({ color: theme.palette.danger[500] })}>
                {errors.newEmail.message?.toString()}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Controller
              name='password'
              control={control}
              render={({ field }) => <Input {...field} type='password' autoComplete='password' autoFocus={true} />}
            />
            {errors.password && (
              <FormHelperText sx={theme => ({ color: theme.palette.danger[500] })}>
                {errors.password.message?.toString()}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
      </CardContent>
      <CardActions>
        <Button type={'submit'} disabled={!isDirty}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};
