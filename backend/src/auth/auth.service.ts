import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string): Promise<LoginResponseDto> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }
    // Generate JWT token
    const payload = { sub: user.id.toString(), username: user.username };
    const token = this.jwtService.sign(payload);
    return {
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
      },
      token,
    };
  }

  logout(): Promise<LogoutResponseDto> {
    return Promise.resolve({
      message: 'Logout successful',
    });
  }
}
