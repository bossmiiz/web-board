import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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

  async delete(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    const updatedPost = this.postsRepository.merge(post, updatePostDto);
    return await this.postsRepository.save(updatedPost);
  }
}
