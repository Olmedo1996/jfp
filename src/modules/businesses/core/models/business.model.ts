import { z } from 'zod';

import { businessSchema } from '../schemas/business.schema';

export type BusinessModel = z.infer<typeof businessSchema>;
