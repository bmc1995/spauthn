import { z } from 'zod';
import UserSettingsFormSchema from '../../utils/zod/UserSettingsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeCircleSharp, InfoOutlined } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  CardActions,
  Modal,
  ModalDialog,
  ModalClose,
  Stack,
} from '@mui/joy';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useState } from 'react';
import { ChangePwDialog } from './ChangePwForm';
import { ChangeEmailDialog } from './ChangeEmailForm';

export const UserSettingsForm = () => {
  const [showChangePwDialog, setShowChangePwDialog] = useState(false);
  const [showChangeEmailDialog, setShowChangeEmailDialog] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof UserSettingsFormSchema>>({
    resolver: zodResolver(UserSettingsFormSchema),
    defaultValues: {
      email: 'test@example.com',
      cellPhone: '+1 (222)-333-4444',
      country: 'United States',
      firstName: 'Bobby',
      lastName: 'Boi',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof UserSettingsFormSchema>> = data => {
    console.log(data);
  };

  return (
    <>
      <Modal
        onClose={() => {
          setShowChangePwDialog(false);
        }}
        open={showChangePwDialog}
      >
        <ModalDialog>
          <ModalClose />
          <Typography startDecorator={<ChangeCircleSharp />}>Change Password</Typography>
          <Divider inset='context' />
          <ChangePwDialog />
        </ModalDialog>
      </Modal>
      <Modal
        onClose={() => {
          setShowChangeEmailDialog(false);
        }}
        open={showChangeEmailDialog}
      >
        <ModalDialog>
          <ModalClose />
          <Typography startDecorator={<ChangeCircleSharp />}>Change Email</Typography>
          <Divider inset='context' />
          <ChangeEmailDialog />
        </ModalDialog>
      </Modal>

      <Card sx={{ xs: { justifyContent: 'center' } }} component={'form'} onSubmit={e => void handleSubmit(onSubmit)(e)}>
        <CardContent sx={{ sm: { alignItems: 'center', justifyContent: 'center' } }}>
          <Typography level='title-lg' startDecorator={<InfoOutlined />}>
            User Settings
          </Typography>
          <Divider inset='none' />

          <FormControl error={!!errors.firstName}>
            <FormLabel>First Name</FormLabel>
            <Controller name='firstName' control={control} render={({ field }) => <Input {...field} />} />
            {errors.firstName && <FormHelperText>{errors.firstName.message}</FormHelperText>}
          </FormControl>
          <FormControl error={!!errors.lastName}>
            <FormLabel>Last Name</FormLabel>
            <Controller name='lastName' control={control} render={({ field }) => <Input {...field} />} />
            {errors.lastName && <FormHelperText>{errors.lastName.message}</FormHelperText>}
          </FormControl>
          <FormControl error={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Controller name='email' control={control} render={({ field }) => <Input disabled {...field} />} />
            {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
          </FormControl>

          <FormControl error={!!errors.cellPhone}>
            <FormLabel>Cell Phone</FormLabel>
            <Controller name='cellPhone' control={control} render={({ field }) => <Input {...field} />} />
            {errors.cellPhone && <FormHelperText>{errors.cellPhone.message}</FormHelperText>}
          </FormControl>

          <FormControl error={!!errors.country}>
            <FormLabel>Country</FormLabel>
            <Controller name='country' control={control} render={({ field }) => <Input {...field} />} />
            {errors.country && <FormHelperText>{errors.country.message}</FormHelperText>}
          </FormControl>

          <Stack width={'200px'} alignItems={'start'} paddingY={5} gap={3}>
            <Button
              fullWidth
              size='sm'
              color='neutral'
              onClick={() => {
                setShowChangeEmailDialog(true);
              }}
            >
              Change Email
            </Button>

            <Button
              fullWidth
              size={'sm'}
              color='neutral'
              onClick={() => {
                setShowChangePwDialog(true);
              }}
            >
              Change Password
            </Button>
          </Stack>
          <Divider />
          <CardActions>
            <Button size='lg' disabled={!isDirty} type='submit'>
              Save
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};

// \
// p-ol][;78[;'
// ]']]
// - fromEva
