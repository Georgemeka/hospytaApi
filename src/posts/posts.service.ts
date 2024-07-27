import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(authorId: string, createPostDto: CreatePostDto): Promise<Post> {
    try {
      const post = this.postRepository.create({ ...createPostDto, authorId });
      return this.postRepository.save(post);
    } catch (error) {
      this.logger.error('Failed to create post', error.stack);
    }
  }

  findOne(id: string) {
    return Post.findOne({ where: { id } });
  }

  findAll() {
    return this.postRepository.find({ relations: ['user', 'comments'] });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    return await post.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.postRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Post with ID ${id} not found');
    }
  }
}
