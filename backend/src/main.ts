import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const PORT = +configService.get("APP_PORT") || 3000;
  app.enableCors({
    origin: "http://localhost:3000",
  });
  await app.listen(PORT, () => console.log(`App started at port ${PORT}`));
}

bootstrap();
