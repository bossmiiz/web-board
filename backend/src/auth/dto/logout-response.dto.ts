import { ApiProperty } from '@nestjs/swagger';

export class LogoutResponseDto {
  @ApiProperty({
    description: 'A message indicating the result of the logout attempt',
    example: 'Logout successful',
  })
  message: string;
} 