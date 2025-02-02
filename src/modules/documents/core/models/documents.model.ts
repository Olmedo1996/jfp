import { z } from 'zod';

import { documentSchema } from '../schemas/documents.schema';

export type DocumentModel = z.infer<typeof documentSchema>;
