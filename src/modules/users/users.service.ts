import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcryptjs';
import { UserRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const emailTaken = await this.userRepo.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailTaken)
      throw new ConflictException('This email is already in use.');

    const hashedPassword = await hash(password, 12);

    const user = await this.userRepo.create({
      data: {
        name,
        email,
        password: hashedPassword,
        Categorys: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'travel', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              //  Expense
              { name: 'Salário', icon: 'travel', type: 'INCOME' },
              { name: 'Alimentação', icon: 'food', type: 'INCOME' },
              { name: 'Educação', icon: 'education', type: 'INCOME' },
              { name: 'Lazer', icon: 'fun', type: 'INCOME' },
              { name: 'Mercado', icon: 'grocery', type: 'INCOME' },
              { name: 'Roupas', icon: 'clothes', type: 'INCOME' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'Travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
            ],
          },
        },
      },
    });

    return {
      name: user.name,
      email: user.email,
    };
  }
}
