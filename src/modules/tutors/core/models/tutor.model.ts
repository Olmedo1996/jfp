import { z } from 'zod';

import { tutorSchema } from '../schemas/tutor.schema';

export type TutorModel = z.infer<typeof tutorSchema>;
