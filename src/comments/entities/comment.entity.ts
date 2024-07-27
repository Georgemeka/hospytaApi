import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/users.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  author: User;

  @OneToMany(() => Comment, (comment: Comment) => comment.comment)
  comments: Comment[];

  @Column({ nullable: true })
  @RelationId((comment: Comment) => comment.comment)
  commentId?: string;

  @ManyToOne(() => Comment, { nullable: true, onDelete: 'CASCADE' })
  comment: Comment;

  @Column()
  @RelationId((comment: Comment) => comment.author)
  authorId: string;

  // @ManyToOne(() => Post, (post) => post.comments)
  // post: Post;

  // @Column({ nullable: true })
  // @RelationId((comment: Comment) => comment.post)
  // postId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
