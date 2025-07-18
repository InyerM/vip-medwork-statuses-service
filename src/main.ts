// Utils
import { getEnv } from '@/common/utils/get-env.util';

// Types
import { AppType } from '@/common/enums/app-type.enum';
import { getRabbitmqOptions } from '@/common/bootstrap/get-rabbitmq-options';
import { bootstrapHttp } from '@/common/bootstrap/bootstrap-http';
import { bootstrapRabbitmq } from '@/common/bootstrap/bootstrap-rabbitmq';

async function bootstrap(): Promise<void> {
  const { node, rabbitmq } = getEnv();
  const rabbitmqOptions = getRabbitmqOptions(rabbitmq);

  if (node.appType === AppType.RABBITMQ) {
    return bootstrapRabbitmq(rabbitmqOptions, rabbitmq);
  }

  if (node.appType === AppType.HTTP) {
    return bootstrapHttp(node);
  }

  await bootstrapRabbitmq(rabbitmqOptions, rabbitmq);
  return bootstrapHttp(node);
}

void bootstrap().catch(handleError);

function handleError(error: unknown): void {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
}

process.on('uncaughtException', handleError);
