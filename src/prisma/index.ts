import { PrismaClient } from '@prisma/client';
import { logger } from 'utils/logger';

// todo maintain [long connection](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#recommended-connection-pool-size)
const prismaClient = new PrismaClient({
	log: [{ level: 'info', emit: 'event' }]
});

prismaClient.$on('info', (e) => {
	logger.info(e.message);
});

export default prismaClient;
