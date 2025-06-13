import { FieldValues, UseFormSetError } from 'react-hook-form';

/**
 * Adds server errors to the form's error state.
 *
 * @template T - The type of the form field values.
 * @param errors - The server errors to be added.
 * @param setError - The function to set form errors.
 * @returns void
 */
export const addServerErrors = <T extends FieldValues>(
  errors: { [P in keyof T]?: string[] },
  setError: UseFormSetError<T>,
): void => {
  Object.keys(errors).forEach(key => {
    setError(key as keyof UseFormSetError<T>, {
      type: 'server',
      message: errors[key as keyof T]?.join('. '),
    });
  });
};
