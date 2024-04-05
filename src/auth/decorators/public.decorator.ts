import { SetMetadata } from '@nestjs/common';

import { Privileges } from '@auth/enums';

export const PublicAccess = () => SetMetadata(Privileges.PUBLIC_KEY, true);
