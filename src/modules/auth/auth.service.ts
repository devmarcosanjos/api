import { SigninDto } from 'src/modules/auth/dtos/signin.dto';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/shared/database/repositories/users.repositories';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from 'src/modules/auth/dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersRepo.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.genereteAccessToken(user.id);
    return { accessToken };
  }

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailTaken)
      throw new ConflictException('This email is already in use.');

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepo.create({
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

    const accessToken = await this.genereteAccessToken(user.id);
    return { accessToken };
  }

  private genereteAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
