import { z } from 'zod';

import { activitySchema } from '../schemas/activity.schema';

export type ActivityModel = z.infer<typeof activitySchema>;
