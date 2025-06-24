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
  Badge,
  Chip,
} from '@mui/joy';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useState } from 'react';
import { ChangePwDialog } from './ChangePwForm';
import { ChangeEmailDialog } from './ChangeEmailForm';
import { User } from '../../../../common/models/user';
import { UserStatusChips } from '../userSettings/UserStatusChips';
type UserSettingsFormProps = {
  authUser: User;
};

export const UserSettingsForm = ({ authUser }: UserSettingsFormProps) => {
  const [showChangePwDialog, setShowChangePwDialog] = useState(false);
  const [showChangeEmailDialog, setShowChangeEmailDialog] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof UserSettingsFormSchema>>({
    resolver: zodResolver(UserSettingsFormSchema),
    defaultValues: {
      email: authUser.email,
      displayName: authUser.friendlyName ?? authUser.email.split('@')[0],
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
          <FormControl error={!!errors.displayName}>
            <FormLabel>Display name</FormLabel>
            <Controller name='displayName' control={control} render={({ field }) => <Input {...field} />} />
            {errors.displayName && <FormHelperText>{errors.displayName.message}</FormHelperText>}
          </FormControl>
          <FormControl error={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Controller name='email' control={control} render={({ field }) => <Input disabled {...field} />} />
            {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
          </FormControl>
          <Stack width={'200px'} alignItems={'start'} paddingY={5} gap={3}>
            <UserStatusChips pwResetToken={!!authUser.pwResetToken} emailVerified={authUser.emailVerified} />
            <Button
              fullWidth
              size='sm'
              color='neutral'
              disabled={!authUser.emailVerified}
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
              disabled={!authUser.emailVerified || !!authUser.pwResetToken}
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
