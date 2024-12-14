import { z } from 'zod';

import { loginSchema } from '../schema/login.schema';

type LoginModel = z.infer<typeof loginSchema>;

export default LoginModel;
