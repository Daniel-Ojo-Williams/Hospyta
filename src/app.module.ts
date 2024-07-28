import { Module } from '@nestjs/common';
import { UsersModule } from './module/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/ormConfig';
import { JwtModule } from '@nestjs/jwt';
import { PostsModule } from './module/posts/posts.module';
import { CategoryModule } from './module/category/category.module';
import { CommentsModule } from './module/comments/comments.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    PostsModule,
    CategoryModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
