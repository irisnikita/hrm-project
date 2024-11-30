// Constants
import { OBJECT_TYPE } from '@/constants';

export type ObjectType = (typeof OBJECT_TYPE)[keyof typeof OBJECT_TYPE];
