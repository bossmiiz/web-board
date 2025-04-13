import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe',
  })
  username: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'A message indicating the result of the login attempt',
    example: 'Login successful',
  })
  message: string;

  @ApiProperty({
    description: 'The user information',
    type: UserDto,
  })
  user: UserDto;

  @ApiProperty({
    description: 'JWT access token for authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;
}
