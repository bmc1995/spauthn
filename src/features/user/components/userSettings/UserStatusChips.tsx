import { Stack, Chip } from '@mui/joy';

type UserStatusChipsProps = {
  emailVerified: boolean;
  pwResetToken: boolean;
};

export const UserStatusChips = ({ emailVerified, pwResetToken }: UserStatusChipsProps) => {
  return (
    <Stack direction='column' spacing={1}>
      <Chip color={emailVerified ? 'success' : 'danger'} variant='soft'>
        Email {emailVerified ? 'Verified' : 'Unverified'}
      </Chip>
      {emailVerified && pwResetToken ? <Chip color='warning'>Password Reset Pending</Chip> : null}
    </Stack>
  );
};
// \
// p-ol][;78[;'
// ]']]
// - fromEva
