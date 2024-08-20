import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const PORT = +configService.get("APP_PORT") || 3000;
  app.enableCors({
    origin: "http://localhost:3000",
  });

  const config = new DocumentBuilder()
    .setTitle("My API")
    .setDescription("API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(PORT, () => console.log(`App started at port ${PORT}`));
}

bootstrap();
