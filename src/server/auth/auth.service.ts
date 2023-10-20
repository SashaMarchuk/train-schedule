import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {LoginDto} from "./dto/login.dto";
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService, private usersService: UsersService) {}

    createToken(userId: number) {
        return this.jwtService.sign({ user_id: userId });
    }

    async login({email, password}: LoginDto): Promise<AuthEntity> {
        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        console.log('user: ', user);
        const accessToken = this.createToken(user.user_id);
        console.log('accessToken: ', accessToken);
        return {user, accessToken};
    }

    async signUp({username, password, email}: CreateUserDto): Promise<AuthEntity> {
        const user = await this.usersService.create({ username, password, email} );

        console.log('user: ', user);
        const accessToken = this.createToken(user.user_id);
        console.log('accessToken: ', accessToken);

        return {user, accessToken};
    }
}
