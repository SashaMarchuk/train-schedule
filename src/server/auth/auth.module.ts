import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import {jwtConstantsSecret} from "./auth.constants";
import {UsersService} from "../users/users.service";
import {UsersController} from "../users/users.controller";

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstantsSecret,
      signOptions: { expiresIn: '1d' }, // 1 day = 24h = 1440min = 86400s
    }),
    // UsersModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, UsersService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
