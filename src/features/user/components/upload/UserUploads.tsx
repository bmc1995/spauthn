import { Card } from '@mui/joy';
import { UploadsForm } from '../forms/UploadsForm';

export default function UserUploads() {
  return (
    <Card variant='soft' title='User Uploads Card'>
      <UploadsForm />
    </Card>
  );
}
