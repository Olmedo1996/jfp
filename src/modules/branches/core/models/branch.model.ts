import { z } from 'zod';

import { branchSchema } from '../schemas/branch.schema';

export type BranchModel = z.infer<typeof branchSchema>;
