import { Module } from '@nestjs/common';
import { ReactionController } from './controller/reaction.controller';
import { ReactionService } from './service/reaction.service';
import { ReactionEntity } from './models/reaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ReactionService],
  controllers: [ReactionController],
  imports: [
    TypeOrmModule.forFeature([ReactionEntity]),
  ]
})
export class ReactionModule {}
