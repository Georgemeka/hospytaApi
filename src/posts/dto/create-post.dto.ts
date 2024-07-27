import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CategoryEnum } from '../entities/post.entity';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  image: string;

  @IsEnum(CategoryEnum)
  @IsNotEmpty()
  category: CategoryEnum;
}
