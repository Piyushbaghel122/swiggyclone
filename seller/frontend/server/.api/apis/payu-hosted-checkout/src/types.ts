import type { FromSchema } from '@readme/api-core/types';
import type * as schemas from './schemas.js';

export type SendOtpFormDataParam = FromSchema<typeof schemas.SendOtp.formData>;
export type SendOtpResponse200 = FromSchema<typeof schemas.SendOtp.response['200']>;
