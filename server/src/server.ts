import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './common/app.module';
import { PortResolver } from './component/config/port-resolver'

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  const defaultPort = 3000;
  const portResolver = new PortResolver({ defaultPort });
  await app.listen(portResolver.resolvePort());
}
bootstrap();
