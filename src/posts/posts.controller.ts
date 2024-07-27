import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthRequest } from 'src/utils/types/authRequest.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdatePostDto } from './dto/update-post.dto';
import { CategoryEnum } from './entities/post.entity';

export interface IPostQueryParams {
  authorId?: string;
  category?: CategoryEnum;
}

@Controller('posts')
@ApiTags('Posts')
@ApiBearerAuth()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Req() req: AuthRequest, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(req.user.id, createPostDto);
  }

  @Get()
  //   @ApiQuery({ name: 'authorId', required: false, type: String })
  //   @ApiQuery({
  //     name: 'category',
  //     required: false,
  //     enum: CategoryEnum,
  //   })
  findAll() {
    return this.postsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
