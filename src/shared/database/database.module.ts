import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UserRepository } from 'src/shared/database/repositories/users.repositories';

@Global()
@Module({
  providers: [PrismaService, UserRepository],
  exports: [UserRepository],
})
export class DatabaseModule {}
