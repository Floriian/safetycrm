import { SetMetadata } from '@nestjs/common';
import { CONSTANTS } from 'src/constants';

export const Public = () => SetMetadata(CONSTANTS.IS_PUBLIC, true);
