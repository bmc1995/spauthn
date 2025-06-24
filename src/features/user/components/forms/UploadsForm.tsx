import { useForm, Controller } from 'react-hook-form';
import { AspectRatio, Box, Button, FormControl, Input, Stack } from '@mui/joy';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Clear, UploadFile } from '@mui/icons-material';
import React, { useRef } from 'react';

const uploadsFormSchema = z.object({ imageFile: z.any().optional() });

type UploadsFormValues = z.infer<typeof uploadsFormSchema>;

export const UploadsForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<UploadsFormValues>({ resolver: zodResolver(uploadsFormSchema), defaultValues: { imageFile: '' } });
  const previewImgRef = useRef<HTMLImageElement>(null) as React.RefObject<HTMLImageElement>;

  function onSubmit(data: UploadsFormValues) {
    console.log(data);
  }
  function inputClick() {
    const input = document.getElementsByName('imageFile')[0] as HTMLInputElement;
    input.click();
  }
  /**
   * Handles setting and clearing the preview image.
   * The elementRef parameter holds a ref pointing to the target HTML Image Element
   * @param elementRef Ref pointing to an HTML image element (may be null)
   * @param file File object.  Clears `elementRef.current.src` if undefined
   * @returns
   */
  function handlePreview(elementRef: React.RefObject<HTMLImageElement>, file: File | undefined) {
    if (!elementRef.current) return;
    if (!file || !file.type.startsWith('image/')) {
      //TODO add placeholder img
      return (elementRef.current.src = '');
    }

    elementRef.current.src = URL.createObjectURL(file);
  }

  return (
    <Box component='form' margin={'auto'} onSubmit={e => void handleSubmit(onSubmit)(e)}>
      <Stack alignItems={'center'} margin={1}>
        <AspectRatio
          variant='outlined'
          ratio='4/3'
          sx={{ width: { xs: 250, sm: 300, md: 500 }, bgcolor: 'background.level2', borderRadius: 'md' }}
        >
          <img ref={previewImgRef} src={watch('imageFile')} alt='Selected image preview' />
        </AspectRatio>
      </Stack>
      <Stack direction={'row'} justifyContent={'space-around'}>
        <Button startDecorator={<UploadFile />} onClick={inputClick}>
          Select Image
        </Button>
        <Button
          color='warning'
          startDecorator={<Clear />}
          onClick={() => {
            reset({ imageFile: '' });
            handlePreview(previewImgRef, undefined);
          }}
        >
          Clear
        </Button>
      </Stack>

      <FormControl sx={{ visibility: 'hidden' }}>
        <Controller
          name='imageFile'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              onChange={e => {
                handlePreview(previewImgRef, e.target.files?.[0]);
              }}
              hidden
              type='file'
            />
          )}
        />
      </FormControl>
      <Button color='success' disabled={!!errors.imageFile} type='submit'>
        Submit
      </Button>
    </Box>
  );
};
