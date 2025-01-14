import { z } from 'zod';

import { beneficiarySchema } from '../schemas/beneficiary.schema';

export type BeneficiaryModel = z.infer<typeof beneficiarySchema>;
