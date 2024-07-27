import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { AuthRequest } from 'src/utils/types/authRequest.interface';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
@ApiTags('Comments')
@ApiBearerAuth()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Req() req: AuthRequest, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(req.user.id, createCommentDto);
  }

  @Get('post/:postId')
  @ApiParam({ name: 'postId', type: 'string' })
  @ApiOkResponse({ type: [CreateCommentDto] })
  async findByPostId(@Param('postId') postId: string): Promise<Comment[]> {
    return this.commentsService.findByPostId(postId);
  }
}
