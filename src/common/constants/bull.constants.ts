import { getEnv } from '../utils/get-env.util';

export const BULLMQ_KEY_PREFIX = `${getEnv().node.appName}-bullmq`;
