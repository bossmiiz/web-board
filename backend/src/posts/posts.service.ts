import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    const post = this.postsRepository.create({
      ...createPostDto,
      userId,
    });

    return await this.postsRepository.save(post);
  }

  async getPosts(): Promise<Post[]> {
    return await this.postsRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: ['user', 'category'],
    });
  }
}
