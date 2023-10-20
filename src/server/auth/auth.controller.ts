import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import {CreateUserDto} from "../users/dto/create-user.dto";


@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOkResponse({ type: AuthEntity })
    login(@Body() { email, password }: LoginDto) {
        return this.authService.login({email, password});
    }

    @Post('signup')
    @ApiOkResponse({ type: AuthEntity })
    signUp(@Body() {username, email, password}: CreateUserDto) {
        return this.authService.signUp({username, email, password});
    }
}
