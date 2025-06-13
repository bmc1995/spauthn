import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, Box, FormControl, FormLabel, Input, FormHelperText, CardActions, Button } from '@mui/joy';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

export const ChangePwDialog = () => {
  const PwSchema = z.string().trim().min(8);
  const ChangePwFormSchema = z
    .object({ currentPw: PwSchema, newPw: PwSchema, confirmNewPw: PwSchema })
    .refine(data => data.newPw === data.confirmNewPw, {
      message: 'Passwords do not match',
      path: ['confirmNewPw'],
    });
  type ChangePwFormSchemaType = z.infer<typeof ChangePwFormSchema>;

  const onSubmit: SubmitHandler<ChangePwFormSchemaType> = data => {
    console.log(data);
  };
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<ChangePwFormSchemaType>({
    resolver: zodResolver(ChangePwFormSchema),
    defaultValues: {
      currentPw: '',
      newPw: '',
      confirmNewPw: '',
    },
  });

  return (
    <Card component={'form'} onSubmit={e => void handleSubmit(onSubmit)(e)} variant='plain'>
      <CardContent>
        <Box display={'grid'} gap={'1.5rem'}>
          <FormControl>
            <FormLabel>Current Password</FormLabel>
            <Controller
              name='currentPw'
              control={control}
              render={({ field }) => <Input {...field} type='password' autoComplete='password' autoFocus={true} />}
            />
            {errors.currentPw && (
              <FormHelperText sx={theme => ({ color: theme.palette.danger[500] })}>
                {errors.currentPw.message?.toString()}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>New Password</FormLabel>
            <Controller name='newPw' control={control} render={({ field }) => <Input {...field} type='password' />} />
            {errors.newPw && (
              <FormHelperText sx={theme => ({ color: theme.palette.danger[500] })}>
                {errors.newPw.message?.toString()}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Confirm New Password</FormLabel>
            <Controller
              name='confirmNewPw'
              control={control}
              render={({ field }) => <Input {...field} type='password' />}
            />
            {errors.confirmNewPw && (
              <FormHelperText sx={theme => ({ color: theme.palette.danger[500] })}>
                {errors.confirmNewPw.message?.toString()}
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
