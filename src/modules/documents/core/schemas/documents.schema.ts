import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const selectOptionSchema = z
  .object({
    label: z.string(),
    value: z.number(),
  })
  .refine((data) => data.value !== null && data.value !== undefined, {
    message: 'Este campo es obligatorio.',
  });

function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split('.').pop();
    if (fileType === 'docx' || fileType === 'pdf') return true;
  }
  return false;
}

export const documentSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50).optional(),
  document_type: selectOptionSchema,
  folder: selectOptionSchema.optional(),
  file: z
    .instanceof(File)
    .refine((file: File) => file?.size !== 0, 'File is required')
    .refine((file) => file.size < MAX_FILE_SIZE, 'Max size is 5MB.')
    .refine(
      (file) => checkFileType(file),
      'Only .pdf, .docx formats are supported.'
    ),
  expiration_date: z.string().optional(),
  beneficiary: z.number(),
});
