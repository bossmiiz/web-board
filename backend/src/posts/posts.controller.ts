import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

// Define the user interface
interface RequestWithUser {
  user: {
    sub: string;
    username: string;
  };
}

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
    type: CreatePostDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - User not authenticated',
  })
  async create(
    @Body() createPostDto: CreatePostDto,
    @Request() req: RequestWithUser,
  ) {
    return await this.postsService.create(createPostDto, req.user.sub);
  }
}
