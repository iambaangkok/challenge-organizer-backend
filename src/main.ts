import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    // app.useStaticAssets(join(__dirname, '..', 'public'), {
    //     index: false,
    //     prefix: '/uploads',
    // });
    // app.useStaticAssets()
    await app.listen(3030);
}
bootstrap();
