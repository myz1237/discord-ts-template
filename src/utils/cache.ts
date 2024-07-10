import { MyCache } from 'types/Cache';

export const myCache = new MyCache({ stdTTL: 30, checkperiod: 60, deleteOnExpire: false });
