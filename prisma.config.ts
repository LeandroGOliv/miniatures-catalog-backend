import { config } from 'dotenv';

const nodeEnv = process.env.NODE_ENV;
config({ path: `.env.${nodeEnv}` });
config({ path: '.env' });

import type { PrismaConfig } from 'prisma';
import { env } from 'prisma/config';

export default {
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
} satisfies PrismaConfig;
