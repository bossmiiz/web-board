import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate a user with username and return a JWT token',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful, returns user info and JWT token',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid username',
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto.username);
  }
}
